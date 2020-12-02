import * as React from 'react';
import { observer } from 'mobx-react';
import { styled } from '../../../themes/default';

interface Props {
  clickAction: () => {};
  disabled: boolean;
  text?: string;
  id?: string;
  className?: string;
}

@observer
export class ActionButton extends React.Component<Props> {
  render() {
    return (
      <div className={this.props.className}>
        <button
          id={this.props.id}
          className="action-button"
          onClick={this.props.clickAction}
          disabled={this.props.disabled}
        >
          {this.props.text}
        </button>
      </div>);
  }
}

export const StyledActionButton = styled(ActionButton)`
  button {
    float: right;
    outline: none;
    width: 170px;
    height: 38px;
    border-radius: 4px;
    border: solid 1px #00818C;
    color: #FFF;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 250ms;
    cursor: pointer;
    font-size: 16px;
    overflow-wrap: normal;

    :hover {
      background-color: #00818C;
    }
    
    button:disabled,
    button[disabled] {
      background-color: #303b3c;
      color: #676767;
      border: none;
      cursor: not-allowed;
  }
`;