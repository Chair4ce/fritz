import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { SlideModel } from '../src/app/component/slides/models/SlideModel';
import { StyledSlideTitle } from '../src/app/component/slides/SlideTitle';
import { StyledDatePicker } from '../src/app/component/date/DatePicker';
import { StyledInteractiveThumbnail } from '../src/app/component/thumbnail/InteractiveThumbnail';
import { StyledSlideTitleAndInputs } from '../src/app/component/slides/slideCard/SlideTitleAndInputs';
import { StyledStaticMessageDropdown } from '../src/app/component/dropdown/StaticMessageDropdown';
import * as moment from 'moment';
import { wrapper } from './index.stories';
import { StyledHeader } from '../src/app/component/header/Header';

const thumbnail = './thumbnail-image.jpg';

export function ComponentStory() {
  storiesOf('Components', module)
    .addDecorator(story => wrapper(story()))
    .addParameters({style: {boxSizing: 'border-box'}})

    .add('Slide Title', () => {
      let slide = new SlideModel();
      slide.setDate(moment());

      return (
        <StyledSlideTitle
          slide={slide}
          opName={'operation stormcloud'}
          asset={'flying pigs'}
          releasability={'for your eyes only'}
        />
      );
    })
    .add('Date Picker', () => {
      return (
        <StyledDatePicker
          slide={new SlideModel()}
        />
      );
    })
    .add('Interactive Thumbnail', () => {
      return (
        <StyledInteractiveThumbnail
          imagePath={thumbnail}
          onClick={() => {
            console.log('click');
          }}
          currentSlideNumber={1}
          totalSlideNumber={7}
        />
      );
    })

    .add('Slide Title and Inputs', () => {
      return (
        <div style={
          {
            height: '168px',

          }
        }>
          <StyledSlideTitleAndInputs
            slide={new SlideModel()}
            opName={'op dumbo drop'}
            asset={'elephant'}
            releasability={'you'}
            timeListener={() => {
            }}
            activityListener={() => {
            }}
            timeRef={null}
            activityRef={null}
          />
        </div>
      );
    })

    .add('Static Message Dropdown', () => {
      return (
        <div style={{width: '118px'}}>
          <StyledStaticMessageDropdown
            label={'Static'}
            message={'Lorem ipsum dolor sit amet, ' +
            'consectetur adipiscing elit, sed do ' +
            'eiusmod tempor incididunt ut labore ' +
            'et dolore magna aliqua.'}
          />
        </div>
      );
    })

    .add('Header', () => {
      return (
        <StyledHeader/>
      );
    })
  ;
}