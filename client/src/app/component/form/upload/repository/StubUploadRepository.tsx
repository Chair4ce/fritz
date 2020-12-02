import { UploadRepository } from './UploadRepository';
import { UploadModel } from '../UploadModel';
import { StatusModel } from '../../status/StatusModel';

export class StubUploadRepository implements UploadRepository {
  upload(data: any): Promise<UploadModel> {
    return Promise.resolve(data);
  }

  status(): Promise<StatusModel> {
    return Promise.resolve(new StatusModel('pending', ['file1', 'file2'], ['', ''], 0, 2, '', '', '', ''));
  }
}