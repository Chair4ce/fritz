import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { DatePicker } from './DatePicker';
import { SlideModel } from '../slides/models/SlideModel';
import * as moment from 'moment';

describe('DatePicker', () => {
  let subject: ShallowWrapper;
  let slide: SlideModel;

  beforeEach(() => {

    slide = new SlideModel();
    slide.setDate(moment('2019-06-30'));

    subject = shallow(
      <DatePicker
        slide={slide}
      />
    );
  });

  it('should contain two arrow icons and display the selected date', () => {
    expect(subject.find('.upArrow').exists()).toBeTruthy();
    expect(subject.find('.downArrow').exists()).toBeTruthy();
    expect(subject.find('.selectedDate').exists()).toBeTruthy();
  });

  it('should display the autofilled date', () => {
    expect(subject.find('.selectedDate').text()).toBe('30 Jun');
    slide.setDate(moment('2019-07-07'));
    expect(subject.find('.selectedDate').text()).toBe('7 Jul');
    slide = new SlideModel();
  });

  it('should increment the date when the up arrow is clicked and set dated edited to true', () => {
    subject.find('.upArrow').simulate('click');
    subject.instance().forceUpdate();
    expect(subject.find('.selectedDate').text()).toBe('1 Jul');
  });

  it('should decrement the date when the down arrow is clicked and set dated edited to true', () => {
    subject.find('.downArrow').simulate('click');
    subject.instance().forceUpdate();
    expect(subject.find('.selectedDate').text()).toBe('29 Jun');
  });
});