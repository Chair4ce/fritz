import { storiesOf } from '@storybook/react';
import { HomePageDisplay, HomePageStore } from '../src/app/page/HomePageStore';
import { StyledHomePage } from '../src/app/page/HomePage';
import * as React from 'react';
import { carouselStore, resetStoresAndActions, slidesStore, unicornStore, uploadStore, wrapper } from './index.stories';
import { SlideModel } from '../src/app/component/slides/models/SlideModel';
import * as moment from 'moment';
import { Provider } from 'mobx-react';

export function HomePageStory() {
  storiesOf('Home Page', module)
    .addDecorator(story => wrapper(story()))

    .add('Select mission', () => {
      let homePageStore = new HomePageStore(carouselStore, unicornStore, uploadStore);
      homePageStore.setDisplayState(HomePageDisplay.SELECT_MISSION);
      return (
        <StyledHomePage
          homePageStore={homePageStore}
        />
      )
    })

    .add('Upload to Fritz', () => {
      let homePageStore = new HomePageStore(carouselStore, unicornStore, uploadStore);
      homePageStore.setDisplayState(HomePageDisplay.READY_TO_UPLOAD_TO_FRITZ);
      return (
        <StyledHomePage
          homePageStore={homePageStore}
        />
      )
    })

    .add('Help', () => {
      let homePageStore = new HomePageStore(carouselStore, unicornStore, uploadStore);
      homePageStore.setDisplayState(HomePageDisplay.HELP);
      return (
        <StyledHomePage
          homePageStore={homePageStore}
        />
      )
    })

    .add('Uploading or processing', () => {
      let homePageStore = new HomePageStore(carouselStore, unicornStore, uploadStore);
      homePageStore.setDisplayState(HomePageDisplay.FRITZ_UPLOADING_OR_PROCESSING);
      return (
        <StyledHomePage
          homePageStore={homePageStore}
        />
      )
    })

    .add('View and edit slides', () => {
      resetStoresAndActions();
      let homePageStore = new HomePageStore(carouselStore, unicornStore, uploadStore);
      homePageStore.setDisplayState(HomePageDisplay.READY_FOR_SLIDE_VIEWING_AND_EDITING);
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
          <StyledHomePage
            homePageStore={homePageStore}
          />
        </Provider>
      )
    })
  ;
}