import * as React from 'react';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';
import { styled } from '../../../themes/default';

const failureIcon = require('../../../icon/UploadFailedIcon.svg');

interface Props {
  calloutTime: string;
  retry: () => void;
  className?: string;
}

@observer
export class UploadFailure extends React.Component<Props> {
  render() {
    return (
      <div
        className={classNames('uploadFailure', this.props.className)}
      >
        <div className={'pseudoDropdown'}>
          <span className={'calloutTime'}>
            {this.props.calloutTime}Z
          </span>
          <img className={'failedIcon'} src={failureIcon}/>
        </div>
        <span className={'message'}>
          Upload Failed
          <span
            className={'retry'}
            onClick={() => this.props.retry()}
          >
            Retry
          </span>
        </span>
      </div>
    );
  }
}

export const StyledUploadFailure = styled(UploadFailure)`
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
    
    .failedIcon {
      margin-left: 10px;
    }
  }
  
  .message {
    font-size: 14px;
    color: ${(props) => props.theme.color.default};
    letter-spacing: 0.4px;
    
    .retry {
      color: ${(props) => props.theme.color.lightningBlue};
      letter-spacing: 0.86px;
      font-size: 16px;
      margin-left: 8px;
      cursor: pointer;
    }
  }
`;