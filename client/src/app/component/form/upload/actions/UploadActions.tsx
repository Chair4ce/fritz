import { UploadRepository } from '../repository/UploadRepository';
import { Repositories } from '../../../../../utils/Repositories';
import { action } from 'mobx';
import { UploadStore } from '../UploadStore';
import { Stores } from '../../../../../utils/Stores';
import { StatusModel } from '../../status/StatusModel';
import { SlidesStore } from '../../../slides/store/SlidesStore';
import { SlideModel } from '../../../slides/models/SlideModel';
import { SlidesActions } from '../../../slides/actions/SlidesActions';
import { MetricActions } from '../../../metrics/actions/MetricActions';
import { UnicornStore } from '../../../unicorn/store/UnicornStore';
import { ReleasabilityModel } from '../../../unicorn/model/ReleasabilityModel';
import { UnicornActions } from '../../../unicorn/actions/UnicornActions';

export class UploadActions {
  public metricActions: MetricActions;
  public slidesActions: SlidesActions;
  private uploadRepository: UploadRepository;
  private uploadStore: UploadStore;
  private unicornStore: UnicornStore;
  private slidesStore: SlidesStore;
  private unicornActions: UnicornActions;
  private poll: any;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.uploadRepository = repositories.uploadRepository!;
    this.uploadStore = stores.uploadStore!;
    this.unicornStore = stores.unicornStore!;
    this.slidesStore = stores.slidesStore!;
    this.slidesActions = new SlidesActions(repositories, stores);
    this.metricActions = new MetricActions(repositories, stores);
    this.unicornActions = new UnicornActions(repositories, stores);
  }

  @action.bound
  async upload(file: object) {
    await this.metricActions.trackMetric('Upload');
    this.uploadStore.setUploading(true);
    const resp = await this.uploadRepository.upload(file);
    this.uploadStore.setHash(resp.hash);
    await this.metricActions.updateMetric('Upload');
    this.uploadStore.setUploaded(true);
    this.uploadStore.setFileName(resp.file);
    this.uploadStore.setUploading(false);
    this.uploadStore.setProcessing(true);
    this.uploadStore.setPlaceholder(false);
    this.uploadStore.setConversionStatus(true);
    await this.metricActions.trackMetric('Conversion');
    this.poll = setInterval(
      async () => {
        await this.checkStatus();
      },
      1000
    );
  }

  @action.bound
  async checkStatus() {
    this.uploadRepository.status()
      .then((status: StatusModel) => {
        if (status.status === 'pending') {
          this.uploadStore.setTotal(status.total);
          this.uploadStore.setProgress(status.progress);
        }
        if (status.status === 'complete') {
          this.metricActions.updateMetric('Conversion');
          this.metricActions.trackMetric('Renaming');
          this.metricActions.trackConversion(status.files.length);
          this.slidesStore.setFiles(status.files);
          this.setSlides(status.files, status.times);
          if (status.date && status.date !== '') {
            this.slidesStore.setAllSlidesDates(status.date);
          }
          if (status.op && status.op !== '') {
            this.slidesActions.setAndUpdateOpName(status.op);
            this.setOpInput(status.op);
          }
          if (status.callsign && status.callsign !== '') {
            this.slidesActions.setAndUpdateAsset(status.callsign);
            this.setCallsignInput(status.callsign);
          }
          if (status.releasability && status.releasability !== '') {
            if (this.unicornStore.releasabilities.some(
              (r: ReleasabilityModel) => {
                return r.releasabilityName === status.releasability;
              })
            ) {
              this.slidesActions.setAndUpdateReleasability(status.releasability);
              this.setReleasabilityInput(status.releasability);
              this.unicornStore.setReleasability(status.releasability);
            }
            this.unicornStore.setPendingReleasability(status.releasability);
          }
          this.unicornActions.checkForCalloutMatches();
          this.slidesActions.updateNewNames();
          this.uploadProcessingComplete();
          this.slidesActions!.compareCallsigns();
          this.slidesStore!.validate();
        }
      });
    return;
  }

  setOpInput(op: string) {
    this.slidesStore!.setOpName(op);
    let opInput = document.querySelector('#opInput') as HTMLInputElement;
    if (opInput) {
      opInput.value = op;
    }
  }

  setCallsignInput(callsign: string) {
    this.slidesStore!.setAsset(callsign);
    let callsignInput = document.querySelector('#assetInput') as HTMLInputElement;
    if (callsignInput) {
      callsignInput.value = callsign;
    }
    this.slidesActions!.compareCallsigns();
  }

  setReleasabilityInput(releasability: string) {
    this.slidesStore!.setReleasability(releasability);
    let releasabilityInput = document.querySelector(
      '.form-group:last-of-type > .dropdown > button'
    ) as HTMLElement;
    if (releasabilityInput) {
      releasabilityInput.innerHTML = releasability;
    }
  }

  @action.bound
  clearPoll() {
    clearInterval(this.poll);
  }

  @action.bound
  setSlides(names: string[], times: string[]) {
    let temp: SlideModel[] = [];
    names.map((name, idx) => {
      let slide = new SlideModel();
      if (times[idx]) {
        slide.setTime(times[idx]);
      }
      slide.setId(idx);
      slide.setOldName(name);
      slide.setHash(this.uploadStore.hash);
      temp.push(slide);
    });
    this.slidesStore.setSlides(temp);
  }

  uploadProcessingComplete() {
    clearInterval(this.poll);
    this.uploadStore.setProcessing(false);
    this.uploadStore.setConversionStatus(false);
  }
}