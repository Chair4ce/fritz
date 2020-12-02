import * as React from 'react';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';
import { styled } from '../../../themes/default';

const GreenCheckmark = require('../../../icon/GreenCheckmark.svg');

interface Props {
  calloutTime: string;
  className?: string;
}

@observer
export class UploadSuccess extends React.Component<Props> {
  render() {
    return (
      <div className={classNames('uploadSuccess', this.props.className)}>
        <img
          className={'uploadSuccessIcon'}
          src={GreenCheckmark}
        />
        <span className={'message'}>
          Uploaded to {this.props.calloutTime}Z
        </span>
      </div>
    );
  }
}

export const StyledUploadSuccess = styled(UploadSuccess)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  font-family: ${(props) => props.theme.labelFontFamily};
  
  .message {
    color: ${(props) => props.theme.color.default};
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.4px;
  }
`;