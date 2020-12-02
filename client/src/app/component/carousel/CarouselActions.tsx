import { Stores } from '../../../utils/Stores';
import { CarouselStore } from './CarouselStore';
import { action } from 'mobx';

export class CarouselActions {
  private _carouselStore: CarouselStore;

  constructor(stores: Partial<Stores>) {
    this._carouselStore = stores.carouselStore!;
  }

  @action.bound
  hide() {
    this._carouselStore.setVisibility(false);
  }

  @action.bound
  show(itemIndex: number) {
    this._carouselStore.setActiveItemIndex(itemIndex);
    this._carouselStore.setVisibility(true);
  }

  @action.bound
  next() {
    this._carouselStore.setAnimating('left');
  }

  @action.bound
  previous() {
    this._carouselStore.setAnimating('right');
  }

  @action.bound
  initialize(itemCount: number) {
    this._carouselStore.setItemCount(itemCount);
  }
}