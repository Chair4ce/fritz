import { Serializer } from '../../../../utils/Serializer';
import { MissionModel } from '../model/MissionModel';

export class MissionSerializer implements Serializer<MissionModel> {
  serialize(item: MissionModel): any {
    return {
      id: item.id,
      startTime: item.startTime,
      callsign: item.callsign,
      description: item.description,
      status: item.status,
      org: item.org,
      platform: item.platform
    };
  }

  deserialize(item: any): MissionModel {
    return new MissionModel(
      item.id,
      item.startTime,
      item.callsign,
      item.description,
      item.status,
      item.org,
      item.platform
    );
  }
}