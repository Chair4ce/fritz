import { Moment } from 'moment';
import { SlideModel } from '../app/component/slides/models/SlideModel';
import { SlidesStore } from '../app/component/slides/store/SlidesStore';

export function dateWithMinutePrecision(date: Moment) {
  return date.toISOString().slice(0, 16);
}

export function setupEmptySlides(slidesStore: SlidesStore) {
  slidesStore.setSlides([
    new SlideModel(),
    new SlideModel(),
    new SlideModel(),
  ]);
}