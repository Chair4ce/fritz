import { ClassificationRepository } from './ClassificationRepository';
import { ClassificationModel } from '../ClassificationModel';
import { HTTPClient } from '../../../../utils/HTTPClient';
import { ClassificationSerializer } from '../ClassificationSerializer';

export class WebClassificationRepository implements ClassificationRepository {
  private classificationSerializer = new ClassificationSerializer();

  constructor(private client: HTTPClient) {
  }

  async get(): Promise<ClassificationModel> {
    const json = await this.client.getJSON('/api/classification');
    return this.classificationSerializer.deserialize(json);
  }
}