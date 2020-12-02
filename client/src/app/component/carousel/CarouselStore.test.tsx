import { CarouselStore } from './CarouselStore';

describe('CarouselStore', () => {
  let subject: CarouselStore;

  beforeEach(() => {
    subject = new CarouselStore();
  });

  it('should loop from end-to-start on increment', () => {
    subject.setItemCount(2);
    subject.increaseActiveIndex();
    subject.increaseActiveIndex();
    expect(subject.activeItemIndex).toBe(0);
  });

  it('should loop from start-to-end on decrement', () => {
    subject.setItemCount(2);
    subject.decreaseActiveIndex();
    expect(subject.activeItemIndex).toBe(1);
  });

  it('should correctly return the previous active index', () => {
    subject.setItemCount(2);
    expect(subject.previousActiveIndex).toBe(1);
  });

  it('should correctly return the next active index', () => {
    subject.setItemCount(2);
    expect(subject.nextActiveIndex).toBe(1);
    subject.setActiveItemIndex(1);
    expect(subject.nextActiveIndex).toBe(0);
  });
});