import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Footer } from './Footer';
import { StyledActionButton } from '../button/ActionButton';
import { StyledUnicornUploadProgress } from '../unicorn/components/UnicornUploadProgress';

describe('Footer', () => {
  let subject: ShallowWrapper;
  let downloader: any;
  let uploader: any;
  let unicornStore: any;

  beforeEach(() => {
    downloader = jest.fn();
    uploader = jest.fn();

    unicornStore = {
      offline: false
    };

    subject = shallow(
      <Footer
        downloader={downloader}
        uploader={uploader}
        hideButtons={false}
        unicornStore={unicornStore}
      />
    );
  });

  it('should have a download button', () => {
    expect(subject.find(StyledActionButton).at(0).exists()).toBeTruthy();
    expect(subject.find(StyledActionButton).at(0)
      .prop('clickAction')).toBe(downloader);
  });

  it('should have a unicorn upload button', () => {
    expect(subject.find(StyledActionButton).at(1).exists()).toBeTruthy();
    expect(subject.find(StyledActionButton).at(1)
      .prop('clickAction')).toBe(uploader);
  });

  it('should not have a unicorn upload button when offline', () => {
    unicornStore.offline = true;
    subject.instance().forceUpdate();
    expect(subject.find(StyledActionButton).at(1).exists()).toBeFalsy();
  });

  it('should hide buttons', () => {
    expect(subject.find(StyledUnicornUploadProgress).exists()).toBeFalsy();
    subject = shallow(
      <Footer
        downloader={downloader}
        uploader={uploader}
        hideButtons={true}
      />
    );
    expect(subject.find(StyledActionButton).length).toBe(0);
    expect(subject.find(StyledUnicornUploadProgress).exists()).toBeTruthy();
  });
});