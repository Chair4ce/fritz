import { StatisticModel } from '../StatisticModel';

export interface StatisticRepository {
  findAll(): Promise<StatisticModel[]>;
  createOrUpdate(stat: StatisticModel): Promise<void>;
}