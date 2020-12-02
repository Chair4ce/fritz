import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { StyledToast } from '../../utils/Toast';
import { StyledDeleteModal } from '../component/modals/DeleteModal';
import { UnicornStore } from '../component/unicorn/store/UnicornStore';
import { SlidesStore } from '../component/slides/store/SlidesStore';
import { StyledHelpMenu } from '../component/modals/HelpMenu';
import { SlidesActions } from '../component/slides/actions/SlidesActions';
import { UnicornActions } from '../component/unicorn/actions/UnicornActions';
import * as classNames from 'classnames';
import { StyledUploadContainer } from '../component/form/upload/container/UploadContainer';
import { HomePageDisplay, HomePageStore } from './HomePageStore';
import { StyledCarousel } from '../component/carousel/Carousel';
import { StyledSelectMissionModal } from '../component/modals/SelectMissionModal';
import { StyledFormAndSlideCards } from '../component/body/FormAndSlideCards';
import { StyledFooter } from '../component/footer/Footer';
import { StyledUnicornOfflineModal } from '../component/modals/UnicornOfflineModal';
import { StyledLoadingScreen } from '../component/slides/container/LoadingScreen';
import { StyledUnicornUploadModal } from '../component/modals/UnicornUploadModal';
import { styled } from '../../themes/default';

interface Props {
  homePageStore: HomePageStore;
  unicornStore?: UnicornStore;
  slidesStore?: SlidesStore;
  slidesActions?: SlidesActions;
  unicornActions?: UnicornActions;
  className?: string;
}

@observer
export class HomePage extends React.Component<Props> {
  render() {
    return (
      <div className={classNames('homePage', this.props.className)}>
        <StyledToast/>
        <StyledDeleteModal/>
        {this.conditionallyRenderHomePage()}
      </div>
    );
  }

  private conditionallyRenderHomePage() {
    switch (this.props.homePageStore.displayState) {
      case HomePageDisplay.HELP:
        return (this.helpMenuInFrontOfUploader());
      case HomePageDisplay.UNICORN_OFFLINE_MODAL:
        return (<StyledUnicornOfflineModal/>);
      case HomePageDisplay.SELECT_MISSION:
        return (this.selectMissionWithUploadContainer());
      case HomePageDisplay.READY_TO_UPLOAD_TO_FRITZ:
        return (this.uploadContainerOnly());
      case HomePageDisplay.FRITZ_UPLOADING_OR_PROCESSING:
        return (<StyledLoadingScreen className={'loadingScreen'}/>);
      case HomePageDisplay.READY_FOR_SLIDE_VIEWING_AND_EDITING:
        return (this.displayViewAndEditSlidePage());
      case HomePageDisplay.CAROUSEL:
        return (this.carouselWithFormAndSlideCards());
      case HomePageDisplay.CONFIRM_UPLOAD_TO_UNICORN:
        return (this.unicornUploadConfirmationModal());
      default:
        return;
    }
  }

  private unicornUploadConfirmationModal() {
    return (
      <>
        {this.displayViewAndEditSlidePage()}
        <StyledUnicornUploadModal/>
      </>
    );
  }

  private helpMenuInFrontOfUploader() {
    return (
      <>
        <StyledHelpMenu
          exit={() => {
            this.props.homePageStore.toggleHelpMenu();
          }}
        />
        {this.uploadContainerOnly()}
      </>
    );
  }

  private uploadContainerOnly() {
    return (
      <StyledUploadContainer
        className={'uploadContainer'}
        help={() => {
          this.props.homePageStore.toggleHelpMenu();
        }}
      />
    );
  }

  private selectMissionWithUploadContainer() {
    return (
      <>
        <StyledUploadContainer
          className={'uploadContainer'}
          help={() => {
            this.props.homePageStore.toggleHelpMenu();
          }}
        />
        <StyledSelectMissionModal/>
      </>
    );
  }

  private carouselWithFormAndSlideCards() {
    return (
      <>
        <StyledCarousel
          slides={this.props.slidesStore!.undeletedSlides}
        />
        <StyledFormAndSlideCards/>
      </>
    );
  }

  private displayViewAndEditSlidePage() {
    return (
      <div className={'mainBody'}>
        <StyledFormAndSlideCards/>
        <StyledFooter
          className={'footer'}
          downloader={this.props.slidesActions!.trackRenameAndDownload}
          uploader={this.props.unicornActions!.uploadToUnicorn}
          hideButtons={this.props.unicornStore!.isUploading}
        />
      </div>
    );
  }
}

export const StyledHomePage = inject(
  'slidesStore',
  'unicornStore',
  'slidesActions',
  'unicornActions',
)(styled(HomePage)`
  display: flex;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  
  .mainBody {
    height: inherit;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  
  .uploadContainer {
    margin: 44px 8px 8px 8px;
  }
  
  .loadingScreen {
    margin: 48px;
  }
`);