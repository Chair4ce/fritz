import { shallow, ShallowWrapper } from 'enzyme';
import { CalloutContainer } from './CalloutContainer';
import { StyledStaticMessageDropdown } from '../../dropdown/StaticMessageDropdown';
import { SlideModel } from '../../slides/models/SlideModel';
import { StyledDropdown } from '../../dropdown/Dropdown';
import { CalloutStatus, CalloutStore } from './CalloutStore';
import { StyledUploadInProgress } from '../../callout-upload-status/UploadInProgress';
import { StyledUploadSuccess } from '../../callout-upload-status/UploadSuccess';
import { StyledUploadFailure } from '../../callout-upload-status/UploadFailure';
import { StyledUploadWaiting } from '../../callout-upload-status/UploadWaiting';
import { UnicornStore } from '../store/UnicornStore';
import { CalloutModel } from '../model/CalloutModel';
import * as moment from 'moment';
import * as React from 'react';

describe('CalloutContainer', () => {
  let subject: ShallowWrapper;
  let calloutStore: CalloutStore;
  let unicornStore: UnicornStore;
  let slide: SlideModel;

  beforeEach(() => {
    unicornStore = new UnicornStore();

    slide = new SlideModel();

    calloutStore = new CalloutStore(
      unicornStore,
      slide
    );

    subject = shallow(
      <CalloutContainer
        slide={slide}
        calloutStore={calloutStore}
        unicornStore={unicornStore}
      />
    );
  });

  it('should contain a dropdown of callouts', () => {
    unicornStore.setCallouts([new CalloutModel('', '', '', '', '', '', moment())]);
    calloutStore.setStatus(CalloutStatus.ONLINE_WITH_CALLOUTS);
    expect(subject.find(StyledDropdown).exists()).toBeTruthy();
  });

  it('should load a pseudo dropdown if there are no callouts', () => {
    calloutStore.setStatus(CalloutStatus.ONLINE_WITHOUT_CALLOUTS);
    expect(subject.find(StyledStaticMessageDropdown).exists()).toBeTruthy();
  });

  it('should load a false offline dropdown if UNICORN is offline', () => {
    calloutStore.setStatus(CalloutStatus.OFFLINE);
    expect(subject.find(StyledStaticMessageDropdown).exists()).toBeTruthy();
  });

  it('should render different statuses as the uploading boolean changes', () => {
    calloutStore.setStatus(CalloutStatus.UPLOAD_IN_PROGRESS);
    expect(subject.find(StyledUploadInProgress).exists()).toBeTruthy();
    calloutStore.setStatus(CalloutStatus.UPLOAD_SUCCEEDED);
    expect(subject.find(StyledUploadSuccess).exists()).toBeTruthy();
    calloutStore.setStatus(CalloutStatus.UPLOAD_FAILED);
    expect(subject.find(StyledUploadFailure).exists()).toBeTruthy();
    calloutStore.setStatus(CalloutStatus.UPLOAD_PENDING);
    expect(subject.find(StyledUploadWaiting).exists()).toBeTruthy();
  });
});