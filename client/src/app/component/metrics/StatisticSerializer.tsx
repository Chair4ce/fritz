import { Serializer } from '../../../utils/Serializer';
import { StatisticModel } from './StatisticModel';

export class StatisticSerializer implements Serializer<StatisticModel> {
  serialize(item: StatisticModel): {} {
    return {
      uid: item.uid,
      timesUsed: item.timesUsed
    };
  }

  deserialize(item: any): StatisticModel {
    return new StatisticModel(
      item.uid,
      item.timesUsed
    );
  }
}