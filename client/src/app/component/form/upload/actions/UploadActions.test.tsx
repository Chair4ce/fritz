import { UploadActions } from './UploadActions';
import { UploadRepository } from '../repository/UploadRepository';
import { UploadStore } from '../UploadStore';
import { StubUploadRepository } from '../repository/StubUploadRepository';
import { UploadModel } from '../UploadModel';
import { StatusModel } from '../../status/StatusModel';
import { SlidesStore } from '../../../slides/store/SlidesStore';
import { MetricRepository } from '../../../metrics/repository/MetricRepository';
import { StubMetricRepository } from '../../../metrics/repository/StubMetricRepository';
import { ReleasabilityModel } from '../../../unicorn/model/ReleasabilityModel';
import { SlideModel } from '../../../slides/models/SlideModel';
import { dateWithMinutePrecision, setupEmptySlides } from '../../../../../utils/TestHelper';
import * as moment from 'moment';

describe('UploadActions', () => {
  let subject: UploadActions;
  let uploadRepository: UploadRepository;
  let metricRepository: MetricRepository;
  let uploadStore: UploadStore;
  let slidesStore: SlidesStore;
  let unicornStore: any;
  let metricActions: any;

  function setupNewUploadActions() {
    uploadStore = new UploadStore();
    slidesStore = new SlidesStore();
    subject = new UploadActions(
      {uploadRepository, metricRepository} as any, {uploadStore, slidesStore, unicornStore} as any
    );
    subject.uploadProcessingComplete = jest.fn();
    subject.setOpInput = jest.fn();
    subject.setCallsignInput = jest.fn();
    subject.setReleasabilityInput = jest.fn();
    subject.metricActions = metricActions;
  }

  beforeEach(() => {

    uploadRepository = new StubUploadRepository();
    metricRepository = new StubMetricRepository();

    metricActions = {
      trackMetric: jest.fn(async () => {
        await Promise.resolve();
      }),
      updateMetric: jest.fn(async () => {
        await Promise.resolve();
      }),
      trackConversion: jest.fn()
    };

    unicornStore = {
      callouts: [],
      releasabilities: [
        new ReleasabilityModel('1', 'FOUO', 0)
      ],
      pendingReleasability: 'rel',
      setReleasability: jest.fn(),
      setPendingReleasability: jest.fn()
    };

    uploadRepository.upload = jest.fn(() => {
      return Promise.resolve(new UploadModel('chucknorris.pdf'));
    });

    uploadRepository.status = jest.fn(() => {
      return Promise.resolve(new StatusModel(
        'complete',
        ['slide1.jpg', 'slide2.jpg', 'slide3.jpg'],
        ['1525', '', ''],
        0,
        3,
        '05MAR19',
        'OP MATT',
        'MATT 81',
        'FOUO'
      ));
    });

    setupNewUploadActions();
  });

  it('should set uploaded, processing and conversionStatus to true, and placeholder to false when upload is called',
     async () => {
      await subject.upload({});
      expect(uploadStore.uploaded).toBeTruthy();
      expect(uploadStore.processing).toBeTruthy();
      expect(uploadStore.ConversionStatus).toBeTruthy();
      expect(uploadStore.placeholder).toBeFalsy();
    });

  it('should pass the file to the backend', async () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.pdf', {type: 'application/pdf'});
    await subject.upload({file: file});
    expect(uploadRepository.upload).toHaveBeenCalledWith({file: file});
    expect(uploadStore.uploaded).toBeTruthy();
    expect(uploadStore.fileName).toBe('chucknorris.pdf');
  });

  it('should populate the files and times in the model when checking status', async () => {
    await subject.checkStatus();
    expect(slidesStore.files).toEqual(['slide1.jpg', 'slide2.jpg', 'slide3.jpg']);
    expect(slidesStore.slides[0].oldName).toBe('slide1.jpg');
    expect(slidesStore.slides[1].oldName).toBe('slide2.jpg');
    expect(slidesStore.slides[2].oldName).toBe('slide3.jpg');
    expect(slidesStore.slides[0].time).toBe('1525');
  });

  it('should set date on all slides if status has a date', async () => {
    setupEmptySlides(slidesStore);
    await subject.checkStatus();
    slidesStore.slides.map((slide: SlideModel) => {
      expect(slide.date).toEqual(moment('2019-03-05'));
    });
  });

  it('should set todays date on all slides if status has no date', async () => {
    setupEmptySlides(slidesStore);
    uploadRepository.status = jest.fn(() => {
        return Promise.resolve(new StatusModel(
          'complete',
          ['slide1.jpg', 'slide2.jpg', 'slide3.jpg'],
          ['1525', '', ''],
          0,
          3,
          '',
          'OP MATT',
          'MATT 81',
          'FOUO'
        ));
      });
    await subject.checkStatus();
    slidesStore.slides.map((slide: SlideModel) => {
      expect(dateWithMinutePrecision(slide.date)).toEqual((dateWithMinutePrecision(moment())));
    });
  });

  it('should update the op when a status model with an operation is returned', async () => {
    await subject.checkStatus();
    expect(subject.setOpInput).toHaveBeenCalledWith('OP MATT');
  });

  it('should update the callsign when a status model with a callsign is returned', async () => {
    await subject.checkStatus();
    expect(subject.setCallsignInput).toHaveBeenCalledWith('MATT 81');
  });

  it('should update the releasability when a status model with a releasbility is returned', async () => {
    await subject.checkStatus();
    expect(subject.setReleasabilityInput).toHaveBeenCalledWith('FOUO');
  });

  it('should validateInput all of the inputs after a pdf is uploaded', async () => {
    let validateSpy = jest.fn();
    slidesStore.validate = validateSpy;
    await subject.checkStatus();
    expect(validateSpy).toHaveBeenCalled();
  });
});
