import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { ActionButton } from './ActionButton';
import Mock = jest.Mock;

describe('ActionButton', () => {
  let subject: ShallowWrapper;
  let clickSpy: Mock;

  beforeEach(() => {
    clickSpy = jest.fn();

    subject = shallow(
      <ActionButton
        clickAction={clickSpy}
        disabled={false}
        text={'Action Button'}
        className={'actionButton'}
      />
    );
  });

  it('should call its given function on click', () => {
    subject.find('.action-button').simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should display given text', () => {
    expect(subject.text()).toBe('Action Button');
  });

  it('should have given class name', () => {
    expect(subject.hasClass('actionButton')).toBeTruthy();
  });
});