import { UnicornStore } from './UnicornStore';
import { CalloutModel } from '../model/CalloutModel';
import { DropdownOption } from '../../dropdown/Dropdown';
import { ReleasabilityModel } from '../model/ReleasabilityModel';

describe('UnicornStore', () => {
  let subject = new UnicornStore();

  it('should return only useable callouts (i.e., not blank)', () => {
    subject.setCallouts([
      new CalloutModel('n1', 'c1', 'r1', 'a1', 'eventId1', '1234', null),
      new CalloutModel('n1', 'c1', 'r1', 'a1', 'eventId1', '2345', null),
      new CalloutModel('n1', 'c1', 'r1', 'a1', 'eventId1', '', null),
      new CalloutModel('n1', 'c1', 'r1', 'a1', 'eventId1', '', null)
    ]);
    expect(subject.calloutOptions).toEqual(
      [
        new DropdownOption('eventId1', '1234Z'),
        new DropdownOption('eventId1', '2345Z'),
      ]
    );
  });

  it('should return releasability dropdown options sorted correctly', () => {
    subject.setReleasabilities([
      new ReleasabilityModel('id1', 'name1', 1),
      new ReleasabilityModel('id2', 'name2', 2),
      new ReleasabilityModel('id3', 'name3', 3),
      new ReleasabilityModel('id5', 'NOFORN', 0),
      new ReleasabilityModel('id4', 'FOUO', 0)
    ]);
    subject.setPendingReleasability('FOUO TEST');
    expect(subject.releasabilityOptions).toEqual(
      [
        new DropdownOption('id3', 'name3'),
        new DropdownOption('id2', 'name2'),
        new DropdownOption('id1', 'name1'),
        new DropdownOption('id4', 'FOUO'),
        new DropdownOption('id5', 'NOFORN')
      ]
    );
  });
});