import { HTTPClient } from '../../../../../utils/HTTPClient';
import { UploadRepository } from './UploadRepository';
import { UploadSerializer } from '../UploadSerializer';
import { UploadModel } from '../UploadModel';
import { StatusModel } from '../../status/StatusModel';
import { StatusSerializer } from '../../status/StatusSerializer';

export class WebUploadRepository implements UploadRepository {
  private uploadSerializer = new UploadSerializer();
  private statusSerializer = new StatusSerializer();

  constructor(private client: HTTPClient) {
  }

  async upload(data: any): Promise<UploadModel> {
    const json = await this.client.postFile(
      '/api/upload',
      data);
    return this.uploadSerializer.deserialize(json);
  }

  async status(): Promise<StatusModel> {
    const json = await this.client.getJSON(
      '/api/upload/status'
    );
    return this.statusSerializer.deserialize(json);
  }
}