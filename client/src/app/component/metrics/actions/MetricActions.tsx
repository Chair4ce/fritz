import { MetricStore } from '../MetricStore';
import { MetricRepository } from '../repository/MetricRepository';
import { Stores } from '../../../../utils/Stores';
import { Repositories } from '../../../../utils/Repositories';
import { action } from 'mobx';
import { MetricModel } from '../MetricModel';
import { UploadStore } from '../../form/upload/UploadStore';
import { AverageSubsetModel } from '../../average/AverageSubsetModel';
import { AverageModel } from '../../average/AverageModel';
import * as moment from 'moment';
import * as math from 'mathjs';
import { UnicornStore } from '../../unicorn/store/UnicornStore';

export class MetricActions {
  private metricStore: MetricStore;
  private uploadStore: UploadStore;
  private unicornStore: UnicornStore;
  private readonly metricRepository: MetricRepository;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.metricStore = stores.metricStore!;
    this.uploadStore = stores.uploadStore!;
    this.unicornStore = stores.unicornStore!;
    this.metricRepository = repositories.metricRepository!;
  }

  @action.bound
  async initializeStores() {
    await this.metricStore.hydrate(this.metricRepository);
    await this.setWorkflowAverage();
    await this.setAverages();
  }

  async trackMetric(act: string) {
    let site = this.unicornStore!.selectedSite;
    let newAct: string;
    if (act === 'UploadToUnicorn') {
      newAct = 'Site: ' + site + ' | ' + 'Uploaded To UNICORN';
    } else {
      newAct = act;
    }

    let metric = new MetricModel(
      null, this.uploadStore.hash, newAct, Math.round((Date.now() / 1000)).toString(), null, null
    );
    this.metricStore['setPending' + act + 'Metric'](await this.metricRepository.create(metric));
  }

  async updateMetric(act: string) {
    if (act === 'Upload') {
      this.metricStore['pending' + act + 'Metric'].setUid(this.uploadStore.hash);
    }
    this.metricStore['pending' + act + 'Metric'].setEndTime(Math.round((Date.now() / 1000)).toString());
    await this.metricRepository.update(this.metricStore['pending' + act + 'Metric']);
  }
  async createMetric(act: string) {
    let metric = new MetricModel(
      null, this.uploadStore.hash, act, Math.round((Date.now() / 1000)).toString(), null, null
    );
    await this.metricRepository.create(metric);
  }

  async trackConversion(count: number) {
    let metric = new MetricModel(
      null,
      this.uploadStore.hash,
      'Converted',
      Math.round((Date.now() / 1000)).toString(),
      Math.round((Date.now() / 1000)).toString(),
      count
    );
    await this.metricRepository.create(metric);
  }

  @action.bound
  exportMetrics() {
    const a = document.createElement('a');
    const array = ['uid,action,time_taken\r\n'];

    const file = new Blob(
      array.concat(this.metricStore.metrics.filter((m) => {
        return m.action !== 'Converted';
      }).slice().reverse().map((m: MetricModel) => {
        let endTime = parseFloat(m.endTime!);
        let startTime = parseFloat(m.startTime);
        let timeTaken = endTime - startTime;
        return moment.unix(startTime).format('MMMM Do YYYY H:mm') + 'L' +
          ',' + m.uid +
          ',' + m.action +
          ',' + timeTaken + 's' +
          '\r\n';
      })),
      {type: 'text/plain'}
    );
    a.href = URL.createObjectURL(file);
    a.download = 'metrics.csv';
    a.click();
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(file, 'metrics.csv');
    }
  }

  @action.bound
  async setWorkflowAverage() {
    let metrics = this.metricStore.filteredMetrics;
    let set = new Set<string>();
    for (let i = 0; i < metrics.length; i++) {
      set.add(metrics[i].uid);
    }
    for (let item of set) {
      let startTime: string | null;
      let endTime;
      metrics.filter((m) => {
        return m.uid === item;
      })
        .map((m) => {
          if (m.action === 'Upload') {
            startTime = m.startTime;
          }
          if ((m.action === 'Download' || m.action === 'UploadToUnicorn') && m.endTime) {
            endTime = m.endTime;
            if (startTime && endTime) {
              this.metricStore.averages.workflow.push(
                new AverageSubsetModel(parseInt(startTime, 10), (parseInt(endTime, 10) - parseInt(startTime, 10)))
              );
              startTime = null;
              endTime = null;
            }
          }
        });
    }
  }

  @action.bound
  async setAverages() {
    this.metricStore.filteredMetrics.map((m: MetricModel) => {
      if (m.action === 'Renaming' && m.startTime && m.endTime) {
        this.metricStore.averages.rename.push(
          new AverageSubsetModel(parseInt(m.startTime, 10), (parseInt(m.endTime, 10) - parseInt(m.startTime, 10)))
        );
      } else if (m.action === 'Upload' && m.startTime && m.endTime) {
        this.metricStore.averages.upload.push(
          new AverageSubsetModel(parseInt(m.startTime, 10), (parseInt(m.endTime, 10) - parseInt(m.startTime, 10)))
        );
      } else if (m.action === 'Download' && m.startTime && m.endTime) {
        this.metricStore.averages.download.push(
          new AverageSubsetModel(parseInt(m.startTime, 10), (parseInt(m.endTime, 10) - parseInt(m.startTime, 10)))
        );
      } else if (m.action === 'Conversion' && m.startTime && m.endTime) {
        this.metricStore.averages.conversion.push(
          new AverageSubsetModel(parseInt(m.startTime, 10), (parseInt(m.endTime, 10) - parseInt(m.startTime, 10)))
        );
      }
    });
  }

  @action.bound
  async filterMetrics(option: number) {
    this.metricStore.setFilterValue(option);
    this.metricStore.setFilteredMetrics(
      this.metricStore.metrics.filter((m: MetricModel) => {
        return moment().unix() - parseInt(m.startTime, 10) < option;
      })
    );
    await this.setAverages();
    await this.setWorkflowAverage();
    this.calculateAllAverages();
  }

  @action.bound
  countUploads() {
    let count = 0;
    this.metricStore.filteredMetrics.map((m: MetricModel) => {
      if (m.action === 'Upload') {
        count++;
      }
    });
    return count;
  }

  @action.bound
  countDownloads() {
    let count = 0;
    this.metricStore.filteredMetrics.map((m: MetricModel) => {
      if (m.action === 'Download') {
        count++;
      }
    });
    return count;
  }

  @action.bound
  countDeletes() {
    let count = 0;
    this.metricStore.filteredMetrics.map((m: MetricModel) => {
      if (m.action === 'Delete JPG') {
        count++;
      }
    });
    return count;
  }

  @action.bound
  countUserAction(metric: string) {
    let count = 0;
    this.metricStore.filteredMetrics.map((m: MetricModel) => {
      if (m.action === metric) {
        count++;
      }
    });
    return count;
  }

  @action.bound
  countConverted() {
    let counts = this.metricStore.filteredMetrics.filter((m) => {
      return m.action === 'Converted';
    });
    let count = 0;
    for (let i = 0; i < counts.length; i++) {
      count = count + (counts[i].count || 0);
    }
    return count;
  }

  @action.bound
  calculateAverage(averageArr: AverageSubsetModel[], filter: number) {
    let averages = averageArr
      .filter((asm: AverageSubsetModel) => {
        return moment().unix() - asm.startTime < filter;
      });
    let time: number = 0;
    for (let i = 0; i < averages.length; i++) {
      time = time + averages[i].timeTaken;
    }
    return Math.round(time / averages.length);
  }

  @action.bound
  calculateAverageDifference(average: string) {
    let filter = this.metricStore.filterValue;
    let oldAverages = (this.metricStore.averages[average] as AverageSubsetModel[])
      .filter((asm: AverageSubsetModel) => {
        return moment().unix() - asm.startTime < filter;
      });
    let oldTime: number = 0;
    for (let i = 0; i < oldAverages.length; i++) {
      oldTime = oldTime + oldAverages[i].timeTaken;
    }
    let oldAverage = Math.round(oldTime / oldAverages.length);

    let newTime: number = 0;
    let time = moment().unix();
    let newAverages = (this.metricStore.averages[average] as AverageSubsetModel[]).filter((asm: AverageSubsetModel) => {
      return time - asm.startTime > filter && time - asm.startTime < filter * 2;
    });
    for (let i = 0; i < newAverages.length; i++) {
      newTime = newTime + newAverages[i].timeTaken;
    }
    let newAverage = Math.round(newTime / newAverages.length);
    return oldAverage - newAverage;
  }

  @action.bound
  calculateAllAverages() {
    this.removeOutliers();
    this.metricStore.setAverageWorkflow(
      this.calculateAverage(this.metricStore.averages.workflow, this.metricStore.filterValue)
    );

    this.metricStore.setAverageUpload(
      this.calculateAverage(this.metricStore.averages.upload, this.metricStore.filterValue)
    );

    this.metricStore.setAverageRename(
      this.calculateAverage(this.metricStore.averages.rename, this.metricStore.filterValue)
    );

    this.metricStore.setAverageDownload(
      this.calculateAverage(this.metricStore.averages.download, this.metricStore.filterValue)
    );

    this.metricStore.setAverageConversion(
      this.calculateAverage(this.metricStore.averages.conversion, this.metricStore.filterValue)
    );
  }

  removeOutliers() {
    let newAverages: AverageModel = new AverageModel();
    for (let key in this.metricStore.averages) {
      if (this.metricStore.averages.hasOwnProperty(key)) {
        let averages = this.metricStore.averages[key].map((a: AverageSubsetModel) => {
          return a.timeTaken;
        });
        if (averages.length > 0) {
          let stdd = math.std(averages);
          let avg = math.mean(averages);
          let newValues = this.metricStore.averages[key].filter((a: AverageSubsetModel) => {
            return a.timeTaken >= (avg - (stdd * 2)) && a.timeTaken <= (avg + (stdd * 2));
          });
          newAverages[key] = [];
          newAverages[key] = newValues;
        }
      }
    }
    this.metricStore.setAverage(newAverages);
  }
}