import * as React from 'react';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';
import { styled } from '../../../themes/default';

const pdfIcon = require('../../../icon/PDFIcon.svg');
const paperclipIcon = require('../../../icon/PaperclipIcon.svg');
const resetUploadIcon = require('../../../icon/ResetUploadIcon.svg');

interface Props {
  fileName: string;
  className?: string;
}

@observer
export class DeletePDF extends React.Component<Props> {
  render() {
    return (
      <div className={classNames('deletePDF', this.props.className)}>
        <div id={'pdfIcon'}>
          <img src={pdfIcon}/>
        </div>
        <div id={'nameContainer'}>
          <img src={paperclipIcon}/>
          <div id={'pdfFileName'}>
            {this.props.fileName}
          </div>
          <img
            id={'deletePP'}
            data-toggle="modal"
            data-target="#deleteModal"
            src={resetUploadIcon}
          />
        </div>
      </div>
    );
  }
}

export const StyledDeletePDF = styled(DeletePDF)`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  #nameContainer {
    height: 38px;
    min-width: 188px;
    max-width: 504px;
    padding: 8px;
    display: flex;
    justify-content: space-between; 
    margin-top: 36px;  
    border-top: 1px solid ${(props) => props.theme.color.default};
    border-bottom: 1px solid ${(props) => props.theme.color.default};
  }
  
  #pdfFileName {
    font-size: 14px;
    font-family: ${(props) => props.theme.labelFontFamily};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${(props) => props.theme.color.default};
    text-align: center;
    padding-left: 24px;
    padding-right: 24px;
  }
  
  #deletePP {
    cursor: pointer;
  }

`;
