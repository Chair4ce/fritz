import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UnicornOfflineModal } from './UnicornOfflineModal';

describe('UnicornOfflineModal', () => {
  let subject: ShallowWrapper;
  let unicornStore: any;

  beforeEach(() => {

    unicornStore = {
      setOfflineModal: jest.fn()
    };

    subject = shallow(
      <UnicornOfflineModal
        unicornStore={unicornStore}
      />
    );
  });

  it('should display a message', () => {
    expect(subject.find('.message').exists()).toBeTruthy();
  });

  it('should have a continue button that closes the modal', () => {
    expect(subject.find('.continueButton').simulate('click'));
    expect(unicornStore.setOfflineModal).toHaveBeenCalledWith(false);
  });
});