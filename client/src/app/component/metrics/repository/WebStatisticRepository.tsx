import { StatisticRepository } from './StatisticRepository';
import { HTTPClient } from '../../../../utils/HTTPClient';
import { StatisticSerializer } from '../StatisticSerializer';
import { StatisticModel } from '../StatisticModel';

export class WebStatisticRepository implements StatisticRepository {
  private statisticSerializer = new StatisticSerializer();

  constructor(private client: HTTPClient) {
  }

  async findAll(): Promise<StatisticModel[]> {
    const json = await this.client.getJSON('/api/statistics');
    return json.map((obj: any) => {
      return this.statisticSerializer.deserialize(obj);
    });
  }

  async createOrUpdate(stat: StatisticModel): Promise<void> {
    const body = JSON.stringify(this.statisticSerializer.serialize(stat));
    await this.client.postJSON('/api/statistics', body);
    return Promise.resolve();
  }
}