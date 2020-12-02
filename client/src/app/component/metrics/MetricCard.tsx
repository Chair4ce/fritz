import * as React from 'react';
import { observer } from 'mobx-react';
import { styled } from '../../../themes/default';

interface Props {
  title: string;
  children?: any;
  className?: string;
  icon: string;
}

@observer
export class MetricCard extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className="cardLeft">
          <img src={this.props.icon}/>
          <span className="cardTitle">{this.props.title}</span>
        </div>
        <div className="metricCardSpacer"/>
        <div className="childrenContainer">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export const StyledMetricCard = styled(MetricCard)`
  margin: auto;
  margin-bottom: 34px;
  height: 263px;
  background-color: #2B303c;
  box-shadow: 5px 5px 9px rgba(0, 0, 0, 0.5);
  color: #fff;
  width: 1227px;
  display: inline-flex;
  
  .cardTitle {
    width: 200px;
    display: block;
    font-size: 36px;
    font-weight: bold;
    letter-spacing: -0.2px;
    color: #d4d6db;
  }
  
  .cardLeft {
    margin-top: auto;
    margin-bottom: auto;
    height: 185px;    
    position: relative;
    margin-left: 27px;
    display: inline-block;
  }
  
  .metricCardSpacer {
    display: inline-block;
    width: 2px;
    background-color: #818a91;
    height: 224px;
    margin-right: 34px;
    position: relative;
    top: 18px;
  }
  
  .childrenContainer {
    display: flex;
    width: 76%;
    position: relative;
    align-items: center;
    justify-content: space-between;
  }
`;