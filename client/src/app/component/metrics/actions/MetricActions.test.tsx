import { MetricActions } from './MetricActions';
import { MetricRepository } from '../repository/MetricRepository';
import { StubMetricRepository } from '../repository/StubMetricRepository';
import { MetricStore } from '../MetricStore';
import { MetricModel } from '../MetricModel';
import * as moment from 'moment';
import { UnicornStore } from '../../unicorn/store/UnicornStore';

describe('MetricActions', () => {
  let subject: MetricActions;
  let metricStore: any;
  let metricRepository: MetricRepository;
  let unicornStore: UnicornStore;
  let uploadStore: any;

  beforeEach(() => {
    metricStore = new MetricStore();

    unicornStore = new UnicornStore();

    uploadStore = {
      hash: 'eresersr'
    };

    metricRepository = new StubMetricRepository();

    subject = new MetricActions({metricRepository} as any, {metricStore, uploadStore, unicornStore} as any);
  });

  it('should hydrate the metric store', async () => {
    await subject.initializeStores();
    expect(metricStore.metrics).toEqual(await metricRepository.findAll());
  });

  it('should track a metric', async () => {
    await subject.trackMetric('Upload');
    expect(metricStore.pendingUploadMetric).toEqual(
      await metricRepository.create(new MetricModel('', '', '', '', '', 1)
      ));
  });

  it('should add selected site to the UploadToUnicorn tracking metric', async () => {
    await subject.trackMetric('UploadToUnicorn');
    expect(metricStore.pendingUploadToUnicornMetric).toEqual(
      await metricRepository.create(new MetricModel('', 'Site: DGS 1 | Upload To Unicorn', '', '', '', 1)
      ));
  });

  it('should update the tracked metric', async () => {
    metricStore.setPendingDownloadMetric(new MetricModel('', '', '', '', '', 1));
    await subject.updateMetric('Download');
    expect(metricStore.pendingDownloadMetric.endTime).toBe(Math.round(Date.now() / 1000).toString());
  });

  it('should filter the metrics based on the option', async () => {
    await subject.filterMetrics(60 * 60 * 24);
    expect(metricStore.filteredMetrics).toEqual(metricStore.metrics.filter((m: MetricModel) => {
      return moment().unix() - parseInt(m.startTime, 10) < metricStore.filterValue;
    }));
  });

  it('should be able to push the data for averages for upload, rename, download, and conversion', async () => {
    await subject.initializeStores();
    expect(metricStore.averages.download.length).toBe(12);
    expect(metricStore.averages.upload.length).toBe(12);
    expect(metricStore.averages.rename.length).toBe(6);
    expect(metricStore.averages.conversion.length).toBe(5);
  });

  it('should calculate the average for the filtered metrics', async () => {
    await subject.initializeStores();
    expect(subject.calculateAverage(metricStore.averages.download, 60 * 60 * 24 * 10000000)).toBe(854);
  });

  it('should calculate the average difference for the filtered metrics', async () => {
    await subject.initializeStores();
    metricStore.setFilterValue(4);
    expect(subject.calculateAverageDifference('download')).toBe(1098);
  });

  it('should calculate and set all of the metrics', async () => {
    metricStore.setFilteredMetrics(await metricRepository.findAll());
    await subject.setWorkflowAverage();
    await subject.setAverages();
    subject.calculateAllAverages();
    expect(metricStore.averageWorkflow).toBe(13);
    expect(metricStore.averageUpload).toBe(0);
    expect(metricStore.averageRename).toBe(6);
    expect(metricStore.averageDownload).toBe(22);
    expect(metricStore.averageConversion).toBe(34);
  });

  it('should remove the outliers using the standard deviation of an array', async () => {
    metricStore.setFilteredMetrics(await metricRepository.findAll());
    await subject.setWorkflowAverage();
    await subject.setAverages();
    expect(metricStore.averages.download.length).toBe(12);
    subject.removeOutliers();
    expect(metricStore.averages.download.length).toBe(11);
  });
});