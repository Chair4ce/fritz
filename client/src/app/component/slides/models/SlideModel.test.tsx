import { SlideModel } from './SlideModel';
import * as moment from 'moment';

describe('SlideModel', () => {
  let subject: SlideModel;

  beforeEach(() => {
    subject = new SlideModel();
  });

  it('should validateInput time on set', () => {
    subject.setTime('Z');
    expect(subject.isValidTime).toBeFalsy();
    subject.setTime('AAA');
    expect(subject.isValidTime).toBeFalsy();
    subject.setTime('1262');
    expect(subject.isValidTime).toBeFalsy();
    subject.setTime('2400');
    expect(subject.isValidTime).toBeFalsy();
    subject.setTime('1234');
    expect(subject.isValidTime).toBeTruthy();
  });

  it('should construct a slide model with today\'s date when not given a date ', () => {
    let today = moment();
    expect(subject.yearTwoDigit).toEqual(today.year().toString().slice(2));
    expect(subject.monthThreeLetter).toEqual(moment.monthsShort('-MMM-', today.month()));
    expect(subject.dayWithLeadingZero).toEqual(`${(today.date() < 10 ? `0${today.date()}` : today.date())}`);
  });
});