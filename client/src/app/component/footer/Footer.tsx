import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { StyledActionButton } from '../button/ActionButton';
import { StyledUnicornUploadProgress } from '../unicorn/components/UnicornUploadProgress';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { styled } from '../../../themes/default';

interface Props {
  downloader: () => {};
  uploader: () => {};
  hideButtons: boolean;
  className?: string;
  unicornStore?: UnicornStore;
}

@observer
export class Footer extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <nav className="navbar navbar-default">
          {
            !this.props.hideButtons
              ?
              <div
                className="container-fluid"
              >

                <StyledActionButton
                  clickAction={this.props.downloader}
                  text={'Download JPEGS'}
                  id={'downloadButton'}
                  disabled={false}
                />
                { !this.props.unicornStore!.offline &&
                  <StyledActionButton
                    clickAction={this.props.uploader}
                    text={'Upload to UNICORN'}
                    id={'uploadButton'}
                    disabled={false}
                  />
                }
              </div>
              :
              <StyledUnicornUploadProgress/>
          }
        </nav>
      </div>
    );
  }
}

export const StyledFooter = inject('unicornStore')(styled(Footer)`
  background: #1E232B;
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.5);
  z-index: 3;
  height: 64px;


  .container-fluid {
    justify-content: flex-end;
  }
  
  #downloadButton {
    color: #fff;
    margin: 5px;
  }
  
  #uploadButton {
    background-color: #00818C;
    
    :hover {
      background-color: #3BB7C1;
    }
  }  
`);