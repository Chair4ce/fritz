import { computed, observable } from 'mobx';
import { SlideModel, SlideUploadStatus } from '../../slides/models/SlideModel';
import { UnicornStore } from '../store/UnicornStore';

export enum CalloutStatus {
  UPLOAD_PENDING,
  UPLOAD_FAILED,
  UPLOAD_SUCCEEDED,
  UPLOAD_IN_PROGRESS,
  ONLINE_WITH_CALLOUTS,
  ONLINE_WITHOUT_CALLOUTS,
  OFFLINE,
}

export class CalloutStore {
  @observable _status: CalloutStatus = CalloutStatus.OFFLINE;
  @observable slide: SlideModel;
  @observable unicornStore: UnicornStore;

  constructor(unicornStore: UnicornStore, slide: SlideModel) {
    this.slide = slide;
    this.unicornStore = unicornStore;
    this.updateStatus();
  }

  updateStatus() {
    if (this.slide.uploadStatus === SlideUploadStatus.NOT_STARTED) {
      if (this.unicornStore.offline) {
        this.setStatus(CalloutStatus.OFFLINE);
        return;
      }
      if (this.unicornStore.callouts.length === 0) {
        this.setStatus(CalloutStatus.ONLINE_WITHOUT_CALLOUTS);
        return;
      }
      if (this.unicornStore.callouts.length > 0) {
        this.setStatus(CalloutStatus.ONLINE_WITH_CALLOUTS);
        return;
      }
    }
    switch (this.slide.uploadStatus) {
      case SlideUploadStatus.PENDING:
        this.setStatus(CalloutStatus.UPLOAD_PENDING);
        break;
      case SlideUploadStatus.IN_PROGRESS:
        this.setStatus(CalloutStatus.UPLOAD_IN_PROGRESS);
        break;
      case SlideUploadStatus.SUCCEEDED:
        this.setStatus(CalloutStatus.UPLOAD_SUCCEEDED);
        break;
      case SlideUploadStatus.FAILED:
        this.setStatus(CalloutStatus.UPLOAD_FAILED);
        break;
      default:
        this.setStatus(CalloutStatus.ONLINE_WITH_CALLOUTS);
    }
  }

  setStatus(status: CalloutStatus) {
    this._status = status;
  }

  @computed
  get status() {
    return this._status;
  }
}