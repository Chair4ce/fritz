import * as React from 'react';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';
import { styled } from '../../../themes/default';

const expandIcon = require('../../../icon/ExpandIcon.svg');

interface Props {
  imagePath: string;
  onClick: () => void;
  currentSlideNumber: number;
  totalSlideNumber: number;
  className?: string;
}

@observer
export class InteractiveThumbnail extends React.Component<Props> {
  render() {
    return (
      <div className={classNames('interactiveThumbnail', this.props.className)}>
        <img
          src={this.props.imagePath}
          className={'thumbnailImage'}
        />
        <div className={'thumbnailInformationOverlay'}>
          <span className={'slideCount'}>
            {this.slideCountText()}
          </span>
          <span className={'expandIcon'}>
            <img src={expandIcon}/>
          </span>
        </div>
        <div
          className={'thumbnailClickOverlay'}
          onClick={() => {
            this.props.onClick();
          }}
        >
          <span className={'instruction'}>Click to Expand</span>
        </div>
      </div>
    );
  }

  private slideCountText() {
    let current = this.props.currentSlideNumber;
    let total = this.props.totalSlideNumber;
    return `${current} of ${total}`;
  }
}

export const StyledInteractiveThumbnail = styled(InteractiveThumbnail)` 
  height: 168px;
  width: 168px;
  display: grid;
  border-radius: 4px;
  
  > * {
    grid-row: 1;
    grid-column: 1;
    border-radius: inherit;
  }
  
  .thumbnailImage {
    width: inherit;
    object-fit: cover;
    height: 167px;
    cursor: pointer;
  }
  
  .thumbnailInformationOverlay {
    display: flex;
    justify-content: space-between;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(43, 48, 60, 0.557886);
    }
    
    .slideCount {
      width: 54px;
      height: 24px;
      font-family: ${(props) => props.theme.labelFontFamily};
      font-size: 14px;
      font-weight: 500;
      color: ${(props) => props.theme.color.default};
      border-top-left-radius: 4px;
    }
    
    .expandIcon {
      height: 34px;
      width: 34px;
      border-top-right-radius: 4px;
    }
  }

  .thumbnailClickOverlay {
    z-index: 100;
    display: flex;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.5s;
    cursor: pointer;
    
    .instruction {
      display: none;
    }
    
    :hover {
      background-color: rgba(0, 0, 0, 0.6);
      
      .instruction {
        display: flex;
        flex-grow: 1;
        font-family: ${(props) => props.theme.labelFontFamily};
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 14px;
        color: ${(props) => props.theme.color.default};
      }
    }
  }
    
  }
`;