import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { DeleteModal } from './DeleteModal';

describe('DeleteModal', () => {
  let subject: ReactWrapper;
  let uploadStore: any;
  let slidesStore: any;
  let uploadActions: any;

  beforeEach(() => {
    uploadStore = {
      setProcessing: jest.fn(),
      setUploaded: jest.fn(),
      setPlaceholder: jest.fn(),
      setTotal: jest.fn(),
      setProgress: jest.fn()
    };

    slidesStore = {
      setSlides: jest.fn()
    };

    uploadActions = {
      clearPoll: jest.fn()
    };

    subject = mount(
      <DeleteModal
        uploadStore={uploadStore}
        slidesStore={slidesStore}
        uploadActions={uploadActions}
      />
    );
  });

  it('should render confirmation dialog, cancel button and delete button', () => {
    expect(subject.find('.modal-body').text()).toContain('Are you sure you want to delete the PDF file');
    expect(subject.find('.btn-primary').exists()).toBeTruthy();
    expect(subject.find('.btn-secondary').exists()).toBeTruthy();
  });

  it('should reset the uploadstore when the delete is confirmed', () => {
    subject.find('.btn-primary').simulate('click');
    expect(uploadStore.setProcessing).toHaveBeenCalledWith(false);
    expect(uploadStore.setUploaded).toHaveBeenCalledWith(false);
    expect(uploadStore.setPlaceholder).toHaveBeenCalledWith(true);
    expect(slidesStore.setSlides).toHaveBeenCalledWith([]);
    expect(uploadActions.clearPoll).toHaveBeenCalled();
    expect(uploadStore.setTotal).toHaveBeenCalledWith(0);
    expect(uploadStore.setProgress).toHaveBeenCalledWith(0);
  });

});