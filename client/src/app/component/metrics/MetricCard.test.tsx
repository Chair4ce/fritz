import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MetricCard } from './MetricCard';

describe('MetricCard', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <MetricCard
        title="test Metric"
        icon="test Src"
      >
        <div className={'.child1'}/>
        <div className={'.child2'}/>
      </MetricCard>
    );
  });

  it('should display a title for the card', () => {
    expect(subject.text()).toBe('test Metric');
  });

  it('should render children', () => {
    expect(subject.find('.child1').exists).toBeTruthy();
    expect(subject.find('.child2').exists).toBeTruthy();
  });

  it('should render an icon', () => {
    expect(subject.find('img').prop('src')).toEqual('test Src');
  });
});