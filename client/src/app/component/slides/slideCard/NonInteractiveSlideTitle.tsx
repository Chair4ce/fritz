import * as React from 'react';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';
import { styled } from '../../../../themes/default';

interface Props {
  slideName: string;
  className?: string;
}

@observer
export class NonInteractiveSlideTitle extends React.Component<Props> {
  render() {
    return (
      <div className={classNames('nonInteractiveSlideTitle', this.props.className)}>
        <span className={'slideLabel'}>
          JPEG Name
        </span>
        <span className={'slideName'}>
          {this.props.slideName}
        </span>
      </div>
    );
  }
}

export const StyledNonInteractiveSlideTitle = styled(NonInteractiveSlideTitle)`
  flex: 1;  
  white-space: pre-wrap;
  font-family: ${(props) => props.theme.labelFontFamily};
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  padding: 48px 14px 14px 14px;
  
  .slideLabel {
    color: ${(props) => props.theme.color.blueGrey};
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.5px;
  }
  
  .slideName {
    color: ${(props) => props.theme.color.paleGray};
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.57px;
    word-break: break-word;
  };
`;