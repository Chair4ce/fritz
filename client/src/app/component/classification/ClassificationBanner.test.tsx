import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { ClassificationBanner } from './ClassificationBanner';

describe('ClassificationBanner', () => {
  let subject: ReactWrapper;
  let classification: string = 'UNCLASSIFIED';

  beforeEach(() => {
    subject = mount(<ClassificationBanner classification={classification}/>);
  });

  it('should render a green background for UNCLASSIFIED', () => {
    expect(subject.html()).toContain('green');
    expect(subject.text()).toBe('UNCLASSIFIED');
  });

  it('should render a red background with text for secret', () => {
    classification = 'DYNAMIC CLASSIFICATION UP TO SECRET//NOFORN';
    subject = mount(<ClassificationBanner classification={classification}/>);
    expect(subject.html()).toContain('red');
    expect(subject.text()).toBe('DYNAMIC CLASSIFICATION UP TO SECRET//NOFORN');
  });

  it('should render a yellow background with text for top secret', () => {
    classification = 'DYNAMIC CLASSIFICATION UP TO TOP SECRET//SI/TK//NOFORN';
    subject = mount(<ClassificationBanner classification={classification}/>);
    expect(subject.html()).toContain('yellow');
    expect(subject.text()).toBe('DYNAMIC CLASSIFICATION UP TO TOP SECRET//SI/TK//NOFORN');
  });
});