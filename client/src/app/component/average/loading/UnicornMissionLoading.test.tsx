import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UnicornMissionLoading } from './UnicornMissionLoading';

describe('UnicornMissionLoading', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<UnicornMissionLoading/>);
  });

  it('should render a loading spinner', () => {
    expect(subject.find('.spinner').exists()).toBeTruthy();
  });
});