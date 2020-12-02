import * as React from 'react';
import { CSSProperties } from 'react';
import { inject, observer } from 'mobx-react';
import { SlideModel, SlideUploadStatus } from '../models/SlideModel';
import { SlidesActions } from '../actions/SlidesActions';
import { SlidesStore } from '../store/SlidesStore';
import * as ReactDOM from 'react-dom';
import { MetricActions } from '../../metrics/actions/MetricActions';
import { UploadStore } from '../../form/upload/UploadStore';
import { StyledCalloutContainer } from '../../unicorn/Callout/CalloutContainer';
import { UnicornStore } from '../../unicorn/store/UnicornStore';
import { StyledInteractiveThumbnail } from '../../thumbnail/InteractiveThumbnail';
import { StyledSlideTitleAndInputs } from './SlideTitleAndInputs';
import { CalloutStore } from '../../unicorn/Callout/CalloutStore';
import { StyledNonInteractiveSlideTitle } from './NonInteractiveSlideTitle';
import * as classNames from 'classnames';
import { styled } from '../../../../themes/default';

const DeleteIcon = require('../../../../icon/DeleteIcon.svg');

interface Props {
  slideNumber: number;
  slide: SlideModel;
  thumbnailClick: (i: number) => void;
  slidesActions?: SlidesActions;
  slidesStore?: SlidesStore;
  uploadStore?: UploadStore;
  metricActions?: MetricActions;
  unicornStore?: UnicornStore;
  first?: boolean;
  className?: string;
}

@observer
export class SlideCard extends React.Component<Props> {
  timeBox: any;
  activityBox: any;
  goodCSS: CSSProperties = {};

  constructor(props: Props) {
    super(props);
    this.timeBox = React.createRef();
    this.activityBox = React.createRef();
  }

  render() {
    return (
      <div className={classNames('slideCard', this.props.className)}>
        <div className={'slideContent'}>
          {this.displayInteractiveThumbnail()}
          {this.displayTitleAndInputs()}
          {this.displaySeparatingLine()}
          {this.displayCalloutInfo()}
        </div>
        <div className={'trashCan'}>
          {this.displayDelete()}
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    let {slide} = this.props;

    let activityInput = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('#activityInput') as HTMLInputElement;
    let timeInput = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('#timeInput') as HTMLInputElement;
    if (activityInput) {
      activityInput.value = slide.activity === 'ACTY' ? '' : slide.activity;
    }
    if (timeInput) {
      timeInput.value = slide.time === 'TTTT' ? '' : slide.time;
    }
  }

  componentDidMount() {
    let {slide} = this.props;

    this.setFocus();
    let activityInput = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('#activityInput') as HTMLInputElement;
    let timeInput = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector('#timeInput') as HTMLInputElement;
    if (activityInput) {
      activityInput.value = slide.activity === 'ACTY' ? '' : slide.activity;
    }
    if (timeInput) {
      timeInput.value = slide.time === 'TTTT' ? '' : slide.time;
    }
  }

  setFocus() {
    let {slide} = this.props;

    if (this.props.first) {
      if (slide.uploadStatus !== SlideUploadStatus.SUCCEEDED) {
        if (!slide.isValidTime) {
          this.timeBox.current.focus();
        } else {
          this.activityBox.current.focus();
        }
      }
    }
  }

  private displayInteractiveThumbnail() {
    let {slide, slideNumber, slidesStore, uploadStore} = this.props;

    function concatenateImagePath() {
      return 'api/image/' + uploadStore!.hash + '/' +
        slide.oldName.replace('.JPG', '.jpg');
    }

    return (
      <StyledInteractiveThumbnail
        imagePath={concatenateImagePath()}
        onClick={() => this.props.thumbnailClick(slideNumber)}
        currentSlideNumber={slideNumber + 1}
        totalSlideNumber={slidesStore!.undeletedSlides.length}
      />
    );
  }

  private displayTitleAndInputs() {
    let {slide, slidesStore, slidesActions} = this.props;
    if (
      slide.uploadStatus === SlideUploadStatus.NOT_STARTED ||
      slide.uploadStatus === SlideUploadStatus.FAILED
    ) {
      return (
        <StyledSlideTitleAndInputs
          slide={slide}
          opName={slidesStore!.opName}
          asset={slidesStore!.asset}
          releasability={slidesStore!.releasability}
          timeListener={slidesActions!.setAndUpdateTime}
          activityListener={slidesActions!.setAndUpdateActivity}
          timeRef={this.timeBox}
          activityRef={this.activityBox}
        />
      );
    } else {
      return (
        <StyledNonInteractiveSlideTitle
          slideName={slide.newName}
        />
      );
    }
  }

  private displaySeparatingLine() {
    return (
      <div className={'separatingLine'}/>
    );
  }

  private displayCalloutInfo() {
    return (
      <StyledCalloutContainer
        slide={this.props.slide}
        calloutStore={new CalloutStore(this.props.unicornStore!, this.props.slide)}
      />
    );
  }

  private displayDelete() {
    let {slide, slidesActions} = this.props;

    return (
      <div className={'delete'}>
        {
          this.shouldDisplayTrashCan(slide)
          &&
          <img
            className={'deleteIcon'}
            onClick={async () => {
              await slidesActions!.deleteSlide(slide);
            }}
            src={DeleteIcon}
          />
        }
      </div>
    );
  }

  private shouldDisplayTrashCan(slide: SlideModel) {
    return (
      slide.uploadStatus === SlideUploadStatus.NOT_STARTED
      || slide.uploadStatus === SlideUploadStatus.FAILED
    );
  }
}

export const StyledSlideCard = inject(
  'slidesActions',
  'slidesStore',
  'metricActions',
  'uploadStore',
  'unicornStore'
)(styled(SlideCard)`
  display: flex;
  justify-content: space-between;
  min-width: 726px;
  
  .slideContent {
    display: flex;
    flex: 1;
    flex-direction: row;
    height: 168px;
    background-color: ${(props) => props.theme.color.blackTea};
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }
  
  .separatingLine {
    border: .5px solid rgba(108, 127, 156, 0.5);
    margin: 10px 0;
    width: .5px;
  }
  
  .delete {
    display: flex;
    width: 34px;
    
    .deleteIcon {
      width: 24px;
      height: 24px;
      cursor: pointer;
      margin-left: 10px;
      margin-top: 12px;
    }
  }
  
`);