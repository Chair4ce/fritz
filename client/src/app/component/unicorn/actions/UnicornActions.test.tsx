import { UnicornActions } from './UnicornActions';
import { UnicornRepository } from '../repositories/UnicornRepository';
import { StubUnicornRepository } from '../repositories/StubUnicornRepository';
import { SlideModel, SlideUploadStatus } from '../../slides/models/SlideModel';
import { UnicornStore } from '../store/UnicornStore';
import { MissionModel } from '../model/MissionModel';
import { SlidesStore } from '../../slides/store/SlidesStore';
import { CalloutModel } from '../model/CalloutModel';
import { UploadStore } from '../../form/upload/UploadStore';
import { StubMetricRepository } from '../../metrics/repository/StubMetricRepository';
import { MetricRepository } from '../../metrics/repository/MetricRepository';
import { UnicornUploadStatusModel } from '../model/UnicornUploadStatusModel';
import { ReleasabilityModel } from '../model/ReleasabilityModel';
import { Toast } from '../../../../utils/Toast';
import * as moment from 'moment';
import { HomePageDisplay, HomePageStore } from '../../../page/HomePageStore';

describe('UnicornActions', () => {
  let subject: UnicornActions;
  let unicornStore: UnicornStore;
  let slidesStore: SlidesStore;
  let unicornRepository: UnicornRepository;
  let slide: SlideModel;
  let slides: SlideModel[];
  let uploadStore: UploadStore;
  let metricRepository: MetricRepository;
  let homePageStore: HomePageStore;

  beforeEach(() => {
    homePageStore = new HomePageStore({} as any, {} as any, {} as any);
    unicornStore = new UnicornStore();
    uploadStore = new UploadStore();
    unicornStore.setActiveMission(new MissionModel('1', '', '', '', '', '', ''));
    metricRepository = new StubMetricRepository();
    slide = new SlideModel();
    slide.setId(1);
    slidesStore = new SlidesStore();
    slides = [
      new SlideModel('on1', 'nn1', '1450', 'a1', false, '78282-sd-23512520', 'r1'),
      new SlideModel('on2', 'nn2', '1451', 'a2', false, 'id2', 'r2'),
      new SlideModel('on3', 'nn3', 't3', 'a3', false, '', 'r3'),
      new SlideModel('on4', 'nn4', 't4', 'a4', true, 'id4', 'r4'),
      new SlideModel('', '', '1454', 'a5'),
      new SlideModel('', '', '1455', 'a6'),
    ];

    slidesStore.setSlides(slides);
    unicornRepository = new StubUnicornRepository();

    subject = new UnicornActions(
      {unicornRepository, metricRepository} as any, {unicornStore, slidesStore, uploadStore, homePageStore} as any
    );

    subject.metricActions.updateMetric = jest.fn();
    subject.statisticActions.createOrUpdate = jest.fn();
  });

  it('should hydrate the unicorn store', async () => {
    let hydrateSpy = jest.fn();
    unicornStore.hydrate = hydrateSpy;
    await subject.initializeStores();
    expect(hydrateSpy).toHaveBeenCalled();
  });

  it('should match the callouts when getCallouts is called', async () => {
    subject.checkForCalloutMatches = jest.fn();

    await subject.getCallouts('test');
    expect(unicornStore.callouts[0]).toEqual({
      '_activity': 'Stuff here',
      '_classification': '2351-ei-235223',
      '_eventId': '78282-sd-23512521',
      '_name': 'Callout1',
      '_releasability': 'sas-232-1293821',
      '_time': '1450',
      '_date': null
    });
    expect(unicornStore.pendingCallouts).toBeFalsy();
    expect(subject.checkForCalloutMatches).toHaveBeenCalled();
  });

  it('should check for callout matches and matches dates & times to slides', () => {
    let calloutDate = (moment('2019-03-17'));
    let callout2Date = (moment('2019-03-18'));
    slidesStore.setSlides([
      new SlideModel('', '', '1234', '', false, 'eventId', '', null),
      new SlideModel('', '', '2345', '', false, '', '', moment('2001-01-01')),
      new SlideModel('', '', '0123', '', false, '', '', null)
    ]);

    unicornStore.setCallouts([
      new CalloutModel('name', 'class', 'rel', 'acty', 'evntid', '1234', calloutDate),
      new CalloutModel('name', 'class', 'rel', 'acty', 'evntid2', '2345', null),
      new CalloutModel('name', 'class', 'rel', 'acty', 'evntid3', '0123', callout2Date)
    ]);
    subject.checkForCalloutMatches();

    expect(slidesStore.slides[0].targetEventId).toBe('evntid');
    expect(slidesStore.slides[0].date).toBe(calloutDate);
    expect(slidesStore.slides[1].targetEventId).toBe('evntid2');

    let today = moment();
    expect(slidesStore.slides[1].yearTwoDigit).toEqual(today.year().toString().slice(-2));
    expect(slidesStore.slides[1].monthThreeLetter).toEqual(moment.monthsShort('-MMM-', today.month()));
    expect(slidesStore.slides[1].date.toISOString().slice(0, 16)).toEqual(today.toISOString().slice(0, 16));

    expect(slidesStore.slides[2].targetEventId).toBe('evntid3');
    expect(slidesStore.slides[2].date).toBe(callout2Date);
  });

  it('should refresh the callouts from UNICORN without altering previously matched slides', async () => {
    let firstSlideOriginalCalloutId = '78282-sd-23512520';
    let firstSlideOriginalTime = '1450';
    let secondSlideOriginalTime = '1451';
    let fifthSlideAutomatchedCallout = '78282-sd-23512524';
    let sixthSlideAutomatchedCallout = '78282-sd-23512525';
    let secondSlideRefreshedCalloutId = '78282-sd-23512521';

    let refreshedCallouts = [
      new CalloutModel('Callout1', 'c', 'r', 'a', firstSlideOriginalCalloutId, firstSlideOriginalTime, moment()),
      new CalloutModel('Callout2', 'c', 'r', 'a', secondSlideRefreshedCalloutId, secondSlideOriginalTime, moment()),
      new CalloutModel('Callout3', 'c', 'r', 'a', '78282-sd-23512522', '1452Z', moment()),
      new CalloutModel('Callout4', 'c', 'r', 'a', '78282-sd-23512523', '1453Z', moment()),
      new CalloutModel('Callout5', 'c', 'r', 'a', fifthSlideAutomatchedCallout, '1454Z', moment()),
      new CalloutModel('Callout6', 'c', 'r', 'a', sixthSlideAutomatchedCallout, '1455Z', moment()),
    ];
    let getRefreshedCallouts = (missionId: string): Promise<CalloutModel[]> => {
      return Promise.resolve(refreshedCallouts);
    };
    unicornRepository.getCallouts = getRefreshedCallouts;
    unicornStore.setRefreshing(true);

    await subject.refreshCallouts();

    expect(unicornStore.callouts).toEqual(refreshedCallouts);
    expect(slidesStore.slides[0].targetEventId).toBe(firstSlideOriginalCalloutId);
    expect(slidesStore.slides[0].time).toBe(firstSlideOriginalTime);
    expect(slidesStore.slides[1].targetEventId).toBe(secondSlideRefreshedCalloutId);
    expect(slidesStore.slides[1].time).toBe(secondSlideOriginalTime);
    expect(slidesStore.slides[4].targetEventId).toBe(fifthSlideAutomatchedCallout);
    expect(slidesStore.slides[5].targetEventId).toBe(sixthSlideAutomatchedCallout);
    expect(unicornStore.isRefreshing).toBeFalsy();
  });

  it('should return a callout that matches a slide by time', () => {
    let callouts = [
      new CalloutModel('Callout1', 'c', 'r', 'a', 'eid', '1234Z', moment()),
      new CalloutModel('Callout1', 'c', 'r', 'a', 'eid', '0123', moment())
    ];
    let slideModel = new SlideModel();
    slideModel.setTime('1234');
    expect(subject.matchingCalloutFromSlideTime(callouts, slideModel)).toEqual(callouts[0]);
    slideModel.setTime('2345');
    expect(subject.matchingCalloutFromSlideTime(callouts, slideModel)).toEqual(null);
    slideModel.setTime('0123');
    expect(subject.matchingCalloutFromSlideTime(callouts, slideModel)).toEqual(callouts[1]);
    slideModel.setTime('');
    expect(subject.matchingCalloutFromSlideTime(callouts, slideModel)).toEqual(null);
  });

  it('should get releasabilities from unicorn', async () => {
    await subject.getReleasabilities();
    expect(unicornStore.releasabilities).toEqual([new ReleasabilityModel('1', 'Unclass', 0)]);
  });

  it('should set the unicorn model with some stuff from the slide model', async () => {
    let returnValue = await subject.setUnicornModel(new SlideModel(
      'TestName', 'New Test Name', '', '', false, 'eventId', ''
    ));
    expect(returnValue.fileName).toBe('TestName');
    expect(returnValue.productName).toBe('New Test Name');
    expect(returnValue.targetEventId).toBe('eventId');
  });

  it('should go through the queue and upload', async () => {
    unicornStore.addToUploadQueue(slides[0]);
    unicornStore.addToUploadQueue(slides[1]);
    subject.buildUploadModel = jest.fn();

    await subject.startUploading();
    expect(subject.buildUploadModel).toHaveBeenCalledTimes(2);
    expect(unicornStore.uploadQueue.length).toBe(0);
  });

  it('should check for unassigned callouts', () => {
    slidesStore.setSlides([
      new SlideModel('', '', '', '', false, 'eventId', ''),
      new SlideModel('', '', '', '', false, '', ''),
      new SlideModel('', '', '', '', false, '', '')
    ]);

    subject.checkForUnassignedCallouts();
    expect(unicornStore.unassignedCallouts).toBeTruthy();
  });

  it('should upload to unicorn ', async () => {
    let isUploadFinishedSpy = jest.fn();
    metricRepository.create = jest.fn();
    subject.isUploadFinished = isUploadFinishedSpy;
    unicornRepository.upload = jest.fn(() => {
      return Promise.resolve(
        new UnicornUploadStatusModel(true)
      );
    });

    await subject.buildUploadModel(slide);
    expect(unicornRepository.upload).toHaveBeenCalledTimes(1);
    expect(isUploadFinishedSpy).toHaveBeenCalled();
    expect(metricRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({_action: 'Image Uploaded to Unicorn'})
    );
    expect(slide.uploadStatus).toBe(SlideUploadStatus.SUCCEEDED);

    unicornRepository.upload = jest.fn(() => {
      return Promise.resolve(
        new UnicornUploadStatusModel(false)
      );
    });

    await subject.buildUploadModel(slide);
    expect(unicornRepository.upload).toHaveBeenCalledTimes(3);
    expect(isUploadFinishedSpy).toHaveBeenCalled();
    expect(slide.uploadStatus).toBe(SlideUploadStatus.FAILED);
  });

  it('should start without any validation until upload button clicks then validateInput on change', async () => {
    expect(slidesStore.hasInitiallyValidated).toBeFalsy();
    await subject.uploadToUnicorn();
    expect(slidesStore.hasInitiallyValidated).toBeTruthy();
  });

  it('should check the status of Unicorn when upload button is clicked', () => {
    let hydrateSpy = jest.fn();
    unicornStore.hydrate = hydrateSpy;
    subject.uploadToUnicorn();
    expect(hydrateSpy).toHaveBeenCalled();
  });

  it('should validateInput input fields on upload button click and before modal is rendered', async () => {
    let modalSpy = jest.fn();
    subject.renderUploadModal = modalSpy;

    await subject.uploadToUnicorn();
    expect(modalSpy).not.toHaveBeenCalled();

    let validateMock = jest.fn();
    validateMock.mockReturnValue(true);
    slidesStore.validate = validateMock;

    await subject.uploadToUnicorn();
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should render a modal', () => {
    subject.renderUploadModal();
    expect(unicornStore.pendingUpload).toBeTruthy();
  });

  it('should upload to unicorn on modal confirmation', async () => {
    unicornStore.setPendingUpload(true);
    expect(unicornStore.pendingUpload).toBeTruthy();
    subject.metricActions.trackMetric = jest.fn();
    subject.metricActions.updateMetric = jest.fn();
    subject.metricActions.createMetric = jest.fn();
    let addToQueueSpy = jest.spyOn(unicornStore, 'addToUploadQueue');

    await subject.confirmUpload();
    expect(subject.slidesForUpload.length).toBe(2);
    expect(subject.metricActions.trackMetric).toHaveBeenCalledWith('UploadToUnicorn');
    expect(subject.metricActions.createMetric).toHaveBeenCalled();
    expect(subject.metricActions.updateMetric).toHaveBeenCalledWith('Renaming');
    expect(unicornStore.pendingUpload).toBeFalsy();
    expect(unicornStore.isUploading).toBeFalsy();
    expect(unicornStore.uploadComplete).toBeTruthy();
    expect(addToQueueSpy).toHaveBeenCalledTimes(2);
    expect(unicornStore.uploadQueue.length).toBe(0);
  });

  it('should filter out slides without GUIDs that are not pending deleted from user', () => {
    subject.metricActions.createMetric = jest.fn();
    let actualSlides = subject.filterSlides(slides);
    expect(actualSlides.length).toBe(2);
    expect(actualSlides).toContain(slides[0]);
    expect(actualSlides).toContain(slides[1]);
    expect(subject.metricActions.createMetric).toHaveBeenCalledWith('Delete JPG');
  });

  it('should close the Upload Modal and reset all pending upload states', () => {
    subject.closeUploadModal();
    expect(unicornStore.pendingUpload).toBeFalsy();
    expect(unicornStore.uploadComplete).toBeFalsy();
    expect(unicornStore.unassignedCallouts).toBeFalsy();
    expect(slidesStore.assignedCalloutCount).toBe(0);
  });

  it('should reset active mission to null', () => {
    subject.resetActiveMission();
    expect(unicornStore.activeMission).toBeNull();
  });

  it('should call hydrate when refresh unicorn is called', async () => {
    let hydrateMock = jest.fn();
    unicornStore.hydrate = hydrateMock;
    await subject.refreshUnicorn();
    expect(hydrateMock).toHaveBeenCalled();
  });

  it('should empty the upload queue and display a toast when cancel is called', () => {
    let toastSpy = jest.fn();
    Toast.create = toastSpy;
    unicornStore.setUploadQueue([new SlideModel(), new SlideModel()]);
    subject.cancelUpload();
    expect(toastSpy).toHaveBeenCalledWith(5000, 'deleteToast', 'Upload Cancelled');
    expect(unicornStore.uploadQueue).toEqual([]);
  });

  it('should close the mission modal and set Fritz to offline mode', () => {
    subject.closeMissionModal();
    expect(unicornStore.offline).toBeTruthy();
    expect(homePageStore.displayState).toBe(HomePageDisplay.READY_TO_UPLOAD_TO_FRITZ);
  });
});