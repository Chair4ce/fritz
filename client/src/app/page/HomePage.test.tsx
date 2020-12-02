import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { HomePage } from './HomePage';
import { StyledFormAndSlideCards } from '../component/body/FormAndSlideCards';
import { StyledSelectMissionModal } from '../component/modals/SelectMissionModal';
import { StyledHelpMenu } from '../component/modals/HelpMenu';
import { StyledUnicornOfflineModal } from '../component/modals/UnicornOfflineModal';
import { SlidesStore } from '../component/slides/store/SlidesStore';
import { StyledLoadingScreen } from '../component/slides/container/LoadingScreen';
import { StyledCarousel } from '../component/carousel/Carousel';
import { UploadStore } from '../component/form/upload/UploadStore';
import { UnicornStore } from '../component/unicorn/store/UnicornStore';
import { StyledUploadContainer } from '../component/form/upload/container/UploadContainer';
import { HomePageDisplay, HomePageStore } from './HomePageStore';
import { CarouselStore } from '../component/carousel/CarouselStore';
import { StyledFooter } from '../component/footer/Footer';
import { StyledUnicornUploadModal } from '../component/modals/UnicornUploadModal';

describe('HomePage', () => {
  let subject: ShallowWrapper;
  let unicornStore: UnicornStore;
  let slidesStore: SlidesStore;
  let slideActions: any;
  let unicornActions: any;
  let homePageStore: HomePageStore;

  beforeEach(() => {
    unicornStore = new UnicornStore();

    unicornActions = {
      uploadToUnicorn: jest.fn()
    };

    slidesStore = new SlidesStore();

    slideActions = {
      trackRenameAndDownload: jest.fn(),
    };

    homePageStore = new HomePageStore(new CarouselStore(), new UnicornStore(), new UploadStore());

    subject = shallow(
      <HomePage
        homePageStore={homePageStore}
        unicornStore={unicornStore}
        slidesStore={slidesStore}
        slidesActions={slideActions}
        unicornActions={unicornActions}
      />
    );
  });

  it('should show a modal to select the mission as starting screen', () => {
    expect(subject.find(StyledSelectMissionModal).exists()).toBeTruthy();
  });

  it('should show an offline modal when unicorn is offline', () => {
    homePageStore.setDisplayState(HomePageDisplay.UNICORN_OFFLINE_MODAL);
    expect(subject.find(StyledUnicornOfflineModal).exists()).toBeTruthy();
  });

  it('should show a help menu modal when help is true', () => {
    expect(subject.find(StyledHelpMenu).exists()).toBeFalsy();
    homePageStore.setDisplayState(HomePageDisplay.HELP);
    expect(subject.find(StyledHelpMenu).exists()).toBeTruthy();
  });

  it('should display only the upload to Fritz screen after a mission selection', () => {
    homePageStore.setDisplayState(HomePageDisplay.READY_TO_UPLOAD_TO_FRITZ);
    expect(subject.find(StyledUploadContainer).exists()).toBeTruthy();
    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
    expect(subject.find(StyledSelectMissionModal).exists()).toBeFalsy();
  });

  it('should render only the loading screen when uploading to Fritz or processing Fritz upload ', () => {
    homePageStore.setDisplayState(HomePageDisplay.FRITZ_UPLOADING_OR_PROCESSING);
    expect(subject.find(StyledLoadingScreen).exists()).toBeTruthy();
    expect(subject.find(StyledUploadContainer).exists()).toBeFalsy();
  });

  it('should have a body without loading screen when ready to view', () => {
    homePageStore.setDisplayState(HomePageDisplay.READY_FOR_SLIDE_VIEWING_AND_EDITING);
    expect(subject.find(StyledLoadingScreen).exists()).toBeFalsy();
    expect(subject.find(StyledFormAndSlideCards).exists()).toBeTruthy();
    expect(subject.find(StyledFooter).exists()).toBeTruthy();
  });

  it('should display carousel with the form & slides behind it when triggered', () => {
    homePageStore.setDisplayState(HomePageDisplay.CAROUSEL);
    expect(subject.find(StyledCarousel).exists()).toBeTruthy();
    expect(subject.find(StyledFormAndSlideCards).exists()).toBeTruthy();
  });

  it('should render unicorn uploading modals in front of the form and slide cards', () => {
    homePageStore.setDisplayState(HomePageDisplay.CONFIRM_UPLOAD_TO_UNICORN);
    expect(subject.find(StyledUnicornUploadModal).exists()).toBeTruthy();
    expect(subject.find(StyledFormAndSlideCards).exists()).toBeTruthy();
  });
});