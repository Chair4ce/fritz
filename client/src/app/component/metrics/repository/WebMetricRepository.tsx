import { MetricRepository } from './MetricRepository';
import { MetricSerializer } from '../MetricSerializer';
import { HTTPClient } from '../../../../utils/HTTPClient';
import { MetricModel } from '../MetricModel';

export class WebMetricRepository implements MetricRepository {
  private metricsSerializer = new MetricSerializer();

  constructor(private client: HTTPClient) {
  }

  async findAll(): Promise<MetricModel[]> {
    const json = await this.client.getJSON('/api/metrics');
    return json.map((obj: any) => {
      return this.metricsSerializer.deserialize(obj);
    });
  }

  async create(metric: MetricModel): Promise<MetricModel> {
    const body = JSON.stringify(this.metricsSerializer.serialize(metric));
    const json = await this.client.postJSON('/api/metrics', body);
    return this.metricsSerializer.deserialize(json);
  }

  async update(metric: MetricModel): Promise<MetricModel> {
    const body = JSON.stringify(this.metricsSerializer.serialize(metric));
    const json = await this.client.putJSON('/api/metrics', body);
    return this.metricsSerializer.deserialize(json);
  }
}