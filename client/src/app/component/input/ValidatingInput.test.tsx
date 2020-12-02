import { ValidatingInput } from './ValidatingInput';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import Mock = jest.Mock;
import { badInputCSS, badLabelCSS, goodCSS } from '../../../themes/default';

describe('ValidatingInput', () => {
  let subject: ShallowWrapper;
  let onChangeSpy: Mock;
  let isValid: boolean;

  const invalidate = () => {
    isValid = false;
    subject = shallow(
      <ValidatingInput
        id={'myId'}
        label={'label'}
        placeholder={'placeholder'}
        listener={onChangeSpy}
        validator={isValid}
        errorMessage={'my error message'}
      />
    );
  };

  beforeEach(() => {
    onChangeSpy = jest.fn();
    isValid = true;

    subject = shallow(
      <ValidatingInput
        id={'myId'}
        label={'label'}
        placeholder={'placeholder'}
        listener={onChangeSpy}
        validator={isValid}
        errorMessage={'my error message'}
      />
    );
  });

  it('should display placeholder text when no additional input is given', () => {
    expect(subject.find('input').prop('placeholder')).toEqual('placeholder');
  });

  it('should send changes the text to display updated info', () => {
    subject.find('input').simulate('change', {target: {value: 'change text'}});
    expect(onChangeSpy).toHaveBeenCalledWith({target: {value: 'change text'}});
  });

  it('should display error message on bad input', () => {
    expect(subject.find('.errorMessage').exists()).toBeFalsy();
    invalidate();
    expect(subject.find('.errorMessage').exists()).toBeTruthy();
    expect(subject.text()).toContain('my error message');
  });

  it('should have a label', () => {
    expect(subject.find('label').exists()).toBeTruthy();
    expect(subject.text()).toContain('label');
  });

  it('should change styles if invalidated', () => {
    expect(subject.find('label').props().style).toEqual(goodCSS);
    expect(subject.find('input').props().style).toEqual(goodCSS);
    invalidate();
    expect(subject.find('label').props().style).toEqual(badLabelCSS);
    expect(subject.find('input').props().style).toEqual(badInputCSS);
  });

  it('should default input type to text', () => {
    expect(subject.find('input').props().type).toEqual('text');
  });

  it('should change input type to date given prop of date', () => {
    subject = shallow(
      <ValidatingInput
        id={'myId'}
        label={'label'}
        placeholder={'placeholder'}
        listener={onChangeSpy}
        validator={isValid}
        errorMessage={'my error message'}
        type={'date'}
      />
    );
    expect(subject.find('input').props().type).toEqual('date');
  });

  it('should change exited to true when the onBlur event is fired', () => {
    subject = shallow(
      <ValidatingInput
        id={'myId'}
        label={'label'}
        placeholder={'placeholder'}
        listener={onChangeSpy}
        validator={false}
        errorMessage={'my error message'}
        onlyValidateOnExit={true}
      />
    );
    expect(subject.find('.errorMessage').exists()).toBeFalsy();
    subject.find('input').simulate('blur');
    expect(subject.find('.errorMessage').exists()).toBeTruthy();
  });
});
