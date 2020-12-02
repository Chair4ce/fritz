import * as React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { UploadContainer } from './UploadContainer';
import { UploadModel } from '../UploadModel';
import { UploadStore } from '../UploadStore';
import Mock = jest.Mock;

describe('UploadContainer', () => {
  let subject: ReactWrapper;
  let uploadActions: any;
  let uploadStore: any;
  let helpSpy: Mock;

  beforeEach(() => {
    helpSpy = jest.fn();

    uploadActions = {
      upload: () => {
        return new UploadModel('chucknorris.pdf');
      }
    };
    uploadStore = new UploadStore();
    subject = mount(
      <UploadContainer
        help={helpSpy}
        uploadActions={uploadActions}
        uploadStore={uploadStore}
      />
    );
  });

  it('should contain an upload box and button', () => {
    expect(subject.find('#browseButton').exists()).toBeTruthy();
  });

  it('should trigger given function on help click', () => {
    subject.find('.helpIcon').simulate('click');
    expect(helpSpy).toHaveBeenCalled();
  });
});