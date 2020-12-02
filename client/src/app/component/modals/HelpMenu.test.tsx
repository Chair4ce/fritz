import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HelpMenu } from './HelpMenu';
import Mock = jest.Mock;

describe('HelpMenu', () => {
  let subject: ShallowWrapper;
  let slidesStore: any;
  let exitSpy: Mock;

  beforeEach(() => {
    exitSpy = jest.fn();

    slidesStore = {
      setHelp: jest.fn()
    };

    subject = shallow(
      <HelpMenu
        exit={exitSpy}
        slidesStore={slidesStore}
      />
    );
  });

  it('should display the modal title', () => {
    expect(subject.find('.helpTitle').text()).toContain('Your product must be uploaded in PDF format');
  });

  it('should display image instructions for pdf upload', () => {
    expect(subject.find('.helpStep1').exists()).toBeTruthy();
    expect(subject.find('.helpStep2').exists()).toBeTruthy();
  });

  it('should display the text for both steps', () => {
    expect(subject.find('.step1').text()).toContain('STEP 1');
    expect(subject.find('.step2').text()).toContain('STEP 2');
  });

  it('should close the modal when the x is clicked', () => {
    subject.find('.closeHelp').simulate('click');
    expect(exitSpy).toHaveBeenCalled();
  });
});