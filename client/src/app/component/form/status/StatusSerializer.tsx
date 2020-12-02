import { Serializer } from '../../../../utils/Serializer';
import { StatusModel } from './StatusModel';

export class StatusSerializer implements Serializer<StatusModel> {
  serialize(item: StatusModel): any {
    return {
      status: item.status,
      files: item.files,
      times: item.times,
      progress: item.progress,
      total: item.total,
      date: item.date,
      op: item.op,
      callsign: item.callsign,
      releasability: item.releasability
    };
  }

  deserialize(item: any): StatusModel {
    return new StatusModel(
      item.status,
      item.files,
      item.times,
      item.progress,
      item.total,
      item.date,
      item.op,
      item.callsign,
      item.releasability
    );
  }
}