import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { UnicornStore } from '../store/UnicornStore';
import { MissionModel } from '../model/MissionModel';
import { UnicornActions } from '../actions/UnicornActions';
import { UploadActions } from '../../form/upload/actions/UploadActions';
import { SlidesActions } from '../../slides/actions/SlidesActions';
import { styled } from '../../../../themes/default';

interface Props {
  className?: string;
  unicornStore?: UnicornStore;
  unicornActions?: UnicornActions;
  mission: MissionModel;
  uploadActions?: UploadActions;
  slidesActions?: SlidesActions;
}

@observer
export class Mission extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className + ' missionRow ' + this.props.mission.id}
        onClick={async () => {
          this.props.slidesActions!.updateMission(this.props.mission);
          this.props.slidesActions!.compareCallsigns();
          this.props.slidesActions!.resetSlides();
          if (navigator.userAgent.toLowerCase().indexOf('electron') === -1) {
            await this.props.unicornActions!.getCallouts(this.props.mission.id);
          }
        }}
      >
        <div className="content">
          <span className="callsign">{this.props.mission.callsign}</span>
          <span className="startTime">{this.props.mission.startTime.substring(0, 10)}</span>
          <span
            className="selectText"
          >
          Select
          </span>
        </div>
      </div>
    );
  }
}

export const StyledMission = inject('unicornStore', 'unicornActions', 'uploadActions', 'slidesActions')(styled(Mission)`
width: 100%;
transition: background-color 200ms;

:hover {
  background-color:  #1F1F2C;
}

.content {
  cursor:  pointer;
  margin: auto;
  width: 807px;
  height: 66px;
  line-height: 66px;
  font-size: 24px;
  color: #fff;
  border-bottom: 1px solid #1f1f2c;
}

.selectText {
  font-size: 16px;
  color: #15deec;
  display: inline-block;
  position: relative;
  left: 400px;
}

span:first-of-type {
  display:  inline-block;
  white-space: nowrap;
  margin-left: 5px;
  width: 70px;
  overflow: visible;
}

span:nth-of-type(2) {
  margin-left:  125px;
}

`);