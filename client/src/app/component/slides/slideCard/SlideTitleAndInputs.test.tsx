import { StyledSlideTitle } from '../SlideTitle';
import { StyledValidatingInput } from '../../input/ValidatingInput';
import { shallow, ShallowWrapper } from 'enzyme';
import { SlideTitleAndInputs } from './SlideTitleAndInputs';
import { SlideModel } from '../models/SlideModel';
import Mock = jest.Mock;
import * as React from 'react';

describe('SlideTitleAndInputs', () => {
  let subject: ShallowWrapper;
  let timeSpy: Mock, activitySpy: Mock;
  let timeRef: any, activityRef: any;

  beforeEach(() => {
    timeSpy = jest.fn();
    activitySpy = jest.fn();

    subject = shallow(
      <SlideTitleAndInputs
        slide={new SlideModel()}
        opName={'op'}
        asset={'asset'}
        releasability={'release'}
        timeListener={timeSpy}
        activityListener={activitySpy}
        timeRef={timeRef}
        activityRef={activityRef}
      />
    );
  });

  it('should render a title for each slide', () => {
    expect(subject.find(StyledSlideTitle).exists()).toBeTruthy();
  });

  it('should render an input for the time and activity', () => {
    expect(subject.find(StyledValidatingInput).length).toBe(2);
  });
});