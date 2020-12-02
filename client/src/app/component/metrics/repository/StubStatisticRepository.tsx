import { StatisticRepository } from './StatisticRepository';
import { StatisticModel } from '../StatisticModel';

export class StubStatisticRepository implements StatisticRepository {

  findAll(): Promise<StatisticModel[]> {
    return Promise.resolve([
      new StatisticModel('1', 2),
      new StatisticModel('2', 3),
      new StatisticModel('3', 4)
    ]);
  }

  createOrUpdate(stat: StatisticModel): Promise<void> {
    return Promise.resolve();
  }
}