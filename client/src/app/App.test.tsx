import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { App, WrappedRoutes } from './App';
import { StyledHeader } from './component/header/Header';

describe('App', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(<App/>);
  });

  it('should render wrapped routes', () => {
    expect(subject.find(WrappedRoutes).exists()).toBeTruthy();
  });

  it('should render the application header', () => {
    expect(subject.find(StyledHeader).exists()).toBeTruthy();
  });
});