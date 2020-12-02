import { StatisticStore } from '../StatisticStore';
import { StatisticRepository } from '../repository/StatisticRepository';
import { Repositories } from '../../../../utils/Repositories';
import { Stores } from '../../../../utils/Stores';
import { action } from 'mobx';
import { StatisticModel } from '../StatisticModel';

export class StatisticActions {
  private statisticStore: StatisticStore;
  private readonly statisticRepository: StatisticRepository;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.statisticStore = stores.statisticStore!;
    this.statisticRepository = repositories.statisticRepository!;
  }

  @action.bound
  async initialize() {
    await this.statisticStore.hydrate(this.statisticRepository);
  }

  async createOrUpdate(stat: StatisticModel) {
    await this.statisticRepository.createOrUpdate(stat);
  }
}