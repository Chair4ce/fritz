import { CarouselStore } from '../component/carousel/CarouselStore';
import { UploadStore } from '../component/form/upload/UploadStore';
import { UnicornStore } from '../component/unicorn/store/UnicornStore';
import { action, autorun, computed, observable } from 'mobx';

export enum HomePageDisplay {
  UNICORN_OFFLINE_MODAL,
  SELECT_MISSION,
  HELP,
  READY_TO_UPLOAD_TO_FRITZ,
  FRITZ_UPLOADING_OR_PROCESSING,
  READY_FOR_SLIDE_VIEWING_AND_EDITING,
  CAROUSEL,
  CONFIRM_UPLOAD_TO_UNICORN
}

export class HomePageStore {
  @observable _displayState: HomePageDisplay = HomePageDisplay.SELECT_MISSION;
  @observable carouselStore: CarouselStore;
  @observable unicornStore: UnicornStore;
  @observable uploadStore: UploadStore;
  @observable _isDisplayingHelpMenu: boolean = false;

  constructor(
    carouselStore: CarouselStore,
    unicornStore: UnicornStore,
    uploadStore: UploadStore
  ) {
    this.carouselStore = carouselStore;
    this.unicornStore = unicornStore;
    this.uploadStore = uploadStore;
    autorun(() => {
      this.updateState();
    });
  }

  updateState() {
    if (this.shouldDisplayUnicornOfflineModal()) {
      this.setDisplayState(HomePageDisplay.UNICORN_OFFLINE_MODAL);
    } else if (this.isDisplayingHelpMenu) {
      this.setDisplayState(HomePageDisplay.HELP);
    } else if (this.hasNotSelectedMission()) {
      this.setDisplayState(HomePageDisplay.SELECT_MISSION);
    } else if (this.isReadyForUploadToFritz()) {
      this.setDisplayState(HomePageDisplay.READY_TO_UPLOAD_TO_FRITZ);
    } else if (this.isUploadingOrProcessing()) {
      this.setDisplayState(HomePageDisplay.FRITZ_UPLOADING_OR_PROCESSING);
    } else if (this.isReadyForSlideViewingAndEditing()) {

      if (this.isCarouselSummoned()) {
        this.setDisplayState(HomePageDisplay.CAROUSEL);
      } else if (this.isUnicornUploadPending()) {
        this.setDisplayState(HomePageDisplay.CONFIRM_UPLOAD_TO_UNICORN);
      } else {
        this.setDisplayState(HomePageDisplay.READY_FOR_SLIDE_VIEWING_AND_EDITING);
      }
    }
  }

  @computed
  get displayState() {
    return this._displayState;
  }

  @computed
  get isDisplayingHelpMenu() {
    return this._isDisplayingHelpMenu;
  }

  @action.bound
  setDisplayState(state: HomePageDisplay) {
    this._displayState = state;
  }

  @action.bound
  toggleHelpMenu() {
    this._isDisplayingHelpMenu = !this._isDisplayingHelpMenu;
  }

  private isCarouselSummoned() {
    return this.carouselStore.isVisible;
  }

  private isReadyForSlideViewingAndEditing() {
    return (this.uploadStore.uploaded);
  }

  private isUploadingOrProcessing() {
    return (
      this.uploadStore.uploading
      || this.uploadStore.processing
    );
  }

  private shouldDisplayUnicornOfflineModal() {
    return this.unicornStore.offlineModal;
  }

  private isReadyForUploadToFritz() {
    return (
      !this.hasNotSelectedMission()
      && !this.uploadStore.uploaded
      && !this.isUploadingOrProcessing()
    );
  }

  private isUnicornUploadPending() {
    return this.unicornStore.pendingUpload;
  }

  private hasNotSelectedMission() {
    return (
      this.unicornStore.activeMission === null && !this.unicornStore.offline
      && !this.isUploadingOrProcessing()
    );
  }
}