import { CarouselActions } from './CarouselActions';
import { CarouselStore } from './CarouselStore';

describe('CarouselActions', () => {
  let subject: CarouselActions;
  let carouselStore: CarouselStore;

  beforeEach(() => {
    carouselStore = new CarouselStore();
    subject = new CarouselActions({carouselStore} as any);
  });

  it('should toggle carousel visibility off', () => {
    subject.hide();
    expect(carouselStore.isVisible).toBeFalsy();
    subject.show(0);
    expect(carouselStore.isVisible).toBeTruthy();
  });

  it('should show with the correct slide index', () => {
    subject.show(1);
    expect(carouselStore.isVisible).toBeTruthy();
    expect(carouselStore.activeItemIndex).toBe(1);
  });

  it('should set animating to left when next slide is called', () => {
    subject.next();
    expect(carouselStore.animating).toBe('left');
  });

  it('should set animating to right when previous slide is called', () => {
    subject.previous();
    expect(carouselStore.animating).toBe('right');
  });

  it('should initialize the carousel store', () => {
    subject.initialize(4);
    expect(carouselStore.itemCount).toBe(4);
  });
});