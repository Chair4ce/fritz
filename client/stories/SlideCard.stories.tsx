import * as React from 'react';
import { unicornStore, wrapper } from './index.stories';
import { CalloutModel } from '../src/app/component/unicorn/model/CalloutModel';
import { StyledSlideCard } from '../src/app/component/slides/slideCard/SlideCard';
import { SlideModel, SlideUploadStatus } from '../src/app/component/slides/models/SlideModel';
import { storiesOf } from '@storybook/react';
import * as moment from 'moment';

export function SlideCardStory() {
  storiesOf('SlideCard', module)
    .addDecorator(story => wrapper(story()))

    .add('before upload', () => {
      return (
          <StyledSlideCard
            slideNumber={1}
            slide={new SlideModel()}
            thumbnailClick={() => {
            }}
          />
      );
    })

    .add('successful upload', () => {
      let slide = new SlideModel();
      slide.setUploadStatus(SlideUploadStatus.SUCCEEDED);
      slide.setNewName('10APR19ACTIV_KHSDOOO_ASIISOA_SOSOA');
      unicornStore.setCallouts([
        new CalloutModel('', '', '', '', '', '', moment())
      ]);
      return (
          <StyledSlideCard
            slideNumber={1}
            slide={slide}
            thumbnailClick={() => {
            }}
          />
      );
    })

    .add('pending upload', () => {
      let slide = new SlideModel();
      slide.setUploadStatus(SlideUploadStatus.PENDING);
      slide.setNewName('10APR19ACTIV_KHSDOOO_ASIISOA_SOSOA');
      slide.setCalloutTime('1234');
      unicornStore.setCallouts([
        new CalloutModel('', '', '', '', '', '', moment())
      ]);
      return (
          <StyledSlideCard
            slideNumber={1}
            slide={slide}
            thumbnailClick={() => {
            }}
          />
      );
    })

    .add('in progress upload', () => {
      let slide = new SlideModel();
      slide.setUploadStatus(SlideUploadStatus.IN_PROGRESS);
      slide.setNewName('10APR19ACTIV_KHSDOOO_ASIISOA_SOSOA');
      slide.setCalloutTime('1234');
      unicornStore.setCallouts([
        new CalloutModel('', '', '', '', '', '', moment())
      ]);
      return (
          <StyledSlideCard
            slideNumber={1}
            slide={slide}
            thumbnailClick={() => {
            }}
          />
      );
    })

    .add('failed upload', () => {
      let slide = new SlideModel();
      slide.setUploadStatus(SlideUploadStatus.FAILED);
      slide.setNewName('10APR19ACTIV_KHSDOOO_ASIISOA_SOSOA');
      slide.setCalloutTime('1234');
      unicornStore.setCallouts([
        new CalloutModel('', '', '', '', '', '', moment())
      ]);
      return (
          <StyledSlideCard
            slideNumber={1}
            slide={slide}
            thumbnailClick={() => {
            }}
          />
      );
    })
  ;
}