import { shallow, ShallowWrapper } from 'enzyme';
import { badLabelCSS, goodCSS } from '../../../themes/default';
import { ValidatingDropdown } from './ValidatingDropdown';
import * as React from 'react';

describe('ValidatingDropdown', () => {
  let subject: ShallowWrapper;

  const invalidate = () => {
    subject = shallow(
      <ValidatingDropdown
        callback={jest.fn()}
        validator={false}
        errorMessage={'errormess'}
        options={[]}
        defaultValue={'default'}
        value={''}
        label={'lableme'}
      />
    );
  };

  beforeEach(() => {
    subject = shallow(
      <ValidatingDropdown
        callback={jest.fn()}
        validator={true}
        errorMessage={'errormess'}
        options={[
          {id: '1', display: 'FOUO'},
          {id: '2', display: 'Test'}
        ]}
        defaultValue={'default'}
        value={''}
        label={'lableme'}
      />
    );
  });

  it('should render bad css when invalidated', () => {
    expect(subject.find('label').props().style).toEqual(goodCSS);
    invalidate();
    expect(subject.find('label').props().style).toEqual(badLabelCSS);
  });

  it('should render an error message when invalid', () => {
    expect(subject.find('.errorMessage').exists()).toBeFalsy();
    invalidate();
    expect(subject.find('.errorMessage').exists()).toBeTruthy();
  });
});