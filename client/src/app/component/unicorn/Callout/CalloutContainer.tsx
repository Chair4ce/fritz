import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { UnicornStore } from '../store/UnicornStore';
import { SlideModel } from '../../slides/models/SlideModel';
import { SlidesStore } from '../../slides/store/SlidesStore';
import { StyledStaticMessageDropdown } from '../../dropdown/StaticMessageDropdown';
import { UnicornActions } from '../actions/UnicornActions';
import { StyledDropdown } from '../../dropdown/Dropdown';
import { SlidesActions } from '../../slides/actions/SlidesActions';
import * as classNames from 'classnames';
import { StyledUploadFailure } from '../../callout-upload-status/UploadFailure';
import { StyledUploadWaiting } from '../../callout-upload-status/UploadWaiting';
import { CalloutStatus, CalloutStore } from './CalloutStore';
import { StyledUploadSuccess } from '../../callout-upload-status/UploadSuccess';
import { StyledUploadInProgress } from '../../callout-upload-status/UploadInProgress';
import { styled } from '../../../../themes/default';

const Unicorn = require('../../../../icon/Unicorn.svg');

interface Props {
  slide: SlideModel;
  calloutStore: CalloutStore;
  slidesStore?: SlidesStore;
  unicornStore?: UnicornStore;
  slidesActions?: SlidesActions;
  unicornActions?: UnicornActions;
  className?: string;
}

@observer
export class CalloutContainer extends React.Component<Props> {
  render() {
    return (
      <div className={classNames('calloutContainer', this.props.className)}>
        {this.displayIconAndLabel()}
        {this.displayCalloutBasedOnStatus()}
      </div>
    );
  }

  private displayCalloutBasedOnStatus() {
    switch (this.props.calloutStore.status) {
      case CalloutStatus.ONLINE_WITH_CALLOUTS:
        return this.displayDropdownWithCallouts();
      case CalloutStatus.ONLINE_WITHOUT_CALLOUTS:
        return this.displayDropdownWithoutCallouts();
      case CalloutStatus.OFFLINE:
        return this.displayDropdownForOfflineMode();
      case CalloutStatus.UPLOAD_PENDING:
        return this.displayUploadWaiting();
      case CalloutStatus.UPLOAD_IN_PROGRESS:
        return this.displayUploadInProgress();
      case CalloutStatus.UPLOAD_FAILED:
        return this.displayUploadFailure();
      case CalloutStatus.UPLOAD_SUCCEEDED:
        return this.displayCompletedUpload();
      default:
        return;
    }
  }

  private displayDropdownWithoutCallouts() {
    return (
      <StyledStaticMessageDropdown
        className={'staticMessageDropdown'}
        label={'Select'}
        message={'There are currently no callouts associated with this mission.'}
      />
    );
  }

  private displayDropdownForOfflineMode() {
    return (
      <StyledStaticMessageDropdown
        className={'staticMessageDropdown'}
        label={'Offline'}
        message={'Refresh UNICORN and select a mission to view a list of callouts.'}
      />
    );
  }

  private displayUploadInProgress() {
    return (
      <StyledUploadInProgress
        className={'uploadInProgress'}
      />
    );
  }

  private displayIconAndLabel() {
    return (
      <div className={'title'}>
        <img src={Unicorn} alt={''}/>
        <span>UNICORN Callout</span>
      </div>
    );
  }

  private displayDropdownWithCallouts() {
    return (
      <StyledDropdown
        className={'calloutDropdown'}
        value={this.props.slide.calloutTimeForDisplay}
        defaultValue={'Select'}
        options={this.props.unicornStore!.calloutOptions}
        callback={(option: any) => {
          this.props.slidesActions!.changeCalloutOnSlide(this.props.slide, option);
        }}
      />
    );
  }

  private displayUploadFailure() {
    return (
      <StyledUploadFailure
        className={'uploadFailure'}
        calloutTime={this.props.slide.calloutTime}
        retry={
          async () => {
            this.props.unicornStore!.addToUploadQueue(this.props.slide);
            await this.props.unicornActions!.startUploading();
          }
        }
      />
    );
  }

  private displayCompletedUpload() {
    return (
      <StyledUploadSuccess
        className={'uploadSuccess'}
        calloutTime={this.props.slide.calloutTime}
      />
    );
  }

  private displayUploadWaiting() {
    return (
      <StyledUploadWaiting
        className={'uploadWaiting'}
        calloutTime={this.props.slide.calloutTime}
      />
    );
  }
}

export const StyledCalloutContainer = inject(
  'unicornStore',
  'slidesStore',
  'unicornActions',
  'slidesActions',
)(styled(CalloutContainer)`
  width: 188px;
  height: 168px;
  background-image: linear-gradient(to right, ${(props) => props.theme.color.blackTea}, #364054);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
    
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${(props) => props.theme.labelFontFamily};
    font-size: 14px;
    letter-spacing: 0.5px;
    color: ${(props) => props.theme.color.blueGrey};
    
    span {
      margin-top: 3px;
      margin-left: 8px;
    }
  }
  
  .staticMessageDropdown, 
  .calloutDropdown {
    margin-top: 32px;
    display: flex;
    flex: 1;
    align-items: start !important;
  } 
  
  .uploadWaiting, 
  .uploadFailure {
    margin-top: 32px;
  }
  
  .uploadInProgress,
  .uploadSuccess {
    margin-top: 24px;
  }
  
  .bootstrap-dropdown {
    display: flex;
    align-items: center;
    flex-grow: 1;
    
    .li-label {
      color: #15DEEC;
      opacity: 1 !important;
      margin-left: 6px;
    }
    
    .dropdown-item {
      padding: 0;
      justify-content: center;
    }
  
    ul {
     width: 117px;
    }
    
    .dropdown {
      width: 117px;
  
        ::-webkit-scrollbar {
          width: 10px;
        }
      
        /* Track */
        ::-webkit-scrollbar-track {
          display: none; 
        }
      
        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #5C667D; 
        }
      
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #5C667D; 
        }
      }
      
      .ddd {
        :hover {
          font-weight: bold;
        }
      }
    }
  }

  button::after {
    color: #FFF;
  }
`);