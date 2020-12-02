import * as React from 'react';
import * as moment from 'moment';
import { SlideModel, SlideUploadStatus } from "../src/app/component/slides/models/SlideModel";
import { storiesOf } from "@storybook/react";
import { StyledFormAndSlideCards } from "../src/app/component/body/FormAndSlideCards";
import { StyledSlideCardContainer } from "../src/app/component/slides/container/SlideCardContainer";
import { StyledUploadContainer } from "../src/app/component/form/upload/container/UploadContainer";
import { StyledLoadingScreen } from "../src/app/component/slides/container/LoadingScreen";
import { StyledProgressBar } from "../src/app/component/progressBar/ProgressBar";
import { StyledFormContainer } from "../src/app/component/form/FormContainer";
import { StyledDeletePDF } from "../src/app/component/form/DeletePDF";
import { resetStoresAndActions, slidesStore, unicornStore, uploadStore, wrapper } from './index.stories';
import { Provider } from 'mobx-react';
import { CalloutModel } from '../src/app/component/unicorn/model/CalloutModel';

export function HomePageComponentsStory() {
  storiesOf('Home Page Components', module)
    .addDecorator(story => wrapper(story()))

    .add('big boi', () => {
      slidesStore.setSlides(
        [
          new SlideModel('', '', '', '', false, '', '', moment()),
          new SlideModel('', '', '', '', false, '', '', moment()),
          new SlideModel('', '', '', '', false, '', '', moment()),
          new SlideModel('', '', '', '', false, '', '', moment()),
          new SlideModel('', '', '', '', false, '', '', moment()),
          new SlideModel('', '', '', '', false, '', '', moment()),
          new SlideModel('', '', '', '', false, '', '', moment()),
          new SlideModel('', '', '', '', false, '', '', moment()),
        ]
      );
      return (
        <Provider
          slidesStore={slidesStore}
        >
          <StyledFormAndSlideCards/>
        </Provider>
      );
    })

    .add('Slide Cards', () => {
      resetStoresAndActions();

      unicornStore.setCallouts([
        new CalloutModel('', '', '', '', '', '1234', moment())
      ]);

      let slideNotStarted = new SlideModel('', '', '', 'long activity to change the wrapping of the title', false, '', '', moment());
      slideNotStarted.setUploadStatus(SlideUploadStatus.NOT_STARTED);

      let slideDeleted = new SlideModel('', '', '', 'long activity to change the wrapping of the title', true, '', '', moment());
      slideDeleted.setUploadStatus(SlideUploadStatus.NOT_STARTED);

      let slidePending = new SlideModel('', '', '', '', false, '', '', moment());
      slidePending.setUploadStatus(SlideUploadStatus.PENDING);
      slidePending.setNewName('IM_PRETENDING_IM_A_SLIDE_NAME');
      slidePending.setCalloutTime('1234');

      let slideInProgress = new SlideModel('', '', '', '', false, '', '', moment());
      slideInProgress.setUploadStatus(SlideUploadStatus.IN_PROGRESS);
      slideInProgress.setNewName('IM_PRETENDING_IM_A_SLIDE_NAME_THATS_OBNOXIOUSLY_LONG_SO_STINKIN_LONG_THAT_IT_GOES_OFF_THE_PAGE');

      let slideFailed = new SlideModel('', '', '', '', false, '', '', moment());
      slideFailed.setUploadStatus(SlideUploadStatus.FAILED);
      slideFailed.setCalloutTime('1234');

      let slideSucceeded = new SlideModel('', '', '', '', false, '', '', moment());
      slideSucceeded.setUploadStatus(SlideUploadStatus.SUCCEEDED);
      slideSucceeded.setNewName('IM_PRETENDING_IM_A_SLIDE_NAME');

      slidesStore.setSlides(
        [
          slideNotStarted,
          slideDeleted,
          slidePending,
          slideInProgress,
          slideFailed,
          slideSucceeded,
        ]
      );

      return (
        <Provider
          slidesStore={slidesStore}
        >
          <StyledSlideCardContainer/>
        </Provider>
      );
    })

    .add('Upload Container', () => {
      return (
        <StyledUploadContainer
          help={() => {
            console.log('help');
          }}
        />
      );
    })

    .add('Loading Screen', () => {
      resetStoresAndActions();
      uploadStore.setProgress(60);
      uploadStore.setTotal(100);

      return (
        <Provider
          uploadStore={uploadStore}
        >
          <StyledLoadingScreen/>
        </Provider>
      );
    })

    .add('Progress Bar', () => {
      resetStoresAndActions();
      uploadStore.setProgress(60);
      uploadStore.setTotal(100);

      return (
        <Provider
          uploadStore={uploadStore}
        >
          <StyledProgressBar/>
        </Provider>
      );
    })

    .add('Form Container', () => {
      return (
        <StyledFormContainer
          fileName={'fileName'}
        />
      );
    })

    .add('Delete PDF', () => {
      return (
        <StyledDeletePDF
          fileName={'my pdf file'}
        />
      );
    })
  ;
}