import { CalloutStatus, CalloutStore } from './CalloutStore';
import { UnicornStore } from '../store/UnicornStore';
import { CalloutModel } from '../model/CalloutModel';
import { SlideModel, SlideUploadStatus } from '../../slides/models/SlideModel';
import * as moment from 'moment';

describe('CalloutStore', () => {
  let subject: CalloutStore;
  let unicornStore: UnicornStore;
  let slide: SlideModel;

  beforeEach(() => {
    unicornStore = new UnicornStore();
    slide = new SlideModel();

    unicornStore.setOffline(false);

    subject = new CalloutStore(unicornStore, slide);
  });

  it('should change status to OFFLINE when Unicorn is offline', () => {
    unicornStore.setOffline(true);
    subject.updateStatus();
    expect(subject.status).toBe(CalloutStatus.OFFLINE);
  });

  it('should change status to online without callouts when no callouts exist', () => {
    unicornStore.setCallouts([]);
    subject.updateStatus();
    expect(subject.status).toBe(CalloutStatus.ONLINE_WITHOUT_CALLOUTS);
  });

  it('should change status to online with callouts if callouts exist', () => {
    unicornStore.setCallouts([new CalloutModel('', '', '', '', '', '', moment())]);
    subject.updateStatus();
    expect(subject.status).toBe(CalloutStatus.ONLINE_WITH_CALLOUTS);
  });

  it('should change status to waiting if upload queued', () => {
    slide.setUploadStatus(SlideUploadStatus.PENDING);
    subject.updateStatus();
    expect(subject.status).toBe(CalloutStatus.UPLOAD_PENDING);
  });

  it('should change status to in progress if upload started', () => {
    slide.setUploadStatus(SlideUploadStatus.IN_PROGRESS);
    subject.updateStatus();
    expect(subject.status).toBe(CalloutStatus.UPLOAD_IN_PROGRESS);
  });

  it('should change status to waiting if upload triggered', () => {
    slide.setUploadStatus(SlideUploadStatus.SUCCEEDED);
    subject.updateStatus();
    expect(subject.status).toBe(CalloutStatus.UPLOAD_SUCCEEDED);
  });

  it('should change status to waiting if upload triggered', () => {
    slide.setUploadStatus(SlideUploadStatus.FAILED);
    subject.updateStatus();
    expect(subject.status).toBe(CalloutStatus.UPLOAD_FAILED);
  });
});