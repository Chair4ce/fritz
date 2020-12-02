import * as React from 'react';
import { observer } from 'mobx-react';
import { styled } from '../../../themes/default';

interface Props {
  title: string;
  value: any;
  unit?: string;
  className?: string;
  difference?: any;
}

@observer
export class Metric extends React.Component<Props> {
  render() {
    return (
      <div
        className={this.props.className}
      >
        <div className={'value'}>
          {this.props.value}
          {this.props.unit!}
        </div>
        <div className={'title'}>
          {this.props.title}
        </div>
        <div className={'difference ' + (this.props.difference > 0 ? 'red' : 'green')}>
          {this.props.difference && '(' + (this.props.difference > 0 ? '+' : '-') + this.props.difference + ' seconds)'}
        </div>
      </div>
    );
  }
}

export const StyledMetric = styled(Metric)`

  max-width: 181px;
  display: inline-block;
  text-align: center;

  .title {
    font-size: 24px;
    color: #6c7f9c;
    letter-spacing: 0.7px;
    font-weight: 100;
  }

  .value {
    font-size: 60px;
    color: #fff;
    letter-spacing: 1.7px;
  }
  
  .difference {
    font-weight: 300;
    font-size: 18px;
    letter-spacing: 0.5px;
  }
  
  .green {
    color: #55d950;
  }

  .red {
    color: #fd3164;
  }

`;