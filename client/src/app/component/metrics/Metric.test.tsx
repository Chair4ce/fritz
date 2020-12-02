import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Metric } from './Metric';

describe('Metric', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {

    subject = shallow(
      <Metric
        title="test Title"
        value="test value"
      />
    );
  });

  it('should display the metric title', () => {
    expect(subject.text()).toContain('test Title');
  });

  it('should display the value', () => {
    expect(subject.text()).toContain('test value');
  });

  it('should display the unit if given', () => {
    expect(subject.text()).not.toContain('%');
    subject = shallow(
      <Metric
        title="test Title"
        value="test value"
        unit="%"
      />
    );
    expect(subject.text()).toContain('%');
  });

  it('should display the difference if given', () => {
    expect(subject.text()).not.toContain('-1');
    subject = shallow(
      <Metric
        title="test Title"
        value="test value"
        unit="%"
        difference="-1"
      />
    );
    expect(subject.text()).toContain('-1');
  });
});