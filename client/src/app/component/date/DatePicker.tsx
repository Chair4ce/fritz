import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { SlideModel } from '../slides/models/SlideModel';
import * as classNames from 'classnames';
import { styled } from '../../../themes/default';

const ArrowIcon = require('../../../icon/DatePickerArrow.svg');

interface Props {
  slide: SlideModel;
  className?: string;
}

@observer
export class DatePicker extends React.Component<Props> {
  render() {
    return (
      <div className={classNames('datePicker', this.props.className)}>
        <label>Date</label>
        <div className={'dateBox'}>
          <div className={'selectedDate'}>
            <span>{this.props.slide.displayDate}</span>
          </div>
          <div className={'arrows'}>
            <div
              className={'upArrow'}
              onClick={() => {
                this.props.slide.incrementDay();
              }}
            >
              <img src={ArrowIcon}/>
            </div>
            <div
              className={'downArrow'}
              onClick={() => {
                this.props.slide.decrementDay();
              }}
            >
              <img src={ArrowIcon}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledDatePicker = inject()(styled(DatePicker)`
  width: 88px;
  font-size: ${(props) => props.theme.fontSize};
  font-family: ${(props) => props.theme.labelFontFamily};
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  
  .dateBox {
    box-sizing: border-box;
    height: ${(props) => props.theme.inputHeight};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: solid 1px #ccc;
    border-radius: 4px;
    color: #eaf3ff;
  }
  
  .arrows {
    height: 36px;
    width: 23px;
    text-align: center;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  
  .selectedDate {
    width: 63px;
    text-align: center;
  }
  
  label {
    color: #fff;
    margin-bottom: ${(props) => props.theme.labelMarginBottom};
  }
  
  .upArrow, .downArrow {
    background-color: #00818c;
    display: flex;
    flex-grow: 1;
    justify-content: center;
  }
  
  .upArrow {
    border-radius: 0 4px 0 0;
    margin-bottom: 2px;
  }
  
  .downArrow {
    border-radius: 0 0 4px 0;
    
    img {
      transform: rotateX(180deg);
    }
  }
`);