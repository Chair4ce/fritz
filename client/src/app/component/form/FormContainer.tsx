import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { SlidesActions } from '../slides/actions/SlidesActions';
import { SlidesStore } from '../slides/store/SlidesStore';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { UnicornActions } from '../unicorn/actions/UnicornActions';
import { UploadActions } from './upload/actions/UploadActions';
import { StyledValidatingInput } from '../input/ValidatingInput';
import { StyledValidatingDropdown } from '../dropdown/ValidatingDropdown';
import { badClassificationCSS, badReleasabilityCSS, goodCSS, styled } from '../../../themes/default';
import { DropdownOption } from '../dropdown/Dropdown';
import { StyledDeletePDF } from './DeletePDF';
import * as classNames from 'classnames';

interface Props {
  fileName: string;
  className?: string;
  slidesActions?: SlidesActions;
  slidesStore?: SlidesStore;
  unicornStore?: UnicornStore;
  unicornActions?: UnicornActions;
  uploadActions?: UploadActions;
}

@observer
export class FormContainer extends React.Component<Props> {
  render() {

    return (
      <div className={classNames('formContainer', this.props.className)}>
        {this.displayFormWithHeader()}
        {this.displayDeletePDF()}
      </div>
    );
  }

  renderReleasabilityInput() {
    let {slidesStore} = this.props;
    if (this.props.unicornStore!.offline) {
      return (
        <StyledValidatingInput
          label="Classification & Releasability"
          placeholder={'e.g. FOUO'}
          listener={this.props.slidesActions!.setAndUpdateCustomReleasability}
          id={'releasabilityInput'}
          validator={slidesStore!.isValidReleasability}
          value={slidesStore!.releasability}
          errorMessage={'The releasability field must be chosen'}
          badStyle={badReleasabilityCSS}
          className={'offlineRelInput'}
        />
      );
    }
    return (
      <StyledValidatingDropdown
        label="Classification & Releasability"
        validator={slidesStore!.isValidReleasability}
        options={this.props.unicornStore!.releasabilityOptions}
        defaultValue={'Select'}
        value={slidesStore!.releasability}
        id="releasabilityDropdown"
        callback={(option: DropdownOption) => {
          this.props.slidesActions!.setAndUpdateReleasability(option.display);
        }}
        errorMessage={'The releasability field must be chosen'}
      />
    );
  }

  private displayFormWithHeader() {
    return (
      <div className={'formWithHeader'}>
        {this.displayHeader()}
        {this.displayForm()}
      </div>
    );
  }

  private displayForm() {
    let {slidesStore} = this.props;
    return (
        <div className={'formInputs'}>
          <StyledValidatingInput
            label={'Operation Name'}
            placeholder={'e.g. Op Jumpshot'}
            listener={this.props.slidesActions!.setAndUpdateOpName}
            errorMessage={slidesStore!.errorMessages[0]}
            id={'opInput'}
            validator={slidesStore!.isValidOpName}
            value={slidesStore!.opName}
          />
          <StyledValidatingInput
            label={'Callsign'}
            placeholder={'Callsign'}
            listener={this.props.slidesActions!.setAndUpdateAsset}
            errorMessage={
              slidesStore!.differentAsset ? slidesStore!.errorMessages[2] : slidesStore!.errorMessages[1]
            }
            id={'assetInput'}
            validator={slidesStore!.isValidAsset}
            value={slidesStore!.asset}
          />
          <div className={'classification-and-releasability'}>
            <div>
              <span
                className={'classification'}
                style={this.props.slidesStore!.isValidReleasability ? goodCSS : badClassificationCSS}
              >
                SECRET//
              </span>
            </div>
            {this.renderReleasabilityInput()}
          </div>
        </div>
    );
  }

  private displayHeader() {
    return (
      <div className="header">
        <h2>JPEG Renamer - Details
        </h2>
        <span>Complete the fields below to view and download JPEGs</span>
      </div>
    );
  }

  private displayDeletePDF() {
    return (
      <StyledDeletePDF
        className={'deletePDF'}
        fileName={this.props.fileName}
      />
    );
  }
}

export const StyledFormContainer = inject(
  'slidesActions', 'slidesStore', 'unicornStore', 'unicornActions', 'uploadActions'
)
(styled(FormContainer)`
  color: #fff;
  padding-bottom: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: inherit;
  width: 100%;
  
  .formWithHeader {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
  }
  
  .controlUnit:nth-of-type(4) {
    padding-top: 0;
    bottom: 10px;
    position: relative;
  }
  
  .formInputs {
    width: inherit;
    > * {
    max-width: 580px;
      margin-bottom: 32px;
    }
  }

  span {
    font-size: 16px;
    color: #D8E5FF;
  }
  
  .leftText {
    position: relative;
    display: block;
    transform: translate(0%, -50%);
    line-height: 12px;
  }
  
  h2 {
    font-size: 24px;
  }
  
  .clickable {
      cursor: pointer;
  }
  
  .form-group {
    margin-bottom: 25px;
  }
  
  .offlineRerrorText {
    position: absolute;
    color: #e46373; 
    left: 300px;
  }
  
  .header {
    position: relative;
    margin-bottom: 32px;
  }
  
  .header > span {
    color: rgb(216, 229, 255);
    margin-bottom: 5px;
    font-size: 16px;
    white-space: nowrap;
  }
  
  .header > h2 {
    line-height: 0.7;
    font-size: 24px;
  }
  
  .helpMessage {
    color: rgb(216, 229, 255);
  }
  
  .deletePDF {
    margin-top: 44px;
  }
  
  #offlineReleaseLabel {
    position: relative;
  }
  
  #onlineReleaseLabel {
    bottom: 20px;
    position: relative;
  }
  
  #classificationInput {
    width: 280px;
  }
  
  #onlineReleasabilityForm {
    position: relative;
    left: 302px;
  }
  
  #releasabilityInput {
    width: 100%;
    position: relative;
    border-width: 1px 1px 1px 0;
    border-radius: 0 4px 4px 0;
    border-style: solid;
    border-color: #ced4da;
    height: 40px;
    display: block;
    padding-left: 0.75rem;
  }
  
  #classGroup {
    position: absolute;
  }
  
  .classification-and-releasability {
    display: flex;
    align-items: flex-end;
    
    .controlUnit {
      width: calc(100% - 104px);
    }
    
    .classification {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 104px;
      height: 40px;
      border-radius: 4px 0 0 4px;
      background-color: #1f1f2c;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      border-color: #cccccc;
      border-style: solid;
      border-width: 1px 0 1px 1px;
    }
    
    .bootstrap-dropdown {
      font-weight: normal;
      height: 40px;
      border-width: 1px 1px 1px 0;
      border-radius: 0 4px 4px 0;
      border-style: solid;
      border-color: #ced4da;
      .dropdown {
        background-color: rgba(0,0,0,0);
        font-weight: normal;
      }
      
      button {
        span {
          font-weight: normal;
        }
      }
      
      li.button {
        justify-content: left;
        font-weight: normal;
        
        span {
          font-weight: normal;
        }
      }
    }
    
    label, .errorMessage {
      transform: translate3d(-104px, 0, 0);
    }
 
  }
  
  .default {
    color: #FFF;
    opacity: 0.4;
    font-weight: normal;
  }
  
  .offlineRelInput {
    position: relative;
    width: 100%;
    .errorMessage {
      position: absolute;
      top: 72px;
    }
    
    .spacerWithoutErrorMessage {
      display: none;
    }
`);
