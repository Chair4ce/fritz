import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { FormAndSlideCards } from './FormAndSlideCards';
import { UploadStore } from '../form/upload/UploadStore';
import { StyledFormContainer } from '../form/FormContainer';
import { StyledSlideCardContainer } from '../slides/container/SlideCardContainer';
import { UnicornStore } from '../unicorn/store/UnicornStore';

describe('FormAndSlideCards', () => {
  let subject: ShallowWrapper;
  let uploadStore: UploadStore;
  let unicornStore: UnicornStore;

  beforeEach(() => {

    uploadStore = new UploadStore();
    unicornStore = new UnicornStore();

    uploadStore.setUploaded(true);
    uploadStore.setFileName('fileName');

    subject = shallow(
      <FormAndSlideCards
        unicornStore={unicornStore}
        uploadStore={uploadStore}
      />
    );
  });

  it('should contain a form container', () => {
    expect(subject.find(StyledFormContainer).exists).toBeTruthy();
  });

  it('should contain a slides container', () => {
    expect(subject.find(StyledSlideCardContainer).exists).toBeTruthy();
  });
});