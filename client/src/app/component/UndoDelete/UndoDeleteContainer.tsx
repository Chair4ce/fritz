import * as React from 'react';
import { observer } from 'mobx-react';
import { SlideModel } from '../slides/models/SlideModel';
import { styled } from '../../../themes/default';
import * as classNames from 'classnames';

interface Props {
  slideModel: SlideModel;
  className?: string;
}

@observer
export class UndoDeleteContainer extends React.Component<Props> {
  render() {
    return (
      <div
        className={classNames('undoDeleteContainer', this.props.className)}
      >
        <div className={'deleteTitle'}>
          JPEG Deleted
        </div>
        <button
          className={'undoButton'}
          onClick={() => this.props.slideModel.setDeleted(false)}
        >
          Undo
        </button>
      </div>
    );
  }
}

export const StyledUndoDeleteContainer = styled(UndoDeleteContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  background: ${(props) => props.theme.color.blackTea};
  border-radius: 2px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  height: 50px;
  font-size: 16px;

  button {
    float: right;
    border: none;
    background: none;
    color: rgb(21, 222, 236);
    cursor: pointer;
    position: relative;
    right: 10px;
  }
  
  button:focus {
    outline: 0;
  }
  
  .deleteTitle {
    color: ${(props) => props.theme.color.default};
    color: ${(props) => props.theme.labelFontFamily};
    display: inline-block;
  }

`;