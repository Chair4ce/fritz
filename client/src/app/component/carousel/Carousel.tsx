import * as React from 'react';
import { CSSProperties } from 'react';
import { inject, observer } from 'mobx-react';
import { CarouselActions } from './CarouselActions';
import { StyledCarouselItem } from './CarouselItem';
import { SlideModel } from '../slides/models/SlideModel';
import { CarouselStore } from './CarouselStore';
import { SlidesActions } from '../slides/actions/SlidesActions';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { SlidesStore } from '../slides/store/SlidesStore';
import { DropdownOption, StyledDropdown } from '../dropdown/Dropdown';
import { StyledStaticMessageDropdown } from '../dropdown/StaticMessageDropdown';
import { styled } from '../../../themes/default';

const exitIconPath = require('../../../icon/ExpandedCloseIcon.svg');
const arrowIcon = require('../../../icon/ArrowIcon.svg');

interface Props {
  slides: SlideModel[];
  carouselActions?: CarouselActions;
  carouselStore?: CarouselStore;
  slidesActions?: SlidesActions;
  slidesStore?: SlidesStore;
  className?: string;
  unicornStore?: UnicornStore;
}

@observer
export class Carousel extends React.Component<Props> {

  leftAnimation: CSSProperties = {
    left: '11.5vw',
    display: 'block',
    transition: 'left 0.7s'
  };

  componentDidMount(): void {
    document.addEventListener('keydown', this.handleKeyPresses);
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.handleKeyPresses);
  }

  handleKeyPresses = (e: any) => {
    if (e.keyCode === 27) {
      this.props.carouselActions!.hide();
    }
    if (e.keyCode === 37) {
      this.props.carouselActions!.previous();
    }
    if (e.keyCode === 39) {
      this.props.carouselActions!.next();
    }
  };

  componentWillMount(): void {
    this.props.carouselActions!.initialize(this.props.slidesStore!.undeletedSlides.length);
  }

  buildDropdown(activeSlide: SlideModel) {
    if (this.props.unicornStore!.offline) {
      return (
        <StyledStaticMessageDropdown
          label={'Offline'}
          message={'Refresh UNICORN and select a mission to view a list of callouts.'}
        />
      );
    } else if (this.props.unicornStore!.callouts.length === 0) {
      return (
        <StyledStaticMessageDropdown
          label={'Select'}
          message={'There are currently no callouts associated with this mission.'}
        />
      );
    } else {
      return (
        <StyledDropdown
          options={this.props.unicornStore!.calloutOptions}
          defaultValue={'Select'}
          value={activeSlide.calloutTimeForDisplay}
          callback={(option: DropdownOption) => {
            this.props.slidesActions!.changeCalloutOnSlide(activeSlide, option);
          }}
        />
      );
    }
  }

  render() {
    let {carouselActions} = this.props;
    let activeSlide = this.props.carouselStore!.activeItemIndex;
    let nextSlide = this.props.carouselStore!.nextActiveIndex;
    let prevSlide = this.props.carouselStore!.previousActiveIndex;

    return (
      <div className={this.props.className}>
        <div className="imgControls">
          <img
            src={arrowIcon}
            className={'previous'}
            onClick={carouselActions!.previous}
          />
          <img
            src={arrowIcon}
            className="next"
            onClick={carouselActions!.next}
          />
          <img
            className={'exitIcon'}
            src={exitIconPath}
            onClick={carouselActions!.hide}
          />
          <div
            className={'previousSlide'}
            onTransitionEnd={(e: any) => {
              if (e.propertyName === 'left') {
                this.props.carouselStore!.setAnimating('');
                e.target.style.transition = 'left 0.7s';
                this.props.carouselStore!.decreaseActiveIndex();
              }
            }}
            style={this.props.carouselStore!.animating === 'right' ?
              {left: '11.5vw'} : {transition: 'none', left: '-200%'}
            }
          >
            <StyledCarouselItem
              slide={this.props.slides[prevSlide]}
              changeTime={this.props.slidesActions!.setAndUpdateTime}
              changeActivity={this.props.slidesActions!.setAndUpdateActivity}
              callout={
                this.buildDropdown(this.props.slidesStore!.undeletedSlides[prevSlide])
              }
              count={(prevSlide + 1) + ' of ' + this.props.slidesStore!.undeletedSlides.length}
              tabIndex={6}
            />
          </div>
          <div
            className={'currentSlide'}
            onTransitionEnd={(e: any) => {
              if (e.propertyName === 'left') {
                e.target.style.transition = 'none';
                this.props.carouselStore!.setAnimating('');
              }
            }}
            style={this.props.carouselStore!.animating !== '' ?
              this.props.carouselStore!.animating === 'left' ? {left: '-170%', transition: 'left 0.7s'} :
                (this.props.carouselStore!.animating === 'right' ? {left: '170%', transition: 'left 0.7s'} :
                  {transition: 'none', left: '0%'}) : {transition: 'none', left: '0%'}
            }
          >
            <StyledCarouselItem
              active={true}
              slide={this.props.slides[activeSlide]}
              changeTime={this.props.slidesActions!.setAndUpdateTime}
              changeActivity={this.props.slidesActions!.setAndUpdateActivity}
              callout={
                this.buildDropdown(this.props.slidesStore!.undeletedSlides[activeSlide])
              }
              count={(activeSlide + 1) + ' of ' + this.props.slidesStore!.undeletedSlides.length}
              tabIndex={1}
            />
          </div>
          <div
            className={'nextSlide'}
            onTransitionEnd={(e: any) => {
              if (e.propertyName === 'left') {
                e.target.style.transition = 'none';
                this.props.carouselStore!.setAnimating('');
                this.props.carouselStore!.increaseActiveIndex();
              }
            }}
            style={this.props.carouselStore!.animating === 'left' ?
              this.leftAnimation : {transition: 'none', left: '200%'}
            }
          >
            <StyledCarouselItem
              slide={this.props.slides[nextSlide]}
              changeTime={this.props.slidesActions!.setAndUpdateTime}
              changeActivity={this.props.slidesActions!.setAndUpdateActivity}
              callout={
                this.buildDropdown(this.props.slidesStore!.undeletedSlides[nextSlide])
              }
              count={(nextSlide + 1) + ' of ' + this.props.slidesStore!.undeletedSlides.length}
              tabIndex={3}
            />
          </div>
        </div>
      </div>
    );
  }
}

