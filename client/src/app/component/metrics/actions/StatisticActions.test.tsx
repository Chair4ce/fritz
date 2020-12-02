import { StubStatisticRepository } from '../repository/StubStatisticRepository';
import { StatisticStore } from '../StatisticStore';
import { StatisticRepository } from '../repository/StatisticRepository';
import { StatisticActions } from './StatisticActions';
import { StatisticModel } from '../StatisticModel';

describe('StatisticActions', () => {
  let subject: StatisticActions;
  let statisticStore: StatisticStore;
  let statisticRepository: StatisticRepository;

  beforeEach(() => {
    statisticRepository = new StubStatisticRepository();
    statisticStore = new StatisticStore();

    subject = new StatisticActions({statisticRepository} as any, {statisticStore} as any);
  });

  it('should hydrate the store', async () => {
    await subject.initialize();
    expect(statisticStore.statistics).toEqual(await statisticRepository.findAll());
  });

  it('should update a statistic on the backend', async () => {
    let stat = new StatisticModel('1', 1);
    let repoSpy = jest.fn();
    statisticRepository.createOrUpdate = repoSpy;

    await subject.createOrUpdate(stat);
    expect(repoSpy).toHaveBeenCalled();
  });
});