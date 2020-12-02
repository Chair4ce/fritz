import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { SlideModel } from '../slides/models/SlideModel';
import { StyledValidatingInput } from '../input/ValidatingInput';
import { SlidesStore } from '../slides/store/SlidesStore';
import { CarouselActions } from './CarouselActions';
import { StyledDatePicker } from '../date/DatePicker';
import { SlidesActions } from '../slides/actions/SlidesActions';
import { CarouselStore } from './CarouselStore';
import { StyledSlideTitle } from '../slides/SlideTitle';
import { styled } from '../../../themes/default';

const DeleteIcon = require('../../../icon/DeleteIcon.svg');

interface Props {
  slide: SlideModel;
  slidesStore?: SlidesStore;
  slidesActions?: SlidesActions;
  carouselActions?: CarouselActions;
  carouselStore?: CarouselStore;
  changeTime: (slide: SlideModel, e: any) => any;
  changeActivity: (slide: SlideModel, e: any) => any;
  className?: string;
  callout?: any;
  count?: any;
  tabIndex?: number;
  active?: boolean;
}

@observer
export class CarouselItem extends React.Component<Props> {
  carouselTimeBox: any;
  carouselActivityBox: any;

  constructor(props: Props) {
    super(props);
    this.carouselTimeBox = React.createRef();
    this.carouselActivityBox = React.createRef();
  }

  componentDidMount(): void {
    this.setFocus();
  }

  setFocus() {
    if (this.props.active) {
      if (!this.props.slide.isValidTime) {
        this.carouselTimeBox.current.focus();
      } else {
        this.carouselActivityBox.current.focus();
      }
    }
  }

  imagePath(): string {
    return (
      `api/image/${this.props.slide.hash}/${this.props.slide.oldName}`
    );
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="imgContainer">
          <img
            className={'expandedImage'}
            src={this.imagePath()}
          />
          <div className={'calloutDropdown'}>
            {this.props.callout}
          </div>
        </div>
        <div className={'slideInfo'}>
          <div className={'slideCount'}>
            {this.props.count}
          </div>
          <div className={'slideTitleAndTrash'}>
            <StyledSlideTitle
              slide={this.props.slide}
              opName={this.props.slidesStore!.opName}
              asset={this.props.slidesStore!.asset}
              releasability={this.props.slidesStore!.releasability}
            />
            <div>
              <img
                className={'delete'}
                src={DeleteIcon}
                onClick={async () => {
                  this.props.carouselStore!.decreaseItemCount();
                  await this.props.slidesActions!.deleteSlide(this.props.slide, true);
                }}
              />
            </div>
          </div>
          <div className={'carouselInputs'}>
            <StyledDatePicker
              slide={this.props.slide}
            />
            <StyledValidatingInput
              className={'validatingTimeInput'}
              placeholder={'e.g. 0830'}
              listener={(e: any) => {
                this.props.changeTime(this.props.slide, e);
              }}
              id={'time-input'}
              validator={this.props.slide.isValidTime}
              value={this.props.slide.time}
              errorMessage={'Invalid time'}
              onlyValidateOnExit={true}
              tabIndex={this.props.tabIndex}
              reference={this.carouselTimeBox}
              keyDown={(e: any) => {
                if (e.keyCode === 9 && e.shiftKey) {
                  e.preventDefault();
                  this.props.carouselActions!.previous();
                }
              }}
            />
            <StyledValidatingInput
              placeholder={'Activity'}
              listener={(e: any) => {
                this.props.changeActivity(this.props.slide, e);
              }}
              value={this.props.slide.activity === 'ACTY' ? '' : this.props.slide.activity}
              id={'activityInput'}
              validator={true}
              tabIndex={this.props.tabIndex! + 1}
              reference={this.carouselActivityBox}
              keyDown={(e: any) => {
                if (e.keyCode === 9) {
                  e.preventDefault();
                  this.props.carouselActions!.next();
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }

}

export const StyledCarouselItem = inject('slidesStore', 'carouselActions', 'carouselStore', 'slidesActions')
(styled(CarouselItem)`

  .datePicker {
    position: relative;
  }

  .imgContainer {
    position: relative;
    width: 1280px;
    height: 720px;
    margin: auto;
  }
  
  .slideInfo {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 1280px;
    margin: auto;
    
    > * {
      margin-top: 16px;
    }
  }

  .expandedImage {
    width: 1280px;
    height:  720px;
    display: block;
    position: relative;
  }
  
  .validatingInput {
    width: 176px;
  }
  
  label {
    color: #FFF;
  }
  
  .calloutDropdown {
    position: relative;
    bottom: 720px;
    left: 1165px;
    width: 117px;
    height: 44px;
    
    .li-label {
      color: #15DEEC;
      opacity: 1 !important;
    }
    
    .dropdown-item {
      padding: 0;
      justify-content: center;
      color: #15deec;
      font-weight: bold;
    }
  
    ul {
     width: 117px;
    }
  }
  
  .slideTitleAndTrash {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    .slideTitle {
      color: #FFF;
      font-size: 22px;
      font-weight: normal;
      display: inline-block;
      width: unset;
      margin-right: 18px;
    }
    
    > div > img {
        cursor: pointer;
    }
  }
  
  .slideCount {
    font-size: 16px;
    color: #FFF;
  }
  
  .carouselInputs {
    display: flex;
  }
  
  .validatingTimeInput {
    margin: 0 24px;
  }
  
  .datePicker > label {
    display: none;
  }
  
  .controlUnit:nth-child(2) {
    margin-right: 24px;
  }
`);