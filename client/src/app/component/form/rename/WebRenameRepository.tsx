import { RenameRepository } from './RenameRepository';
import { HTTPClient } from '../../../../utils/HTTPClient';

export class WebRenameRepository implements RenameRepository {

  constructor(private client: HTTPClient) {
  }

  async rename(data: any, filename: string): Promise<void> {
    const body = JSON.stringify(data);
    await this.client.postAndDownload(
      '/api/rename',
      body,
      filename
    );
    return Promise.resolve();
  }
}