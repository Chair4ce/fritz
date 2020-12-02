import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Header } from './Header';
import { StyledClassificationBanner } from '../classification/ClassificationBanner';
import { StyledUnicornContainer } from './UnicornContainer';

describe('Header', () => {
  let subject: ShallowWrapper;
  let classificationStore: any;
  let classificationActions: any;

  beforeEach(() => {

    classificationStore = {
      classification: 'UNCLASS'
    };

    classificationActions = {
      initializeStore: jest.fn()
    };

    subject = shallow(
      <Header
        classificationStore={classificationStore}
        classificationActions={classificationActions}
      />
    );
  });

  it('should contain a classification banner', () => {
    expect(subject.find(StyledClassificationBanner).exists()).toBeTruthy();
  });

  it('should contain a fritz header', () => {
    expect(subject.find('.logo').exists()).toBeTruthy();
  });

  it('should have unicorn container', () => {
    expect(subject.find(StyledUnicornContainer).exists()).toBeTruthy();
  });
});