import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { UploadStore } from '../form/upload/UploadStore';
import { SlidesStore } from '../slides/store/SlidesStore';
import { UploadActions } from '../form/upload/actions/UploadActions';
import { Toast } from '../../../utils/Toast';
import { styled } from '../../../themes/default';

interface Props {
  className?: string;
  uploadStore?: UploadStore;
  slidesStore?: SlidesStore;
  uploadActions?: UploadActions;
}

@observer
export class DeleteModal extends React.Component<Props> {

  deleteSlides = () => {
    this.props.uploadStore!.setProcessing(false);
    this.props.uploadStore!.setUploaded(false);
    this.props.uploadStore!.setPlaceholder(true);
    this.props.slidesStore!.setSlides([]);
    this.props.uploadActions!.clearPoll();
    this.props.uploadStore!.setTotal(0);
    this.props.uploadStore!.setProgress(0);
    let ele1 = document.querySelector('.uploadContainer') as HTMLElement;
    let ele2 = document.querySelector('.helpMessage') as HTMLElement;
    if (ele1 && ele2) {
      ele1.style.border = '1px dashed #d4d6db';
      ele2.style.display = 'inline-block';
    }
    Toast.create(
      5000,
      'deleteToast',
      '<b>PDF File Removed</b>'
    );
    this.cleanOnExit();
  };

  cleanOnExit() {
    let request = new XMLHttpRequest();
    request.open('POST', '/api/roomba', true);
    request.send(document.cookie);
  }

  render() {
    return (
      <div
        className={this.props.className + ' modal show'}
        id="deleteModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Delete PDF</h5>
              <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete the PDF file? All changes will be lost and this action cannot
              be undone.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary text-white" data-dismiss="modal">Cancel</button>
              <button
                type="button"
                className="btn btn-primary text-white"
                onClick={this.deleteSlides}
                data-dismiss="modal"
              >
                Delete PDF
              </button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export const StyledDeleteModal = inject('uploadStore', 'slidesStore', 'uploadActions')(styled(DeleteModal)`
position: absolute;
left: 50%;
top: 50%;
width: 600px;
height: 400px;
transform: translate(-50%, -50%);

.modal-header {
border-bottom-color: #1b1e21;
}
.modal-footer {
border-top-color: #1b1e21;
}
.btn-primary {
background: #AE4754;
border: none;
}
`);