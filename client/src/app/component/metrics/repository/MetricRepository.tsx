import { MetricModel } from '../MetricModel';

export interface MetricRepository {
  findAll(): Promise<MetricModel[]>;
  create(metric: MetricModel): Promise<MetricModel>;
  update(metric: MetricModel): Promise<MetricModel>;
}