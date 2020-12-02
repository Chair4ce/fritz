import * as React from 'react';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';
import { styled, theme } from '../../../themes/default';
import { ClapSpinner } from 'react-spinners-kit';

interface Props {
  className?: string;
}

@observer
export class UploadInProgress extends React.Component<Props> {
  render() {
    return (
      <div className={classNames('uploadInProgress', this.props.className)}>
        <ClapSpinner
          frontColor={theme.color.lightningBlue}
          size={48}
        />
        <span className={'message'}>Uploading</span>
      </div>
    );
  }
}

export const StyledUploadInProgress = styled(UploadInProgress)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  font-family: ${(props) => props.theme.fontFamily};
  color: ${(props) => props.theme.color.default};
 
  .message {
    font-size: 14px;
    letter-spacing: 0.4px;
    font-weight: 500;
  }
`;