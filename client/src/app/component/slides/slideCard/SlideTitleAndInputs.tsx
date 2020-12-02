import * as React from 'react';
import { observer } from 'mobx-react';
import { StyledSlideTitle } from '../SlideTitle';
import { StyledDatePicker } from '../../date/DatePicker';
import { StyledValidatingInput } from '../../input/ValidatingInput';
import * as classNames from 'classnames';
import { SlideModel } from '../models/SlideModel';
import { styled } from '../../../../themes/default';

interface Props {
  slide: SlideModel;
  opName: string | null;
  asset: string | null;
  releasability: string;
  timeListener: (slide: SlideModel, e: any) => void;
  activityListener: (slide: SlideModel, e: any) => void;
  timeRef: any;
  activityRef: any;
  className?: string;
}

@observer
export class SlideTitleAndInputs extends React.Component<Props> {
  render() {
    let {
      slide,
      opName,
      asset,
      releasability,
      timeListener,
      activityListener,
      timeRef,
      activityRef
    } = this.props;

    return (
      <div className={classNames('titleAndInputs', this.props.className)}>
        <div className={'titleContainer'}>
          <StyledSlideTitle
            className={'slideTitle'}
            slide={slide}
            opName={opName}
            asset={asset}
            releasability={releasability}
          />
        </div>
        <div className={'slideInputs'}>
          <div className={'inputAligner'}>
            <StyledDatePicker
              slide={slide}
            />
            <StyledValidatingInput
              label={'Time'}
              className={'timeInput'}
              placeholder={'e.g. 0830'}
              listener={(e: any) => {
                timeListener(slide, e);
              }}
              id={'timeInput'}
              validator={slide.isValidTime}
              value={slide.time}
              errorMessage={'Invalid time'}
              onlyValidateOnExit={true}
              reference={timeRef}
            />
            <StyledValidatingInput
              className={'activityInput'}
              placeholder={'e.g. OV'}
              listener={(e: any) => {
                activityListener(slide, e);
              }}
              id={'activityInput'}
              validator={true}
              value={slide.activity}
              reference={activityRef}
              label={'Activity'}
            />
          </div>
        </div>
      </div>
    );
  }
}

export const StyledSlideTitleAndInputs = styled(SlideTitleAndInputs)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
  padding: 14px 14px 0 14px;
      
  .slideInputs {
    display: flex;
    align-items: flex-end;
    padding-bottom: 8px;
    flex: 1;
    
    
    .inputAligner {
      display: flex;
      flex: 1;
      flex-direction: row;
      justify-content: space-around;
      align-items: start;
    }
  }
  
  .titleContainer {
    width: 100%;
  }

  .slideTitle {
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }
  
  input {
    width: 132px;
    color: #fff;
    background-color:rgba(0, 0, 0, 0);
    
    :focus {
      background-color:rgba(0, 0, 0, 0);
      color: #fff;
      border: #15deec solid 1px;
    }
  }
  
  label {
    font-size: 16px;
  }
`;