import * as React from 'react';
import * as moment from 'moment';
import { CalloutModel } from '../src/app/component/unicorn/model/CalloutModel';
import { calloutStore, unicornStore, wrapper } from './index.stories';
import { StyledCalloutContainer } from '../src/app/component/unicorn/Callout/CalloutContainer';
import { CalloutStatus } from '../src/app/component/unicorn/Callout/CalloutStore';
import { storiesOf } from '@storybook/react';
import { SlideModel } from '../src/app/component/slides/models/SlideModel';

export function CalloutContainerStory() {
  storiesOf('Callout Container', module)
    .addDecorator(story => wrapper(story()))

    .add('Callout online with callouts', () => {
      calloutStore.setStatus(CalloutStatus.ONLINE_WITH_CALLOUTS);
      unicornStore.setCallouts([
        new CalloutModel('name1', '', '', '', '', '0001', moment()),
        new CalloutModel('name1', '', '', '', '', '0002', moment()),
        new CalloutModel('name1', '', '', '', '', '0003', moment()),
      ]);
      return (
        <StyledCalloutContainer
          slide={new SlideModel()}
          calloutStore={calloutStore}
        />
      );
    })

    .add('Callout online without callouts', () => {
      calloutStore.setStatus(CalloutStatus.ONLINE_WITHOUT_CALLOUTS);
      return (
        <StyledCalloutContainer
          slide={new SlideModel()}
          calloutStore={calloutStore}
        />
      );
    })

    .add('Callout offline', () => {
      calloutStore.setStatus(CalloutStatus.OFFLINE);
      return (
        <StyledCalloutContainer
          slide={new SlideModel()}
          calloutStore={calloutStore}
        />
      );
    })

    .add('Callout waiting to upload', () => {
      calloutStore.setStatus(CalloutStatus.UPLOAD_PENDING);
      return (
        <StyledCalloutContainer
          slide={new SlideModel()}
          calloutStore={calloutStore}
        />
      );
    })

    .add('Callout upload in progress', () => {
      calloutStore.setStatus(CalloutStatus.UPLOAD_IN_PROGRESS);
      return (
        <StyledCalloutContainer
          slide={new SlideModel()}
          calloutStore={calloutStore}
        />
      );
    })

    .add('Callout upload failed', () => {
      calloutStore.setStatus(CalloutStatus.UPLOAD_FAILED);
      return (
        <StyledCalloutContainer
          slide={new SlideModel()}
          calloutStore={calloutStore}
        />
      );
    })

    .add('Callout upload succeeded', () => {
      calloutStore.setStatus(CalloutStatus.UPLOAD_SUCCEEDED);
      return (
        <StyledCalloutContainer
          slide={new SlideModel()}
          calloutStore={calloutStore}
        />
      );
    })
  ;
}