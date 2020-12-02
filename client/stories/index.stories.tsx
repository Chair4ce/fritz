import { Renderable } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { ComponentStory } from './ComponentStory.stories';
import { HomePageComponentsStory } from './HomePageComponents.stories';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/themes/default';
import { Provider } from 'mobx-react';
import { CarouselStore } from '../src/app/component/carousel/CarouselStore';
import { SlidesStore } from '../src/app/component/slides/store/SlidesStore';
import { UploadStore } from '../src/app/component/form/upload/UploadStore';
import { UnicornStore } from '../src/app/component/unicorn/store/UnicornStore';
import { CarouselActions } from '../src/app/component/carousel/CarouselActions';
import { MetricActions } from '../src/app/component/metrics/actions/MetricActions';
import { SlidesActions } from '../src/app/component/slides/actions/SlidesActions';
import { UnicornActions } from '../src/app/component/unicorn/actions/UnicornActions';
import { UploadActions } from '../src/app/component/form/upload/actions/UploadActions';
import { CalloutComponentsStory } from './CalloutComponents.stories';
import { CalloutContainerStory } from './CalloutContainerStory.stories';
import { SlideModel } from '../src/app/component/slides/models/SlideModel';
import { CalloutStore } from '../src/app/component/unicorn/Callout/CalloutStore';
import * as moment from 'moment';
import { SlideCardStory } from './SlideCard.stories';
import { HomePageStory } from './HomePage.stories';
import { HomePageStore } from '../src/app/page/HomePageStore';
import { ClassificationStore } from '../src/app/component/classification/store/ClassificationStore';
import { ClassificationActions } from '../src/app/component/classification/ClassificationActions';

export let slide: SlideModel;
export let calloutStore: CalloutStore;
export let carouselStore: CarouselStore;
export let homePageStore: HomePageStore;
export let slidesStore: SlidesStore;
export let uploadStore: UploadStore;
export let unicornStore: UnicornStore;
let classificationStore: ClassificationStore;
let carouselActions: CarouselActions;
let classificationActions : ClassificationActions;
let slidesActions: SlidesActions;
let metricActions: MetricActions;
let unicornActions: UnicornActions;
let uploadActions: UploadActions;

export function resetStoresAndActions() {
  slide = new SlideModel('', '', '', '', false, '', '', moment());
  carouselStore = new CarouselStore();
  classificationStore = new ClassificationStore();
  slidesStore = new SlidesStore();
  uploadStore = new UploadStore();
  unicornStore = new UnicornStore();
  carouselActions = new CarouselActions({});
  classificationActions = new ClassificationActions({}, {});
  metricActions = new MetricActions({}, {});
  slidesActions = new SlidesActions({}, {});
  unicornActions = new UnicornActions({}, {unicornStore});
  uploadActions = new UploadActions({}, {});

  calloutStore = new CalloutStore(unicornStore, slide);
  homePageStore = new HomePageStore(carouselStore, unicornStore, uploadStore);
  classificationStore.setClassification('UNCLASSIFIED');
}

export const wrapper = (story: Renderable | Renderable[]) => {
  resetStoresAndActions();

  return (
    <Provider
      carouselStore={carouselStore}
      classificationStore={classificationStore}
      slidesStore={slidesStore}
      uploadStore={uploadStore}
      unicornStore={unicornStore}
      carouselActions={carouselActions}
      classificationActions={classificationActions}
      slidesActions={slidesActions}
      metricActions={metricActions}
      unicornActions={unicornActions}
      uploadActions={uploadActions}
    >
      <ThemeProvider theme={theme}>
        <div style={
          {
            background: 'linear-gradient(360deg,#1E222A 0%,#39414E 100%)',
            boxSizing: 'border-box',
            height: '925px',
            width: '1650px'
          }
        }>
          {story}
        </div>
      </ThemeProvider>
    </Provider>
  );
};

ComponentStory();
HomePageComponentsStory();
CalloutComponentsStory();
CalloutContainerStory();
SlideCardStory();
HomePageStory();