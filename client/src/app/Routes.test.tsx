import * as React from 'react';
import { shallow } from 'enzyme';
import { Routes } from './Routes';
import { Route, Switch } from 'react-router';

describe('Routes', () => {
  const subject = shallow(<Routes/>);

  it('should support all routes', () => {
    expect(subject.find(Switch).children().length).toBe(2);
    expect(subject.find(Route).at(0).prop('path')).toBe('/');
  });
});