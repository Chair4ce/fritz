import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UndoDeleteContainer } from './UndoDeleteContainer';

describe('UndoDeleteContainer', () => {
  let subject: ShallowWrapper;
  let slideModel: any;

  beforeEach(() => {
    slideModel = {
      setDeleted: jest.fn()
    };

    subject = shallow(
      <UndoDeleteContainer
        slideModel={slideModel}
      />
    );
  });

  it('should have an undo delete button that sets deleted to false', () => {
    expect(subject.find('.undoButton').simulate('click'));
    expect(slideModel.deleted).toBeFalsy();
  });
});