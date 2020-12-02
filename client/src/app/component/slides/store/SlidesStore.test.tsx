import { SlidesStore } from './SlidesStore';
import { SlideModel } from '../models/SlideModel';
import { dateWithMinutePrecision, setupEmptySlides } from '../../../../utils/TestHelper';
import * as moment from 'moment';

describe('SlidesStore', () => {
  let subject: SlidesStore;

  beforeEach(() => {
    subject = new SlidesStore();
    subject.initialValidation();
  });

  it('should not validate on the first time', () => {
    subject = new SlidesStore();
    expect(subject.validate()).toBeFalsy();
  });

  it('should report that all fields are valid', () => {
    expect(subject.validate()).toBeFalsy();
    subject.setOpName('VALID OP NAME');
    subject.setAsset('VALID ASSET');
    subject.setReleasability('VALID RELEASABILITY');
    expect(subject.validate()).toBeTruthy();
  });

  it('should invalidate an empty op name', () => {
    subject.setOpName('op name');
    subject.validate();
    expect(subject.isValidOpName).toBeTruthy();

    subject.setOpName('');
    subject.validate();
    expect(subject.isValidOpName).toBeFalsy();
  });

  it('should invalidate an empty asset', () => {
    subject.setAsset('asset ');
    subject.validate();
    expect(subject.isValidAsset).toBeTruthy();

    subject.setAsset('');
    subject.validate();
    expect(subject.isValidAsset).toBeFalsy();
  });

  it('should invalidate a mismatched asset', () => {
    subject.setDifferentAsset(true);
    expect(subject.isValidAsset).toBeFalsy();
  });

  it('should invalidate empty releasability', () => {
    subject.setReleasability('FOUO');
    subject.validate();
    expect(subject.isValidReleasability).toBeTruthy();

    subject.setReleasability('');
    subject.validate();
    expect(subject.isValidReleasability).toBeFalsy();
  });

  it('should change all slides dates to provided date', () => {
    setupEmptySlides(subject);
    subject.setAllSlidesDates('01JAN19');
    subject.slides.map((slide) => {
      expect(dateWithMinutePrecision(slide.date))
        .toBe(dateWithMinutePrecision(moment('2019-01-01')));
    });
  });

  it('should determine if military date or input date format', () => {
    expect(subject.isMilitaryDateFormat('01JAN19')).toBeTruthy();
    expect(subject.isMilitaryDateFormat('2019-05-21')).toBeFalsy();
  });

  it('should transform a military date into common input string', () => {
    expect(subject.parseMilitaryDate('27JAN19')).toBe('2019-01-27');
  });

  it('should return undeleted slides', () => {
    let undeletedSlide = new SlideModel('', '', '', '', false, '', '');
    subject.setSlides([
      new SlideModel('', '', '', '', true, '', ''),
      new SlideModel('', '', '', '', true, '', ''),
      undeletedSlide,
    ]);
    expect(subject.undeletedSlides).toEqual([undeletedSlide]);
  });
});
