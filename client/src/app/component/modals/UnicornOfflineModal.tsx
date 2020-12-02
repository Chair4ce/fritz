import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { styled } from '../../../themes/default';

interface Props {
  className?: string;
  unicornStore?: UnicornStore;
}

const offlineUnicorn = require('../../../icon/OfflineUnicorn.svg');

@observer
export class UnicornOfflineModal extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="offlineModal">
          <span className="offlineTitle">UNICORN Unavailable</span>
          <div className="innerOfflineContainer">
            <img src={offlineUnicorn}/>
            <span className="message">We’re sorry! UNICORN is down at this time. However, you can
              still rename and download your JPEGs to your desktop.</span>
          </div>
          <button
            className="continueButton"
            onClick={() => {
              this.props.unicornStore!.setOfflineModal(false);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }
}

export const StyledUnicornOfflineModal = inject('unicornStore')(styled(UnicornOfflineModal)`
  background: rgba(0, 0, 0, 0.5);
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  position: fixed;
  z-index: 75;
  
  .offlineModal {
    position: absolute;
    display: block;
    width: 840px;
    height: 300px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 4px 4px 6px 0 rgba(0, 0, 0, 0.5);
    background-image: linear-gradient(to top, #1e222a, #39414e);  
  }
  
  .offlineTitle {
    display: block;
    font-size: 30px;
    font-weight: bold;
    color: #fff;
    width: 100%;
    height: 60px;
    background-color: #1f1f2c;
    border-radius: 2px;
    padding-left: 17px;
    padding-top: 8px;
  }
  
  img {
    position: relative;
    left: 23px;
    top: 21px;
    display: block;
  }
  
  .message {
    font-size: 24px;
    color: #eaf3ff;
    width: 600px;
    height: 84px;
    letter-spacing: normal;
    position: relative;
    display: block;
    left: 24%;
    bottom: 90px;
   }
   
   button {
    outline: none;
    width: 157px;
    height: 38px;
    border-radius: 4px;
    background-color: #00818C;
    font-size: 16px;
    color: #FFF;
    cursor: pointer;
    transition: background-color 250ms;
    position: absolute;
    right: 38px;
    bottom: 24px;
    
    :hover {
      background-color: #3BB7C1;
    }
   }
  
`);