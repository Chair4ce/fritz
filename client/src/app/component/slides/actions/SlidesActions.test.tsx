import { SlidesActions } from './SlidesActions';
import { SlidesStore } from '../store/SlidesStore';
import { SlideModel } from '../models/SlideModel';
import { UploadStore } from '../../form/upload/UploadStore';
import { UnicornStore } from '../../unicorn/store/UnicornStore';
import { MissionModel } from '../../unicorn/model/MissionModel';
import { DropdownOption } from '../../dropdown/Dropdown';
import { Toast } from '../../../../utils/Toast';
import * as moment from 'moment';
import { CalloutModel } from '../../unicorn/model/CalloutModel';

describe('SlidesActions', () => {
  let subject: SlidesActions;
  let slidesStore: SlidesStore;
  let uploadStore: UploadStore;
  let metricActions: any;
  let unicornStore: UnicornStore;

  metricActions = {
    trackMetric: jest.fn(() => {
      return Promise.resolve();
    }),
    updateMetric: jest.fn(() => {
      return Promise.resolve();
    })
  };

  beforeEach(() => {
    uploadStore = new UploadStore();
    slidesStore = new SlidesStore();
    uploadStore.setHash('ewerwerw');

    slidesStore.setSlides([
      new SlideModel('test', 'test'),
      new SlideModel('test2', 'test2'),
      new SlideModel('test3', 'test3'),
      new SlideModel('test4', 'test4'),
      new SlideModel('test5', 'test5'),
      new SlideModel('test6', 'test6')
    ]);

    metricActions.trackMetric = jest.fn();
    unicornStore = new UnicornStore();
    unicornStore.setActiveMission(new MissionModel('', '', 'Stephen 14', '', '', '', ''));
    subject = new SlidesActions({} as any, {slidesStore, uploadStore, unicornStore} as any);
    subject.metricActions = metricActions;
  });

  it('should set initial validation on download action', async () => {
    expect(slidesStore.hasInitiallyValidated).toBeFalsy();

    await subject.trackRenameAndDownload();
    expect(slidesStore.initialValidation).toBeTruthy();
  });

  it('should update the op name and validateInput on change after initial validation', () => {
    slidesStore.validate = jest.fn();
    subject.setAndUpdateOpName({target: {value: 'operation'}});
    expect(slidesStore.validate).not.toHaveBeenCalled();

    slidesStore.initialValidation();
    subject.setAndUpdateOpName({target: {value: 'operation'}});
    expect(slidesStore.opName).toBe('operation');
    expect(slidesStore.validate).toHaveBeenCalled();
  });

  it('should update the date after extraction', () => {
    slidesStore.slides.map((slide) => {
      expect(slide.date.toISOString().slice(0, 16)).toBe(moment().toISOString().slice(0, 16));
    });
  });

  it('should add numbers at the end of duplicate slide names to facilitate saving unique filenames', () => {
    slidesStore.setSlides([
      new SlideModel(),
      new SlideModel(),
      new SlideModel(),
      new SlideModel(),
      new SlideModel()
    ]);
    slidesStore.slides.map((slide) => {
      slide.setDate(moment('2019-05-01'));
    });
    slidesStore.slides[0].setActivity('not duplicate');
    subject.updateNewNames();
    expect(slidesStore.slides[0].newName).toBe('01TTTTZMAY19_TGT_NAME_NOT_DUPLICATE_ASSET_RELEASABILITY');
    expect(slidesStore.slides[1].newName).toBe('01TTTTZMAY19_TGT_NAME_ACTY_ASSET_RELEASABILITY1');
    expect(slidesStore.slides[2].newName).toBe('01TTTTZMAY19_TGT_NAME_ACTY_ASSET_RELEASABILITY2');

    slidesStore.slides[3].setActivity('bouncing kangaroos');
    slidesStore.slides[4].setActivity('bouncing kangaroos');
    subject.updateNewNames();
    expect(slidesStore.slides[3].newName).toBe('01TTTTZMAY19_TGT_NAME_BOUNCING_KANGAROOS_ASSET_RELEASABILITY1');
    expect(slidesStore.slides[4].newName).toBe('01TTTTZMAY19_TGT_NAME_BOUNCING_KANGAROOS_ASSET_RELEASABILITY2');
  });

  it('update the slide model name when called', () => {
    slidesStore.slides.map((s: SlideModel) => {
      s.setDate(moment('2019-06-10'));
    });

    subject.setAndUpdateActivity(slidesStore.slides[0], {target: {value: 'Test activity'}});
    expect(slidesStore.slides[0].newName).toBe('10TTTTZJUN19_TGT_NAME_TEST_ACTIVITY_ASSET_RELEASABILITY');

    subject.setAndUpdateOpName({target: {value: 'op hello'}});
    expect(slidesStore.slides[2].newName).toBe('10TTTTZJUN19_OP_HELLO_ACTY_ASSET_RELEASABILITY2');

    subject.setAndUpdateAsset({target: {value: 'asset'}});
    expect(slidesStore.slides[3].newName).toBe('10TTTTZJUN19_OP_HELLO_ACTY_ASSET_RELEASABILITY3');

    subject.setAndUpdateReleasability('fvey');
    expect(slidesStore.slides[4].newName).toBe('10TTTTZJUN19_OP_HELLO_ACTY_ASSET_FVEY4');

    subject.setAndUpdateTime(slidesStore.slides[5], {target: {value: '1234'}});
    expect(slidesStore.slides[5].newName).toBe('101234ZJUN19_OP_HELLO_ACTY_ASSET_FVEY');
  });

  it('should log metrics on download if form is valid & slides were uploaded', async () => {
    let fieldValidationMock = jest.fn();
    fieldValidationMock.mockReturnValue(true);
    slidesStore.validate = fieldValidationMock;
    uploadStore.setUploaded(true);
    await subject.trackRenameAndDownload();
    expect(metricActions.trackMetric).toHaveBeenCalled();
  });

  it('should not log metrics on download if form is invalid', async () => {

    await subject.trackRenameAndDownload();
    expect(metricActions.trackMetric).not.toHaveBeenCalled();
  });

  it('should refuse download if form is invalid', async () => {
    let downloadSpy = jest.fn();
    subject.download = downloadSpy;
    await subject.trackRenameAndDownload();
    expect(downloadSpy).not.toHaveBeenCalled();
  });

  it('should download if form is valid', async () => {
    let fieldValidationMock = jest.fn();
    fieldValidationMock.mockReturnValue(true);
    slidesStore.validate = fieldValidationMock;
    uploadStore.setUploaded(true);
    let downloadSpy = jest.fn();
    subject.download = downloadSpy;

    await subject.trackRenameAndDownload();
    expect(downloadSpy).toHaveBeenCalled();
  });

  it('should trigger toast when trying to download without an upload', async () => {
    let triggerUploadToastSpy = jest.fn();
    subject.triggerMustUploadFirstToast = triggerUploadToastSpy;
    uploadStore.setUploaded(false);
    await subject.trackRenameAndDownload();
    expect(triggerUploadToastSpy).toHaveBeenCalled();
  });

  it('should trigger a Please Wait toast when download attempted while converting', async () => {
    let triggerConversionToastSpy = jest.fn();
    subject.triggerMustFinishConversionToast = triggerConversionToastSpy;

    uploadStore.setUploaded(false);
    uploadStore.setUploading(true);
    await subject.trackRenameAndDownload();
    expect(triggerConversionToastSpy).toHaveBeenCalled();
  });

  it('should update slides store with a pre-made date from Status', () => {
    subject.setDateFromStatus('10MAY19');
    slidesStore.slides.map((slide) => {
      expect(slide.date.toISOString().slice(0, 16)).toBe(moment('2019-05-10').toISOString().slice(0, 16));
    });
  });

  it('should compare Callsign & selected Mission', () => {
    slidesStore.setAsset('Stephen 13');
    subject.compareCallsigns();
    expect(slidesStore.differentAsset).toBeTruthy();

    slidesStore.setAsset('Stephen 14');
    subject.compareCallsigns();
    expect(slidesStore.differentAsset).toBeFalsy();
  });

  it('should update selected mission and compare callsigns', () => {
    subject.compareCallsigns = jest.fn();
    subject.updateMission(new MissionModel('', '', 'Stephen Change', '', '', '', ''));
    expect(subject.compareCallsigns).toHaveBeenCalled();
  });

  it('should determine mismatch callsign always but only validateInput empty callsign after initial validation', () => {
    slidesStore.validate = jest.fn();

    subject.setAndUpdateAsset({target: {value: 'asset'}});
    expect(slidesStore.validate).not.toHaveBeenCalled();
    expect(slidesStore.differentAsset).toBeTruthy();

    slidesStore.initialValidation();
    subject.setAndUpdateAsset({target: {value: 'Stephen 14'}});
    expect(slidesStore.validate).toHaveBeenCalled();
    expect(slidesStore.differentAsset).toBeFalsy();
  });

  it('should validateInput releasability always on change', () => {
    expect(slidesStore.isValidReleasability).toBeFalsy();
    subject.setAndUpdateReleasability('releaseMe');
    expect(slidesStore.isValidReleasability).toBeTruthy();
  });

  it('should set and update time', () => {
    subject.setAndUpdateTime(slidesStore.slides[0], {target: {value: '1234'}});
    expect(slidesStore.slides[0].time).toBe('1234');
  });

  it('should change the name using the slide when the slide date changes', () => {
    slidesStore.slides[0].setDate(moment('2019-01-01'));
    slidesStore.slides[1].setDate(moment('2019-02-02'));
    slidesStore.slides[1].setDate(moment('2019-03-03'));
    subject.updateNewNames();
    expect(slidesStore.slides[0].newName).toBe('01TTTTZJAN19_TGT_NAME_ACTY_ASSET_RELEASABILITY');
    expect(slidesStore.slides[1].newName).toBe('03TTTTZMAR19_TGT_NAME_ACTY_ASSET_RELEASABILITY');
  });

  it('should change a slide\'s callout', () => {
    unicornStore.setCallouts([
      new CalloutModel('name', 'class', 'release', 'activity', 'eid1234', '1234', null)
    ]);
    let slide = slidesStore.slides[0];
    subject.changeCalloutOnSlide(slide, new DropdownOption('eid1234', '1234Z'));
    expect(slide.calloutTime).toEqual('1234');
    expect(slide.targetEventId).toEqual('eid1234');
  });

  it('should delete a slide and display a toast', async () => {
    let toastSpy = jest.fn();
    Toast.create = toastSpy;

    let slide = slidesStore.slides[0];
    subject.deleteSlide(slide, true);
    expect(slide.deleted).toBeTruthy();
    expect(toastSpy).toHaveBeenCalled();
  });
});