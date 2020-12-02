import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { wrapper } from './index.stories';
import { StyledUploadFailure } from '../src/app/component/callout-upload-status/UploadFailure';
import { StyledUploadSuccess } from '../src/app/component/callout-upload-status/UploadSuccess';
import { StyledUploadInProgress } from '../src/app/component/callout-upload-status/UploadInProgress';
import { StyledNonInteractiveSlideTitle } from '../src/app/component/slides/slideCard/NonInteractiveSlideTitle';
import { StyledStaticMessageDropdown } from '../src/app/component/dropdown/StaticMessageDropdown';
import { StyledUploadWaiting } from '../src/app/component/callout-upload-status/UploadWaiting';

export function CalloutComponentsStory() {
  storiesOf('Callout Components', module)
    .addDecorator(story => wrapper(story()))

    .add('Upload Failure', () => {
      return (
        <StyledUploadFailure
          calloutTime={'1234'}
          retry={() => {
            console.log('retry');
          }}
        />
      );
    })

    .add('Upload Waiting', () => {
      return (
        <StyledUploadWaiting
          calloutTime={'1234'}
        />
      );
    })

    .add('Upload in Progress', () => {
      return (
        <StyledUploadInProgress/>
      );
    })

    .add('Upload Success', () => {
      return (
        <StyledUploadSuccess
          calloutTime={'1234'}
        />
      );
    })

    .add('Dropdown without callouts', () => {
      return (
        <StyledStaticMessageDropdown
          label={'Select'}
          message={'There are currently no callouts associated with this mission.'}
        />
      );
    })

    .add('Dropdown offline', () => {
      return (
        <StyledStaticMessageDropdown
          label={'Offline'}
          message={'Refresh UNICORN and select a mission to view a list of callouts.'}
        />
      );
    })

    .add('Non interactive slide title', () => {
      return (
        <StyledNonInteractiveSlideTitle
          slideName={'I_AM_A_LONG_SLIDE_NAME_WITH_INFORMATION'}
        />
      );
    })
  ;
}