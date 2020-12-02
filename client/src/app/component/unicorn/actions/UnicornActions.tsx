import { UnicornStore } from '../store/UnicornStore';
import { UnicornRepository } from '../repositories/UnicornRepository';
import { Repositories } from '../../../../utils/Repositories';
import { Stores } from '../../../../utils/Stores';
import { action } from 'mobx';
import { SlideModel, SlideUploadStatus } from '../../slides/models/SlideModel';
import { UnicornUploadModel } from '../model/UnicornUploadModel';
import { SlidesStore } from '../../slides/store/SlidesStore';
import { MetricActions } from '../../metrics/actions/MetricActions';
import { UnicornUploadStatusModel } from '../model/UnicornUploadStatusModel';
import { MetricType } from '../../metrics/MetricModel';
import { Toast } from '../../../../utils/Toast';
import { StatisticActions } from '../../metrics/actions/StatisticActions';
import { StatisticModel } from '../../metrics/StatisticModel';
import { CalloutModel } from '../model/CalloutModel';
import * as moment from 'moment';
import { HomePageDisplay, HomePageStore } from '../../../page/HomePageStore';

export class UnicornActions {
  public metricActions: MetricActions;
  public statisticActions: StatisticActions;
  slidesForUpload: SlideModel[];
  private unicornStore: UnicornStore;
  private slidesStore: SlidesStore;
  private homePageStore: HomePageStore;
  private readonly unicornRepository: UnicornRepository;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.unicornStore = stores.unicornStore!;
    this.slidesStore = stores.slidesStore!;
    this.homePageStore = stores.homePageStore!;
    this.unicornRepository = repositories.unicornRepository!;
    this.metricActions = new MetricActions(repositories, stores);
    this.statisticActions = new StatisticActions(repositories, stores);
  }

  @action.bound
  async initializeStores() {
    await this.unicornStore.hydrate(this.unicornRepository);
  }

  @action.bound
  async getCallouts(missionId: string) {
    this.unicornStore.setPendingCallouts(true);
    this.unicornStore.setCallouts([]);
    this.unicornStore.setCallouts(await this.unicornRepository.getCallouts(missionId));
    this.unicornStore.setPendingCallouts(false);
    this.checkForCalloutMatches();
  }

  @action.bound
  async refreshCallouts() {
    this.unicornStore.setRefreshing(true);
    this.unicornStore.setCallouts(
      await this.unicornRepository.getCallouts(
        this.unicornStore.activeMission!.id
      )
    );

    this.checkForCalloutMatches();
    this.unicornStore.setRefreshing(false);
  }

  @action.bound
  async getReleasabilities() {
    this.unicornStore.setReleasabilities(await this.unicornRepository.getReleasabilities());
  }

  async isUploadFinished() {
    if (this.slidesStore!.assignedCalloutCount === this.unicornStore!.currentUploadCount) {
      this.unicornStore!.setUploadComplete(true);
      await this.metricActions!.updateMetric('UploadToUnicorn');
      this.unicornStore!.setCurrentUploadCount(0);
    }
  }

  setUnicornModel(s: SlideModel) {
    let unicornUploadModel = new UnicornUploadModel();
    unicornUploadModel.setFileName(s.oldName);
    unicornUploadModel.setEndFilePath('\\Mission\\' + this.unicornStore.activeMission!.id);
    unicornUploadModel.setProductName(s.newName);
    unicornUploadModel.setClassificationId('a8b17b94-f23a-41a1-822f-96c7ce642006');
    unicornUploadModel.setTargetEventId(s.targetEventId);
    unicornUploadModel.setReleasabilityId(this.unicornStore!.releasabilityId);
    unicornUploadModel.setMissionId(this.unicornStore.activeMission!.id);
    unicornUploadModel.setPersonnelId('2a7081f8-7cc9-45f3-a29e-f94a0003b3fe');
    unicornUploadModel.setIsrRoleId('');
    return unicornUploadModel;
  }

  async buildUploadModel(slide: SlideModel) {
    slide.setUploadStatus(SlideUploadStatus.IN_PROGRESS);
    for (let i = 0; i < 3; i++) {
      let status: UnicornUploadStatusModel = await this.unicornRepository.upload(
        this.setUnicornModel(slide)
      );
      if (status.successfulUpload) {
        slide.setUploadStatus(SlideUploadStatus.SUCCEEDED);
        this.increaseCurrentUploadCount();
        this.metricActions.createMetric(MetricType.UNICORN_UPLOAD_SUCCESS);
        this.metricActions.createMetric(this.slidesStore.opName + ' / ' + slide.calloutTime + ' | ' + slide.activity);
        break;
      }
      if (i === 2 && !status.successfulUpload) {
        slide.setUploadStatus(SlideUploadStatus.FAILED);
        this.metricActions!.createMetric(MetricType.UNICORN_UPLOAD_FAILURE);
      }
    }
    this.isUploadFinished();
  }

  closeUploadModal() {
    this.unicornStore.setPendingUpload(false);
    this.unicornStore.setUploadComplete(false);
    this.unicornStore.setUnassignedCallouts(false);
    this.slidesStore.setAssignedCalloutCount(0);
  }

  @action.bound
  setReleasabilityId(rel: string) {
    const releasabilities = this.unicornStore!.releasabilities;
    for (let i = 0; i < releasabilities.length; i++) {
      if (rel === releasabilities[i].releasabilityName) {
        return this.unicornStore!.setReleasabilityId(releasabilities[i].releasabilityId);
      }
    }
    return rel;
  }

  increaseCurrentUploadCount = () => {
    this.unicornStore!.setCurrentUploadCount(this.unicornStore!.currentUploadCount + 1);
  };

  uploadToUnicorn = async () => {
    this.unicornStore!.setCurrentUploadCount(0);
    if (this.slidesStore.slides.length === 0) {
      this.triggerMustUploadFirstToast();
    }
    this.slidesStore.initialValidation();
    await this.unicornStore!.hydrate(this.unicornRepository);
    if (!this.unicornStore.offline && this.slidesStore.validate()) {
      this.renderUploadModal();
    }
  };

  filterSlides(slides: SlideModel[]): SlideModel[] {
    return slides.filter((slide: SlideModel) => {
      if (slide.deleted) {
        this.metricActions!.createMetric('Delete JPG');
      }
      return (slide.isReadyForUpload());
    });
  }

  triggerMustUploadFirstToast() {
    Toast.create(
      5000,
      'errorToast',
      '<b>Error:</b> You must upload a PDF file before you can upload JPEGS to UNICORN'
    );
  }

  renderUploadModal() {
    this.unicornStore.setPendingUpload(true);
    this.checkForUnassignedCallouts();
  }

  async startUploading() {
    if (!this.unicornStore.uploadsInProgress) {
      while (this.unicornStore.uploadQueue.length > 0) {
        this.unicornStore.setUploadsInProgress(true);
        await this.buildUploadModel(this.unicornStore.uploadQueue[0]);
        this.unicornStore.uploadQueue.shift();
      }
      this.unicornStore.setUploadsInProgress(false);
    }
  }

  @action.bound
  checkForUnassignedCallouts() {
    let slides = this.slidesStore.slides;
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].targetEventId === '') {
        this.unicornStore!.setUnassignedCallouts(true);
        break;
      } else {
        this.unicornStore!.setUnassignedCallouts(false);
      }
    }
  }

  @action.bound
  async confirmUpload() {
    this.unicornStore.setPendingUpload(false);
    this.slidesForUpload = this.filterSlides(this.slidesStore.slides);
    this.unicornStore.setIsUploading(true);
    this.setReleasabilityId(this.unicornStore!.releasability);
    await this.statisticActions.createOrUpdate(new StatisticModel(this.unicornStore.releasabilityId, 1));
    await this.metricActions.trackMetric('UploadToUnicorn');
    await this.metricActions.createMetric('Releasability: ' + this.unicornStore.releasability);
    await this.metricActions.updateMetric('Renaming');
    for (let i = 0; i < this.slidesForUpload.length; i++) {
      await this.unicornStore.addToUploadQueue(this.slidesForUpload[i]);
    }

    await this.startUploading();
    this.unicornStore.setUploadComplete(true);
  }

  checkForCalloutMatches() {
    this.slidesStore.slides.map((slide) => {
      let callout = this.matchingCalloutFromSlideTime(
        this.unicornStore.callouts,
        slide
      );
      if (callout) {
        slide.setTargetEventId(callout.eventId);
        slide.setCalloutTime(callout.time ? callout.time : '');
        slide.setDate(callout.date ? callout.date : moment().utc());
      }
    });
  }

  matchingCalloutFromSlideTime(
    callouts: CalloutModel[],
    slide: SlideModel
  ): CalloutModel | null {
    let matchingCallouts =
      callouts.filter((callout) => {
          if (callout.time) {
            return callout.time === slide.time;
          } else {
            return;
          }
        }
      );
    return matchingCallouts.length > 0 ? matchingCallouts[0] : null;
  }

  @action.bound
  resetActiveMission() {
    this.unicornStore.setActiveMission(null);
  }

  @action.bound
  async refreshUnicorn() {
    this.unicornStore!.setRefreshing(true);
    await this.unicornStore!.hydrate(this.unicornRepository);
    this.unicornStore!.setRefreshing(false);
  }

  @action.bound
  cancelUpload() {
    Toast.create(5000, 'deleteToast', 'Upload Cancelled');
    this.unicornStore!.setUploadsInProgress(false);
    this.unicornStore!.setUploadQueue([]);
  }

  @action.bound
  closeMissionModal() {
    this.unicornStore!.setOffline(true);
    this.homePageStore!.setDisplayState(HomePageDisplay.READY_TO_UPLOAD_TO_FRITZ);
  }
}