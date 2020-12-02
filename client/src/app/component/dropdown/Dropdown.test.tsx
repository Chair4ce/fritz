import { shallow, ShallowWrapper } from 'enzyme';
import { Dropdown, DropdownOption } from './Dropdown';
import * as React from 'react';
import Mock = jest.Mock;

describe('Dropdown', () => {
  let subject: ShallowWrapper;
  let options: DropdownOption[];
  let callbackSpy: Mock;

  beforeEach(() => {
    options = [
      {id: '1', display: 'opt' + Math.random()},
      {id: '2', display: 'opt' + Math.random()},
      {id: '3', display: 'opt' + Math.random()},
    ];
    callbackSpy = jest.fn();

    subject = shallow(
      <Dropdown
        options={options}
        callback={callbackSpy}
        defaultValue={'Default Test'}
        value={''}
      />
    );
  });

  it('should contain a list of given options', () => {
    expect(subject.find('.dropdown-item').length).toBe(3);
    expect(subject.find('.dropdown-item').at(0).text()).toBe(options[0].display);
    expect(subject.find('.dropdown-item').at(1).text()).toBe(options[1].display);
    expect(subject.find('.dropdown-item').at(2).text()).toBe(options[2].display);
  });

  it('should fire a callback for each option', () => {
    subject.find('.dropdown-item').at(0).simulate('click');
    expect(callbackSpy).toHaveBeenCalledWith(options[0]);
  });

  it('should display the default value when not given a preselected value', () => {
    expect(subject.find('button').at(0).text()).toBe('Default Test');
  });

  it('should display the given value', () => {
    subject = shallow(
      <Dropdown
        options={options}
        callback={callbackSpy}
        defaultValue={'Default Test'}
        value={options[0].display}
      />
    );
    expect(subject.find('button').at(0).text()).toBe(options[0].display);
  });
});