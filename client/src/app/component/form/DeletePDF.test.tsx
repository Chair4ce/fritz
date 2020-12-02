import { DeletePDF } from './DeletePDF';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';

describe('DeletePDF', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <DeletePDF
        fileName={'pdfFileName'}
      />
    );
  });

  it('should display the given filename', () => {
    expect(subject.text()).toContain('pdfFileName');
  });
});