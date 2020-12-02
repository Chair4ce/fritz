import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { UnicornStore } from '../unicorn/store/UnicornStore';
import { SlidesStore } from '../slides/store/SlidesStore';
import { SlidesActions } from '../slides/actions/SlidesActions';
import { SlideModel } from '../slides/models/SlideModel';
import { UnicornActions } from '../unicorn/actions/UnicornActions';
import { MetricActions } from '../metrics/actions/MetricActions';
import { styled } from '../../../themes/default';

const unicorn = require('../../../icon/UnicornIcon.svg');
const image = require('../../../icon/ImageIcon.svg');

interface Props {
  className?: string;
  unicornStore?: UnicornStore;
  slidesActions?: SlidesActions;
  slidesStore?: SlidesStore;
  unicornActions?: UnicornActions;
  metricActions?: MetricActions;
}

@observer
export class UnicornUploadModal extends React.Component<Props> {
  componentDidMount() {
    this.props.slidesActions!.getAssignedCallouts();
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="titleBackground modal">
          <div className="title">
            Upload To Unicorn
          </div>
          {
            !this.props.unicornStore!.unassignedCallouts &&
            <div>
              <div className="allIcons">
                <img src={unicorn} id="unicornConfirm"/>
              </div>
              <div className="confirmText">
                You are about to upload {this.props.slidesStore!.assignedCalloutCount}
                <a> images to UNICORN.<br/> Would you like to continue?</a>
              </div>
              <div className="btnGroup">
                <button
                  className="cancelBtn"
                  onClick={() => {
                    this.props.unicornStore!.setPendingUpload(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="confirmBtn"
                  onClick={this.props.unicornActions!.confirmUpload}
                >
                  Yes, upload to UNICORN
                </button>
              </div>
            </div>
          }
          {
            this.props.unicornStore!.unassignedCallouts &&
            <div>
              <div className="unassignedMessage">
                The following images are not assigned to a UNICORN Callout and <br/> will not be uploaded.
                They can still be downloaded to your desktop.
              </div>
              <div className="unassignedImages">
                {this.props.slidesStore!.slides.map((s: SlideModel, idx) => {
                    if (s.targetEventId === '') {
                      return (
                        <div
                          key={idx}
                          className="unassignedCallout"
                        >
                          <img src={image}/>
                          {s.newName}
                        </div>
                      );
                    }
                    return;
                  }
                )}
              </div>
              <div className="continueText">
                Would you like to continue without uploading these images?
              </div>
              <div className="buttons">
                <button
                  className="cancelBtn"
                  id="goBack"
                  onClick={() => {
                    this.props.unicornStore!.setPendingUpload(false);
                  }}
                >
                  Go Back
                </button>
                <button
                  className="confirmBtn"
                  onClick={this.props.unicornActions!.confirmUpload}
                >
                  Yes, Upload to UNICORN
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export const StyledUnicornUploadModal = inject(
  'unicornStore',
  'slidesActions',
  'slidesStore',
  'unicornActions',
  'metricActions')
(styled(UnicornUploadModal)`
  background: rgba(0, 0, 0, 0.5);
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  position: fixed;
  z-index: 100;


  span {
    position: relative;
    left: 5px;
  }

          #checkIcon {
          position: relative;
          top: 24px;
        }

          .uploadComplete {
          text-align: center;
        }

          .uploadStatus {
          position: relative;
          top: 39px;
          letter-spacing: 1.1px;
          font-size: 30px;
          font-weight: bold;
          color: #ffffff;
        }

          .uploadMsg {
          position: relative;
          top: 37px;
          letter-spacing: 0.9px;
          font-weight: 300;
          font-size: 24px;
          color: #eaf3ff;
        }

          .btnGroup {
          position: absolute;
          text-align: center;
          top: 404px;
          left: 202px;
        }

          .createNewBtn {
          cursor: pointer;
          position: relative;
          background: transparent;
          border-radius: 4px;
          font-size: 16px;
          border: solid 1px #00818c;
          width: 208px;
          height: 38px;
          right: 8px;
          color: white;
        }

          .cancelBtn {
          cursor: pointer;
          position: relative;
          background: transparent;
          border-radius: 4px;
          font-size: 16px;
          border: solid 1px #00818c;
          width: 208px;
          height: 38px;
          right: 8px;
          color: white;
        }

          .returnBtn {
          cursor: pointer;
          position: relative;
          border-radius: 4px;
          width: 208px;
          font-size: 16px;
          height: 38px;
          background: #00818c;
          border: none;
          left: 8px;
          color: white;
        }

          .confirmBtn {
          cursor: pointer;
          position: relative;
          border-radius: 4px;
          width: 208px;
          font-size: 16px;
          height: 38px;
          background: #00818c;
          border: none;
          left: 8px;
          color: white;
        }


          .allIcons {
          display: inline-flex;
          position: relative;
          top: 72px;
          width: 840px;
          height: 167px;
        }

          .modal {
          display: block;
          width: 840px;
          height: 490px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.5);
          background-color: #2b303c;
        }

          .title {
          height: 60px;
          line-height: 60px;
          padding-left: 21px;
          background-color: #1f1f2c;
          color: white;
          font-weight: bold;
          letter-spacing: 1.1px;
          font-size: 30px;

          span:nth-of-type(2) {
          position: absolute;
          left: 655px;
          color: #6c7f9c;
          font-weight: 300;
          letter-spacing: 0.9px;
        }
        }

          @keyframes first {
          0 % {opacity: 1;}
          10%  {opacity: 0.9;}
          20%  {opacity: 0.8;}
          30%  {opacity: 0.7;}
          40%  {opacity: 0.6;}
          50%  {opacity: 0.5;}
          60%  {opacity: 0.4;}
          70%  {opacity: 0.3;}
          80%  {opacity: 0.2;}
          90%  {opacity: 0.2;}
          100% {opacity: 0.2;}
        }

          @keyframes second {
          0 % {opacity: 0.2;}
          10%  {opacity: 0.2;}
          20%  {opacity: 1;}
          30%  {opacity: 0.9;}
          40%  {opacity: 0.8;}
          50%  {opacity: 0.7;}
          60%  {opacity: 0.6;}
          70%  {opacity: 0.5;}
          80%  {opacity: 0.4;}
          90%  {opacity: 0.3;}
          100% {opacity: 0.2;}
        }

          @keyframes third {
          0 % {opacity: 0.2;}
          10%  {opacity: 0.2;}
          20%  {opacity: 0.2;}
          30%  {opacity: 0.2;}
          40%  {opacity: 1;}
          50%  {opacity: 0.9;}
          60%  {opacity: 0.8;}
          70%  {opacity: 0.7;}
          80%  {opacity: 0.6;}
          90%  {opacity: 0.5;}
          100% {opacity: 0.4;}
        }

          @keyframes fourth {
          0 % {opacity: 0.2;}
          10%  {opacity: 0.2;}
          20%  {opacity: 0.2;}
          30%  {opacity: 0.2;}
          40%  {opacity: 0.2;}
          50%  {opacity: 0.2;}
          60%  {opacity: 1;}
          70%  {opacity: 0.9;}
          80%  {opacity: 0.8;}
          90%  {opacity: 0.7;}
          100% {opacity: 0.6;}
        }

          @keyframes fifth {
          0 % {opacity: 0.2;}
          10%  {opacity: 0.2;}
          20%  {opacity: 0.2;}
          30%  {opacity: 0.2;}
          40%  {opacity: 0.2;}
          50%  {opacity: 0.2;}
          60%  {opacity: 0.2;}
          70%  {opacity: 0.2;}
          80%  {opacity: 1;}
          90%  {opacity: 0.9;}
          100% {opacity: 0.8;}
        }

          @keyframes sixth {
          0 % {opacity: 0.2;}
          10%  {opacity: 0.2;}
          20%  {opacity: 0.2;}
          30%  {opacity: 0.2;}
          40%  {opacity: 0.2;}
          50%  {opacity: 0.2;}
          60%  {opacity: 0.2;}
          70%  {opacity: 0.2;}
          80%  {opacity: 0.2;}
          90%  {opacity: 0.2;}
          100% {opacity: 1;}
        }

          .arrowGroup {
          position: relative;
          display: inline-flex;
          top: 13px;
          left: 140px;
          width: 300px;

          img:nth-of-type(1) {
          animation: infinite;
          animation-duration: 1s;
          animation-name: first;
        }

          img:nth-of-type(2) {
          animation: infinite;
          animation-duration: 1s;
          animation-name: second;
        }

          img:nth-of-type(3) {
          animation: infinite;
          animation-duration: 1s;
          animation-name: third;
        }

          img:nth-of-type(4) {
          animation: infinite;
          animation-duration: 1s;
          animation-name: fourth;
        }

          img:nth-of-type(5) {
          animation: infinite;
          animation-duration: 1s;
          animation-name: fifth;
        }

          img:nth-of-type(6) {
          animation: infinite;
          animation-duration: 1s;
          animation-name: sixth;
        }
        }

          #flameIcon {
          left: 100px;
          position: relative;
        }

          #unicorn {
          position: relative;
          left: 155px;
        }

          .modalText {
          position: relative;
          font-size: 32px;
          color: #d4d6db;
          font-weight: 300;
          width: 100%;
          text-align: center;
          top: 130px;
        }

          #unicornConfirm {
          position: relative;
          width: 840px;
          bottom: 40px;
        }

          .confirmText {
          font-size: 24px;
          color: #eaf3ff;
          top: 308px;
          left: 172px;
          position: absolute;
          text-align: center;
        }
        
        .unassignedMessage {
          position: relative;
          display: block;
          text-align: center;
          font-size: 24px;
          width: 840px;
          letter-spacing: .86px;
          color:#eaf3ff;
          top:16px;
        }
        
        .unassignedImages {
          position: relative;
          height: 176px;
          width: 815px;
          background-color: #1f1f2c;
          display: block;
          border-radius: 2px;
          left: 13px;
          overflow-y: auto;
          top: 35px;
          padding-top: 18px;
        }
        
        .unassignedCallout {
          font-size: 16px;
          color: #d4d6db;
          margin-left: 13px;
          padding-bottom: 16px;
          
          img {
          margin-right: 12px;
          }
        }
        
        .continueText {
          color: #eaf3ff;
          font-size: 24px;
          position: relative;
          display: block;
          text-align: center;
          top: 50px;
        }
        
        .buttons {
          position: relative;
          display: block;
          top: 75px;
          left: 198px;
        }
        
        #goBack {
          border: solid 1px #15deec;
        }
`);