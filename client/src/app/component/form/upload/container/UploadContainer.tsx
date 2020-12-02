import * as React from 'react';
import { CSSProperties } from 'react';
import { inject, observer } from 'mobx-react';
import { UploadActions } from '../actions/UploadActions';
import { UploadStore } from '../UploadStore';
import { Toast } from '../../../../../utils/Toast';
import { SlidesStore } from '../../../slides/store/SlidesStore';
import * as classNames from 'classnames';
import { styled } from '../../../../../themes/default';

const adobe = require('../../../../../icon/Adobe.svg');
const helpMenuIcon = require('../../../../../icon/HelpMenu.svg');

interface Props {
  help: () => void;
  className?: string;
  uploadActions?: UploadActions;
  uploadStore?: UploadStore;
  slidesStore?: SlidesStore;
}

@observer
export class UploadContainer extends React.Component<Props> {
  browseInputRef: any;

  noBorder: CSSProperties = {
    border: 'none'
  };

  goodCSS: CSSProperties = {};

  constructor(props: Props) {
    super(props);
    this.browseInputRef = React.createRef();
  }

  render() {
    return (
      <>
        {this.displayUploadRequest()}
      </>
    );
  }

  doUpload = async (e: any) => {
    e.preventDefault();
    let formData = new FormData();
    e.persist();
    if (e.type === 'change') {
      const element = document.querySelector('#browseInput')! as HTMLInputElement;
      if (element != null && element.files) {
        formData.append('file', element.files[0]);
      }
    } else {
      formData.append('file', e.dataTransfer.files[0]);
    }
    let file: File = formData.get('file') as File;
    if (file) {
      let fileName = file.name;
      if (fileName.toLowerCase().endsWith('ppt')) {
        (document.querySelector('#browseInput') as HTMLInputElement).value = '';
        Toast.create(
          5000,
          'errorToast',
          'The file format .ppt is not compatible with Fritz. File must be saved as .pdf.'
        );
      }
      if (fileName.toLowerCase().endsWith('pdf')) {
        await this.props.uploadActions!.upload(formData);
        let ele1 = document.querySelector('.uploadContainer') as HTMLElement;
        let ele2 = document.querySelector('.helpMessage') as HTMLElement;
        if (ele1 && ele2) {
          ele1.style.border = 'none';
          ele2.style.display = 'none';
        }
      } else if (!fileName.toLowerCase().endsWith('ppt')) {
        (document.querySelector('#browseInput') as HTMLInputElement).value = '';
        Toast.create(
          5000,
          'errorToast',
          '<b>Error:</b> File must be a PDF(<b>.pdf</b>)'
        );
      }
    }
  };

  displayUploadRequest() {
    return (
      <div
        className={classNames('uploadContainer', this.props.className)}
        onDragEnter={(e: any) => {
          let evt = e as Event;
          evt.preventDefault();
        }}
        onDragOver={(e: any) => {
          let evt = e as Event;
          evt.preventDefault();
        }}
        onDrop={this.doUpload}
      >
        <div className={'informationBox'}>
          <div className={'titleBox'}>
              <span className={'title'}>
                Upload a PDF
              </span>
            <img
              className={'helpIcon'}
              onClick={() => {
                this.props.help();
              }}
              src={helpMenuIcon}
            />
          </div>
          <span className={'subTitle'}>
            Upload a mission storyboard as a .pdf file to view, rename, and upload images
          </span>
        </div>
        <div
          className={'clickOrDragBox'}
          onClick={this.browseViaInput()}
        >
          <img
            className={'adobeIcon'}
            src={adobe}
          />
          <div
            className={'instructionBox'}
          >
              <span
                className={'instructionMessage'}
              >
                Drag and drop Mission Storyboard saved as PDF
              </span>
            <span className={'instructionMessageSpacer'}> or </span>
            <input
              name={'browseInput'}
              id={'browseInput'}
              className={'browseInput'}
              type={'file'}
              onChange={this.doUpload}
              ref={this.browseInputRef}
            />
            <button
              className={'browseButton'}
              id={'browseButton'}
            >
              Browse
            </button>
          </div>
        </div>
      </div>
    );
  }

  private browseViaInput() {
    return () => {
      this.browseInputRef.current.click();
    };
  }
}

export const StyledUploadContainer = inject(
  'uploadActions',
  'uploadStore',
  'slidesStore'
)(styled(UploadContainer)`
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  overflow-y: hidden;
  align-items: center;
  width: inherit;
  min-width: 688px;
  min-height: 624px;

  .informationBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  
    .titleBox {
      display: flex;
      align-items: center;
      font-family: ${(props) => props.theme.labelFontFamily};
      letter-spacing: normal;
      
      .title {
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        color: ${(props) => props.theme.color.default};
      }
      
      .helpIcon {
        margin-left: 8px;
        cursor: pointer;
      }
    }
    
    .subTitle {
      margin-top: 8px;
      font-size: 20px;
      font-weight: 300;
      color: ${(props) => props.theme.color.lightGreyBlue};
    }
  }
  
  .clickOrDragBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: inherit;
    max-width: 1000px;
    height: 566px;
    border: 2px dashed ${(props) => props.theme.color.silver};
    cursor: pointer;
    
    .adobeIcon {
      margin-top: 44px;
    }
    
    .browseInput {
      display: none;
    }
    
    .instructionBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      flex: 1;
      margin-bottom: 64px;
      margin-top: 48px;
      font-family: ${(props) => props.theme.labelFontFamily};
      color: ${(props) => props.theme.color.silver};
      
      .instructionMessage {
        font-size: 24px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: normal;
      }
      
      .instructionMessageSpacer {
        font-weight: 300;
        font-size: 18px;
      }
      
      .browseButton {
        outline: none;
        width: 157px;
        height: 38px;
        border-radius: 4px;
        border: solid 1px ${(props) => props.theme.color.lightningBlue};
        color: ${(props) => props.theme.color.default};
        background-color: rgba(0, 0, 0, 0);
        transition: background-color 250ms;
        cursor: pointer;
        font-size: 16px;
        overflow-wrap: normal;
        line-height: 34px;
        vertical-align: middle;
    
        :hover {
          background-color: ${props => props.theme.color.teal};
        }
      }
    }
  }
`);