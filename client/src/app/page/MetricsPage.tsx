import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { StyledMetricsTable } from '../component/metrics/table/MetricsTable';
import { MetricActions } from '../component/metrics/actions/MetricActions';
import { MetricStore } from '../component/metrics/MetricStore';
import { ClockIcon } from '../../icon/ClockIcon';
import { StyledMetricCard } from '../component/metrics/MetricCard';
import { StyledMetric } from '../component/metrics/Metric';
import { styled } from '../../themes/default';

const unicornIcon = require('../../icon/UnicornIcon.svg');
const actionTimesIcon = require('../../icon/ActionTimesIcon.svg');
const userActionsIcon = require('../../icon/UserActionsIcon.svg');

interface Props {
  className?: string;
  metricActions?: MetricActions;
  metricStore?: MetricStore;
}

@observer
export class MetricsPage extends React.Component<Props> {
  async componentDidMount() {
    await this.props.metricActions!.initializeStores();
    this.props.metricActions!.calculateAllAverages();
  }

  async sortSelected(e: any) {
    await this.props.metricActions!.filterMetrics(e.target.value);
  }

  handleToggle(active: string, inactive: string, activeButton: string, inactiveButton: string) {
    let activeTab = document.getElementById(active);
    let inactiveTab = document.getElementById(inactive);
    let aButton = document.getElementById(activeButton);
    let iButton = document.getElementById(inactiveButton);
    activeTab!.style.display = 'block';
    inactiveTab!.style.display = 'none';
    aButton!.style.backgroundColor = '#0E5F66';
    iButton!.style.backgroundColor = '#00818C';
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <nav
          className="nav navbar-default"
        >
          <div id="bannerTitle">
            <a>
              Metrics
            </a>
          </div>
          <div
            className="btn-group"
            role="group"
            aria-label="..."
          >
            <button
              id="dashBoardButton"
              type="button"
              className="btn btn-default text-white shadow"
              onClick={() => this.handleToggle('tab1', 'tab2', 'dashBoardButton', 'activityLogButton')}
            >
              Dashboard
            </button>
            <button
              id="activityLogButton"
              type="button"
              className="btn text-white shadow"
              onClick={() => this.handleToggle('tab2', 'tab1', 'activityLogButton', 'dashBoardButton')}
            >
              Activity Log
            </button>
          </div>
          <div className="secondary-text">
            <div className="sortSection">
              <div className="clock">
                <ClockIcon/>
              </div>
              Time Frame:
              <select
                defaultValue="All Time"
                className="sortSelector"
                onChange={async (e) => {
                  await this.sortSelected(e);
                }}
              >
                <option value={9007199254740991}>All Time</option>
                <option value={60 * 60 * 24}>Last 24 Hours</option>
                <option value={60 * 60 * 24 * 3}>Last 72 Hours</option>
                <option value={60 * 60 * 24 * 7}>Last 7 Days</option>
                <option value={60 * 60 * 24 * 30}>Last 30 Days</option>
              </select>
            </div>
          </div>
          <div className="parentExportMetrics">
            <button
              className="exportMetrics"
              onClick={() => this.props.metricActions!.exportMetrics()}
            >
              Export as .CSV
            </button>
          </div>
        </nav>
        <div id="tab1">
          <div className="metricsContainer">
            <StyledMetricCard
              title="Action Times"
              icon={actionTimesIcon}
            >
              <StyledMetric
                title="Avg. Workflow Time"
                value={this.props.metricStore!.averageWorkflow}
                difference={this.props.metricActions!.calculateAverageDifference('workflow')}
                unit="s"
              />
              <StyledMetric
                title="Avg. Upload Time"
                value={this.props.metricStore!.averageUpload}
                difference={this.props.metricActions!.calculateAverageDifference('upload')}
                unit="s"
              />
              <StyledMetric
                title="Avg. Rename Time"
                value={this.props.metricStore!.averageRename}
                difference={this.props.metricActions!.calculateAverageDifference('rename')}
                unit="s"
              />
              <StyledMetric
                title="Avg. Download Time"
                value={this.props.metricStore!.averageDownload}
                difference={this.props.metricActions!.calculateAverageDifference('download')}
                unit="s"
              />
              <StyledMetric
                title="Avg. Conversion Time"
                value={this.props.metricStore!.averageConversion}
                difference={this.props.metricActions!.calculateAverageDifference('conversion')}
                unit="s"
              />
            </StyledMetricCard>
            <StyledMetricCard
              title="User Actions"
              icon={userActionsIcon}
            >
              <StyledMetric
                title="Powerpoint Slides Converted"
                value={this.props.metricActions!.countConverted()}
              />
              <StyledMetric
                title="Zip Files Downloaded"
                value={this.props.metricActions!.countUserAction('Download')}
              />
              <StyledMetric
                title="Powerpoints Uploaded"
                value={this.props.metricActions!.countUserAction('Upload')}
              />
              <StyledMetric
                title="JPEGs Deleted"
                value={this.props.metricActions!.countUserAction('Delete JPG')}
              />
            </StyledMetricCard>
            <StyledMetricCard
              title="UNICORN Metrics"
              icon={unicornIcon}
              className={'verticalCard'}
            >
              <StyledMetric
                title="Upload Success Rate"
                value={Math.round(this.props.metricStore!.successRate)}
                unit="%"
              />
              <StyledMetric
                title="Upload Attempts"
                value={this.props.metricStore!.uploadToUnicornAttempts}
              />
              <StyledMetric
                title="Products Uploaded"
                value={this.props.metricStore!.successFulUniqueProductUploads}
              />
            </StyledMetricCard>
          </div>
        </div>
        <div id="tab2">
          <StyledMetricsTable/>
        </div>
      </div>
    );
  }
}

