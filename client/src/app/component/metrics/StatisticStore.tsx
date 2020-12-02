import { action, computed, observable } from 'mobx';
import { StatisticModel } from './StatisticModel';
import { StatisticRepository } from './repository/StatisticRepository';

export class StatisticStore {
  @observable private _statistics: StatisticModel[] = [];

  async hydrate(statisticRepository: StatisticRepository) {
    this._statistics = await statisticRepository.findAll();
  }

  @computed
  get statistics(): StatisticModel[] {
    return this._statistics;
  }

  @action.bound
  setStatistics(value: StatisticModel[]) {
    this._statistics = value;
  }
}