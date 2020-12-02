import { shallow, ShallowWrapper } from 'enzyme';
import { UploadFailure } from './UploadFailure';
import Mock = jest.Mock;
import * as React from 'react';

describe('UploadFailure', () => {
  let subject: ShallowWrapper;
  let clickSpy: Mock;

  beforeEach(() => {
    clickSpy = jest.fn();
    subject = shallow(
      <UploadFailure
        calloutTime={'1234'}
        retry={clickSpy}
      />
    );
  });

  it('should trigger a retry on click', () => {
    subject.find('.retry').simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });
});