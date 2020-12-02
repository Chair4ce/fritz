import * as React from 'react';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';
import { styled } from '../../../themes/default';

const WaitingIcon = require('../../../icon/WaitingIcon.svg');

interface Props {
  calloutTime: string;
  className?: string;
}

@observer
export class UploadWaiting extends React.Component<Props> {
  render() {
    return (
      <div
        className={classNames('uploadWaiting', this.props.className)}
      >
        <div className={'pseudoDropdown'}>
          <span className={'calloutTime'}>
            {this.props.calloutTime}Z
          </span>
          <img
            className={'waitingIcon'}
            src={WaitingIcon}
          />
        </div>
          <span className={'message'}>
            Waiting to Upload
          </span>
      </div>
    );
  }
}

export const StyledUploadWaiting = styled(UploadWaiting)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  font-family: ${(props) => props.theme.labelFontFamily};
  
  .pseudoDropdown {
    height: 44px;
    width: 118px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme.color.deepPurple};
    color: ${(props) => props.theme.color.lightningBlue};
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.71px;
    border-radius: 4px;
    
    .waitingIcon {
      margin-left: 10px;
    }
    
    .calloutTime {
      margin-bottom: 2px;
    }
  }
  
  .message {
    color: ${(props) => props.theme.color.beige};
    font-size: 14px;
    font-style: italic;
    letter-spacing: 0.4px;
  }
`;