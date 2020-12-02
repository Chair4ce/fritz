import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { SlidesStore } from '../store/SlidesStore';
import { StyledSlideCard } from '../slideCard/SlideCard';
import { StyledUndoDeleteContainer } from '../../UndoDelete/UndoDeleteContainer';
import { CarouselActions } from '../../carousel/CarouselActions';
import * as classNames from 'classnames';
import { styled } from '../../../../themes/default';

interface Props {
  carouselActions?: CarouselActions;
  slidesStore?: SlidesStore;
  className?: string;
}

@observer
export class SlideCardContainer extends React.Component<Props> {
  count: number = 0;

  componentWillUpdate() {
    this.count = 0;
  }

  render() {
    return (
      <div className={classNames('slideCardContainer', this.props.className)}>
        {
          this.props.slidesStore!.slides
            .map((slide, idx) => {
              if (slide.deleted) {
                this.count++;
              }
              return (
                <div className={'slideCardOrDeletedSlide'} key={idx}>
                  {
                    !slide.deleted &&
                    <StyledSlideCard
                      slide={slide}
                      slideNumber={idx - this.count}
                      thumbnailClick={(index: number) => {
                        this.props.carouselActions!.show(index);
                      }}
                      first={idx === 0}
                    />
                  }
                  {
                    slide.deleted &&
                    <StyledUndoDeleteContainer
                      slideModel={slide}
                      className={'undoDelete'}
                    />
                  }
                </div>
              );
            })
        }
      </div>
    );
  }
}

export const StyledSlideCardContainer = inject(
  'slidesStore', 'carouselActions'
)(styled(SlideCardContainer)`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  scroll-behavior: smooth;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  
  .slideCardOrDeletedSlide {
    margin-bottom: 8px;
  }
  
  .undoDelete {
    margin-right: 34px;
  }
  
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    display: none; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.color.slate}; 
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.color.slate}; 
  }
`);