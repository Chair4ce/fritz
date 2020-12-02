import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SlideCardContainer } from './SlideCardContainer';
import { SlidesStore } from '../store/SlidesStore';
import { SlideModel } from '../models/SlideModel';
import { StyledSlideCard } from '../slideCard/SlideCard';
import { StyledUndoDeleteContainer } from '../../UndoDelete/UndoDeleteContainer';

describe('SlideCardContainer', () => {
  let subject: ShallowWrapper;
  let slidesStore = new SlidesStore();
  let slideModel1 = new SlideModel('oldName1', 'newName1');
  let slideModel2 = new SlideModel('oldName2', 'newName2');
  let slideModel3 = new SlideModel('oldName3', 'newName3');
  let carouselActions: any;

  slideModel1.setTime('');
  slidesStore.setSlides([slideModel1, slideModel2, slideModel3]);

  beforeEach(() => {
    carouselActions = {
      show: true
    };

    subject = shallow(
      <SlideCardContainer
        slidesStore={slidesStore}
        carouselActions={carouselActions}
      />
    );
  });

  it('should render a list of image files', async () => {
    await expect(subject.find(StyledSlideCard).length).toBe(3);
  });

  it('should render the undo container when a slide is deleted', () => {
    expect(subject.find(StyledUndoDeleteContainer).length).toBe(0);
    slideModel2.setDeleted(true);
    expect(subject.find(StyledUndoDeleteContainer).length).toBe(1);
  });

  it('should tag the first slide card', () => {
    expect(subject.find(StyledSlideCard).at(0).prop('first')).toBeTruthy();
  });
});