export const StyledCarousel = inject(
  'carouselActions', 'carouselStore', 'slidesActions', 'unicornStore', 'slidesStore')
(styled(Carousel)`
    z-index: 500;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.8);
    
  .next, .previous {
    z-index: 5005;
    cursor: pointer;
    height: 50px;
    width: 50px;
    top: 400px;
  }
  
  .previous {
    transform: rotate(180deg);
    position: relative;
    left: 5vw;
  }
  
  .next {
    position: relative;
    float: right;
    margin-right: 5vw;
  }
  
  .exitIcon {
    cursor: pointer;
    position: relative;
    left: 1450px;
    top: 60px;
    z-index: 505;
  }
  
  .dropdownBtn {
    width: 140px;
    left: -26px;
    color: #15deec;
  }
  
  .dd {
    left: 2px;
    width: 112px;
    max-height: 500px;
    overflow: scroll;
  }
 
 .ddd {
    font-size: 20px;
  }
  
  .imgControls {
    width: 1655px;
    margin: auto;
  }
  
  .currentSlide, .previousSlide, .nextSlide {
    transition: left 0.7s;
  }
  
  .currentSlide {
    position: relative;
    left: 0%;
  }
  
  .previousSlide {
    position: absolute;
    left: -200%;
    .carouselInputs {
      left: 31.8%;
    }
  }
  
  .nextSlide {
    position: absolute;
    top: 50px;
    left: 200%;
    .carouselInputs {
      left: 31.8%;
    }
  }
  
  .dropdown {
    width: 117px;
    
    span {
      margin: 0;
    }
  }
`);