export const StyledMetricsPage = inject(
  'metricActions',
  'classificationStore',
  'classificationActions',
  'metricStore'
)
(styled(MetricsPage)`
width: 100%;
height: 90vh;
top: 0;
position: relative;

  #bannerTitle {
    width: 200px;
    display: inline-block;
  }
  
  a {
    line-height: 1.8;
    margin-left: 28px;
  }
  
  button {
    font-size: 18px;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
    color: #15DEEC;
  }
  
  nav {
    display: inline-block;
    width: 100%;
    font-size: 34px;
    color: #fff;
    background: #363E4A;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    height: 63px;
  }
  
  .secondary-text {
    font-size: 20px;
    display: inline-block;
    right: 0;
    color: #93A7C3;
    margin-right: 20px;
    width: 300px;
    margin: 17px;
    float: right;
  }
  
  .clock {
    display: inline-block;
    position: relative;
    right: 10px;
    bottom: 2px;
  }
  
  .sortSelector {
    margin-left: 10px;
  }
  
  .btn:focus {
    outline: none !important;
    box-shadow: none;
  }
  
  .btn-group {
    display: inline-block;
    height: 50px;
    vertical-align: top;
    left: 50%;
    position: absolute;
    transform: translate(-50%, 0);
  }

  #dashBoardButton {
    background: #0E5F66;
  }
  
  #activityLogButton {
    background: #00818C;
  }
  
  .exportMetrics {
    right: 21px;
    top: 72px;
    position: absolute;
  }
 
  #tab2 {
    display: none;
    height: 100%;
  }
  
  #tab1 {
    margin-top: 100px;
  }
  
  #activityLogButton {
    border-radius: 0 4px 4px 0;
  }
  
  #dashBoardButton {
    border-radius: 4px 0 0 4px;
  }
  
  .metricsContainer {
    position: relative;
    height: 560px;
    width: 1518px;
    margin-left: 66px;

  }
  
  .verticalCard {
    position: absolute;
    right: 0;
    top: 0;
    width: 263px;
    height: 560px;
    
    img {
      width: 55px;
      height: 64px;
      display: inline-block;
      position: relative;
      bottom: 40px;
      margin-right: 21px;
    }
    
    .cardTitle {
      display: inline-block;
      white-space: normal;
      font-size: 34px;
    }
    
    .cardLeft {
      margin-top: 17px;
      margin-bottom: 0px;
      margin-left: 18px;
      width: 263px;
      white-space: nowrap;
    }
    
    .metricCardSpacer {
      display: none;
    }
    
    .childrenContainer {
      right: 245px;
      display: block;
      top: 170px;
      width: 205px;
      
      > div {
        margin-bottom: 15px;
      }
      
      .value {
        font-size: 48px;
      }
      
      .title {
        font-size: 20px;
        width: 205px;
        position: relative;
        right: 10px;
      }
    }
  }
`);
