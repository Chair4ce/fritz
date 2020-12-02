import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Carousel } from './Carousel';
import { StyledCarouselItem } from './CarouselItem';
import { SlideModel } from '../slides/models/SlideModel';
import { CarouselStore } from './CarouselStore';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { SlidesStore } from '../slides/store/SlidesStore';

describe('Carousel', () => {
  let subject: ShallowWrapper;
  let carouselActions: any;
  let slidesActions: any;
  let slidesStore: SlidesStore;
  let unicornStore: UnicornStore;
  let carouselStore: CarouselStore;
  let slides: SlideModel[];
  let slide2: SlideModel;

  beforeEach(() => {
    slide2 = new SlideModel();
    slides = [
      new SlideModel('', '', '', '', false, '', ''),
      slide2,
      new SlideModel('', '', '', '', false, '', ''),
    ];
    slide2.setCalloutTime('test');
    slides[0].setCalloutTime('test');
    slides[2].setCalloutTime('test');

    carouselStore = new CarouselStore();
    carouselStore.setItemCount(3);
    unicornStore = new UnicornStore();
    slidesStore = new SlidesStore();
    slidesStore.setSlides(slides);

    carouselActions = {
      hide: jest.fn(),
      next: jest.fn(),
      previous: jest.fn(),
      initialize: jest.fn()
    };

    slidesActions = {
      setAndUpdateTime: jest.fn(),
      setAndUpdateActivity: jest.fn()
    };

    subject = shallow(
      <Carousel
        slides={slides}
        carouselActions={carouselActions}
        carouselStore={carouselStore}
        slidesActions={slidesActions}
        unicornStore={unicornStore}
        slidesStore={slidesStore}
      />
    );
  });

  it('should set the item count on render', () => {
    expect(carouselActions.initialize).toHaveBeenCalledWith(3);
  });

  it('should have an exit icon', () => {
    expect(subject.find('img').at(2).exists()).toBeTruthy();
    expect(subject.find('img').at(2).prop('src')).toBe('ExpandedCloseIcon.svg');
  });

  it('should have two arrow icons', () => {
    expect(subject.find('img').at(0).exists()).toBeTruthy();
    expect(subject.find('img').at(0).prop('src')).toBe('ArrowIcon.svg');

    expect(subject.find('img').at(1).exists()).toBeTruthy();
    expect(subject.find('img').at(1).prop('src')).toBe('ArrowIcon.svg');
  });

  it('should toggle visibility on exit', () => {
    subject.find('img').at(2).simulate('click');
    expect(carouselActions.hide).toHaveBeenCalled();
  });

  it('should display a carousel item for the current index', () => {
    expect(subject.find(StyledCarouselItem).at(1).exists()).toBeTruthy();
    expect(subject.find(StyledCarouselItem).at(1).prop('slide')).toBe(slides[0]);
  });

  it('should move to the next carousel item', () => {
    subject.find('.next').simulate('click');
    expect(carouselActions.next).toHaveBeenCalled();
  });

  it('should move to the previous carousel item', () => {
    subject.find('.previous').simulate('click');
    expect(carouselActions.previous).toHaveBeenCalled();
  });

  it('should display the correct count for the slides', () => {
    expect(subject.find(StyledCarouselItem).at(0).prop('count')).toEqual('3 of 3');
    expect(subject.find(StyledCarouselItem).at(1).prop('count')).toEqual('1 of 3');
    expect(subject.find(StyledCarouselItem).at(2).prop('count')).toEqual('2 of 3');
  });
});