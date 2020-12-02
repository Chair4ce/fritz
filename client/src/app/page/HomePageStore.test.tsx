import { HomePageDisplay, HomePageStore } from './HomePageStore';
import { CarouselStore } from '../component/carousel/CarouselStore';
import { UploadStore } from '../component/form/upload/UploadStore';
import { MissionModel } from '../component/unicorn/model/MissionModel';
import { UnicornStore } from '../component/unicorn/store/UnicornStore';

describe('HomePageStore', () => {
  let subject: HomePageStore;
  let carouselStore: CarouselStore;
  let uploadStore: UploadStore;
  let unicornStore: UnicornStore;

  beforeEach(function () {
    carouselStore = new CarouselStore();
    uploadStore = new UploadStore();
    unicornStore = new UnicornStore();

    subject = new HomePageStore(
      carouselStore,
      unicornStore,
      uploadStore,
    );
  });

  it('should start as default of select mission', () => {
    expect(subject.displayState).toBe(HomePageDisplay.SELECT_MISSION);
  });

  it('should toggle the help menu', () => {
    unicornStore.setActiveMission(new MissionModel('', '', '', '', '', '', ''));
    uploadStore.setUploaded(false);
    uploadStore.setUploading(false);
    uploadStore.setProcessing(false);
    expect(subject.displayState).toBe(HomePageDisplay.READY_TO_UPLOAD_TO_FRITZ);

    subject.toggleHelpMenu();
    expect(subject.displayState).toBe(HomePageDisplay.HELP);
    subject.toggleHelpMenu();
    expect(subject.displayState).toBe(HomePageDisplay.READY_TO_UPLOAD_TO_FRITZ);
  });

  it('should change status when ready to upload to fritz', () => {
    unicornStore.setActiveMission(new MissionModel('', '', '', '', '', '', ''));
    uploadStore.setUploaded(false);
    uploadStore.setUploading(false);
    uploadStore.setProcessing(false);
    expect(subject.displayState).toBe(HomePageDisplay.READY_TO_UPLOAD_TO_FRITZ);
  });

  it('should change status to uploading or processing within Fritz', () => {
    uploadStore.setUploading(true);
    expect(subject.displayState).toBe(HomePageDisplay.FRITZ_UPLOADING_OR_PROCESSING);
  });

  it('should change status to processing within Fritz', () => {
    uploadStore.setProcessing(true);
    expect(subject.displayState).toBe(HomePageDisplay.FRITZ_UPLOADING_OR_PROCESSING);
  });

  it('should change status to ready for slide viewing and editing', () => {
    uploadStore.setUploaded(true);
    unicornStore.setActiveMission(new MissionModel('', '', '', '', '', '', ''));
    expect(subject.displayState).toBe(HomePageDisplay.READY_FOR_SLIDE_VIEWING_AND_EDITING);
  });

  it('should return display carousel status', () => {
    uploadStore.setUploaded(true);
    unicornStore.setActiveMission(new MissionModel('', '', '', '', '', '', ''));
    carouselStore.setVisibility(true);
    expect(subject.displayState).toBe(HomePageDisplay.CAROUSEL);
    carouselStore.setVisibility(false);
    expect(subject.displayState).toBe(HomePageDisplay.READY_FOR_SLIDE_VIEWING_AND_EDITING);
  });

  it('should change status when unicorn is offline', () => {
    unicornStore.setOfflineModal(true);
    expect(subject.displayState).toBe(HomePageDisplay.UNICORN_OFFLINE_MODAL);
  });

  it('should change status for unicorn upload confirmation', () => {
    uploadStore.setUploaded(true);
    unicornStore.setActiveMission(new MissionModel('', '', '', '', '', '', ''));
    unicornStore.setPendingUpload(true);
    expect(subject.displayState).toBe(HomePageDisplay.CONFIRM_UPLOAD_TO_UNICORN);
    unicornStore.setPendingUpload(false);
    expect(subject.displayState).toBe(HomePageDisplay.READY_FOR_SLIDE_VIEWING_AND_EDITING);
  });
});