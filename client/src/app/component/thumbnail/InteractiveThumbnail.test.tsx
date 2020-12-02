import { shallow, ShallowWrapper } from 'enzyme';
import { InteractiveThumbnail } from './InteractiveThumbnail';
import * as React from 'react';
import Mock = jest.Mock;

describe('InteractiveThumbnail', () => {
  let subject: ShallowWrapper;
  let clickSpy: Mock;

  beforeEach(() => {
    clickSpy = jest.fn();

    subject = shallow(
      <InteractiveThumbnail
        imagePath={'path'}
        onClick={clickSpy}
        currentSlideNumber={1}
        totalSlideNumber={7}
      />
    );
  });

  it('should trigger a given event on image click', () => {
    subject.find('.thumbnailClickOverlay').simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should render an image with the given source path', () => {
    expect(subject.find('.thumbnailImage').prop('src')).toBe('path');
  });

  it('should display the current slide out of total', () => {
    expect(subject.find('.slideCount').text()).toBe('1 of 7');
  });
});