import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { SlideCard } from './SlideCard';
import { Provider } from 'mobx-react';
import { StyledCalloutContainer } from '../../unicorn/Callout/CalloutContainer';
import { CalloutModel } from '../../unicorn/model/CalloutModel';
import { SlideModel } from '../models/SlideModel';
import * as moment from 'moment';
import { StyledSlideTitleAndInputs } from './SlideTitleAndInputs';
import Mock = jest.Mock;
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../../themes/default';

describe('SlideCard', () => {
  let subject: ReactWrapper;
  let slideNumber: any;
  let slide: SlideModel;
  let slidesActions: any;
  let slidesStore: any;
  let uploadStore: any;
  let metricActions: any;
  let unicornStore: any;
  let unicornActions: any;
  let thumbnailClickSpy: Mock;

  let mountFirst = () => {
    subject = mount(
      <Provider
        unicornStore={unicornStore}
        slidesStore={slidesStore}
        uploadStore={uploadStore}
        unicornActions={unicornActions}
        slidesActions={slidesActions}
      >
        <ThemeProvider theme={theme}>
          <SlideCard
            uploadStore={uploadStore}
            slideNumber={slideNumber}
            slide={slide}
            slidesActions={slidesActions}
            slidesStore={slidesStore}
            metricActions={metricActions}
            unicornStore={unicornStore}
            thumbnailClick={thumbnailClickSpy}
            first={true}
          />
        </ThemeProvider>
      </Provider>
    );
  };

  beforeEach(() => {
    thumbnailClickSpy = jest.fn();

    slide = new SlideModel('', 'NewTestName', '1234', 'NewActivity');
    slide.setDate(moment('2019-06-14'));
    uploadStore = {
      hash: 'ljndslkm'
    };

    slideNumber = 2;

    slidesStore = {
      slides: [
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false)
      ],
      undeletedSlides: [
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false),
        new SlideModel('test', 'test', 'test', 'test', false)
      ]
    };

    slidesActions = {
      deleteSlide: jest.fn(),
      setAndUpdateActivity: jest.fn(),
      setAndUpdateTime: jest.fn(),
      isEditable: true
    };

    metricActions = {
      createMetric: jest.fn()
    };

    unicornStore = {
      callouts: [new CalloutModel('', '', '', '', '', '', null)],
      setUploadsInProgress: jest.fn(),
      uploadsInProgress: false
    };

    subject = mount(
      <Provider
        unicornStore={unicornStore}
        slidesStore={slidesStore}
        unicornActions={unicornActions}
        slidesActions={slidesActions}
      >
        <ThemeProvider theme={theme}>
          <SlideCard
            uploadStore={uploadStore}
            slideNumber={slideNumber}
            slide={slide}
            slidesActions={slidesActions}
            slidesStore={slidesStore}
            metricActions={metricActions}
            unicornStore={unicornStore}
            thumbnailClick={thumbnailClickSpy}
          />
        </ThemeProvider>
      </Provider>
    );
  });

  it('should render a thumbnail for each slide', () => {
    expect(subject.find('img')).toBeTruthy();
  });

  it('should render a title and inputs for each slide', () => {
    expect(subject.find(StyledSlideTitleAndInputs).exists()).toBeTruthy();

  });

  it('should flag slide as deleted when the delete icon is clicked and have an undo button', () => {
    expect(subject.find('.deleteIcon').simulate('click'));
    expect(slidesActions.deleteSlide).toHaveBeenCalled();
  });

  it('should contain a callout component', () => {
    expect(subject.find(StyledCalloutContainer).exists()).toBeTruthy();
  });

  it('should focus on the time box when it is the first slide card and empty or invalid', () => {
    slide.setTime('');
    mountFirst();
    let timeInput = subject.find('input').at(0).instance();
    expect(timeInput).toBe(document.activeElement);

    slide.setTime('aaa');
    mountFirst();
    timeInput = subject.find('input').at(0).instance();
    expect(timeInput).toBe(document.activeElement);

    slide.setTime('1234');
    mountFirst();
    timeInput = subject.find('input').at(0).instance();
    expect(timeInput).not.toBe(document.activeElement);
  });

  it('should focus on the time box when it is the first slide card and empty or invalid', () => {
    slide.setTime('');
    mountFirst();
    let timeInput = subject.find('input').at(0).instance();
    expect(timeInput).toBe(document.activeElement);

    slide.setTime('aaa');
    mountFirst();
    timeInput = subject.find('input').at(0).instance();
    expect(timeInput).toBe(document.activeElement);

    slide.setTime('1234');
    mountFirst();
    timeInput = subject.find('input').at(0).instance();
    expect(timeInput).not.toBe(document.activeElement);
  });

  it('should focus on the first activity box if the time box is full', () => {
    slide.setTime('1234');
    mountFirst();
    let activityInput = subject.find('input').at(1).instance();
    expect(activityInput).toBe(document.activeElement);
  });
});