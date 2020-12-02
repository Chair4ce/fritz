import { CalloutModel } from './CalloutModel';
import * as moment from 'moment';

describe('CalloutModel', () => {
  it('should ensure integrity of time as 4-digit number string on construction', () => {
    let calloutHappy = new CalloutModel('Callout1', 'c', 'r', 'a', 'eid', '1234', moment());
    expect(calloutHappy.time).toEqual('1234');
    let calloutZulu = new CalloutModel('Callout1', 'c', 'r', 'a', 'eid', '1234Z', moment());
    expect(calloutZulu.time).toEqual('1234');
    let calloutAlpha = new CalloutModel('Callout1', 'c', 'r', 'a', 'eid', '19Apr12', moment());
    expect(calloutAlpha.time).toEqual(null);
    let calloutBeyond2400 = new CalloutModel('Callout1', 'c', 'r', 'a', 'eid', '2401', moment());
    expect(calloutBeyond2400.time).toEqual(null);
    let calloutBadMinutes = new CalloutModel('Callout1', 'c', 'r', 'a', 'eid', '0077', moment());
    expect(calloutBadMinutes.time).toEqual(null);
  });

  it('should ensure integrity of time as 4-digit number string when setting time', () => {
    let calloutHappy = new CalloutModel('Callout1', 'c', 'r', 'a', 'eid', null, moment());
    calloutHappy.setTime('1234');
    expect(calloutHappy.time).toEqual('1234');
    let calloutZulu = new CalloutModel('Callout1', 'c', 'r', 'a', 'eid', null, moment());
    calloutZulu.setTime('1234Z');
    expect(calloutZulu.time).toEqual('1234');
    let calloutAlpha = new CalloutModel('Callout1', 'c', 'r', 'a', 'eid', null, moment());
    expect(calloutAlpha.time).toEqual(null);
    calloutAlpha.setTime('19Apr12');
    let calloutBeyond2400 = new CalloutModel('Callout1', 'c', 'r', 'a', 'eid', null, moment());
    expect(calloutBeyond2400.time).toEqual(null);
    calloutBeyond2400.setTime('2401');
    let calloutBadMinutes = new CalloutModel('Callout1', 'c', 'r', 'a', 'eid', null, moment());
    calloutBeyond2400.setTime('0077');
    expect(calloutBadMinutes.time).toEqual(null);
  });

  it('should convert a unix timestamp into a date in UTC', () => {
    let calloutFromUnix = new CalloutModel('', '', '', '', '', '', 1559347200);
    expect(calloutFromUnix.date!.toISOString()).toEqual('2019-06-01T00:00:00.000Z');
  });
});