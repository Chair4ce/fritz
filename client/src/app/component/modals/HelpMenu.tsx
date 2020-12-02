import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { SlidesStore } from '../slides/store/SlidesStore';
import { styled } from '../../../themes/default';

const helpStep1 = require('../../../icon/HelpStep1.svg');
const helpStep2 = require('../../../icon/HelpStep2.svg');
const RightArrow = require('../../../icon/RightArrow.svg');
const ExitHelpMenu = require('../../../icon/ExitHelpMenu.svg');

interface Props {
  exit: () => void;
  className?: string;
  slidesStore?: SlidesStore;
}

@observer
export class HelpMenu extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div
          id="modal"
        >
          <div className="helpTitle">
            <span>Your product must be uploaded in PDF format</span>
            <span>Follow the instructions below to save your Powerpoint file as a PDF.</span>
          </div>
          <img
            className="closeHelp"
            src={ExitHelpMenu}
            onClick={() => {
              this.props.exit();
            }}
          />
          <div className="imageInstructions">
            <img
              className="helpStep1"
              src={helpStep1}
            />
            <img
              className="rightArrow"
              src={RightArrow}
            />
            <img
              className="helpStep2"
              src={helpStep2}
            />
          </div>
          <div className="step1">
            <span>STEP 1</span>
            <span>Select “File” at the top toolbar area of Powerpoint.</span>
          </div>
          <div className="step2">
            <span>STEP 2</span>
            <span>Select “Save as Adobe PDF” on the left-hand pane. Click “Yes” in the dialog box and choose
            a save location. </span>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledHelpMenu = inject('slidesStore')(styled(HelpMenu)`
  background: rgba(0, 0, 0, 0.5);
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  position: fixed;
  z-index: 75;

#modal {
  position: absolute;
  display: block;
  width: 1110px;
  height: 600px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 4px 4px 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #1b1f2a;
}

.helpTitle {
  margin-left:20px;
  display: block;
}

.helpTitle > span:nth-of-type(1) {
  color: #d4d6db;
  font-size: 24px;
  font-weight: normal;
  margin-top: 16px;
}

.helpTitle > span:nth-of-type(2) {
  color: #6c7f9c;
  font-size: 16px;
  font-weight: 100;
  display: block;
}

.closeHelp {
  display: inline-block;
  position: absolute;
  right: 15px;
  top: 16px;
  cursor: pointer;
}

.helpStep1 {
  display: inline-block;
  position: absolute;
  left: 60px;
  top: 132px;
}

.rightArrow {
  display: inline-block;
  position: absolute;
  right: 520px;
  top: 273px;
}

.helpStep2 {
  display: inline-block;
  position: absolute;
  top: 132px;
  right: 60px;
}

.step1 > span:nth-of-type(1) {
  color: #6c7f9c;
  font-size: 24px;
  left: 60px;
  display: inline-block;
  position: absolute;
  top: 462px;
}

.step1 > span:nth-of-type(2) {
  color: #d4d6db;
  top: 498px;
  left: 60px;
  display: inline-block;
  position: absolute;
  font-size: 16px;
}

.step2 > span:nth-of-type(1) {
  color: #6c7f9c;
  font-size: 24px;
  left: 652px;
  display: inline-block;
  position: absolute;
  top: 462px;
}

.step2 > span:nth-of-type(2) {
  color: #d4d6db;
  top: 498px;
  left: 652px;
  display: inline-block;
  position: absolute;
  font-size: 16px;
  width: 400px;
  line-height: 20px;
}
`);