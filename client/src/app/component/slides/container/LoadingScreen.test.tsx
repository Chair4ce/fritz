import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { LoadingScreen } from './LoadingScreen';
import { StyledProgressBar } from '../../progressBar/ProgressBar';

describe('LoadingScreen', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<LoadingScreen/>);
  });

  it('should contain a fritz loading logo', () => {
    expect(subject.find('img').exists()).toBeTruthy();
  });

  it('should contain a progress bar', () => {
    expect(subject.find(StyledProgressBar).exists()).toBeTruthy();
  });

});