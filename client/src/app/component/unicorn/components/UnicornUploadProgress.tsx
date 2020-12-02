import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { UnicornStore } from '../store/UnicornStore';
import { SlidesStore } from '../../slides/store/SlidesStore';
import { UnicornActions } from '../actions/UnicornActions';
import { styled } from '../../../../themes/default';

interface Props {
  className?: string;
  slidesStore?: SlidesStore;
  unicornStore?: UnicornStore;
  unicornActions?: UnicornActions;
}

@observer
export class UnicornUploadProgress extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <span>{this.props.unicornStore!.currentUploadCount}</span> of
        <span>{this.props.slidesStore!.assignedCalloutCount}</span> images uploaded
        <div
          className="cancel"
          onClick={() => {
            this.props.unicornActions!.cancelUpload();
          }}
        >
          Cancel
        </div>
      </div>
    );
  }
}

export const StyledUnicornUploadProgress = inject('slidesStore', 'unicornStore', 'unicornActions')
(styled(UnicornUploadProgress)`
  color: #fff;
  font-style: italic;
  letter-spacing: 0.4px;
  top: 19px;
  right: 60px;
  position: absolute;
  display: inline-flex;

  span {
    color: #15DEEC;
    margin-left: 4px;
    margin-right: 4px;
  }
  
  .cancel {
    color: #15deec;
    font-size: 16px;
    cursor: pointer;
    margin-left: 14px;
    font-style: normal;
  }
`);