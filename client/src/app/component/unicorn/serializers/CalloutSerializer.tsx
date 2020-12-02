import { Serializer } from '../../../../utils/Serializer';
import { CalloutModel } from '../model/CalloutModel';

export class CalloutSerializer implements Serializer<CalloutModel> {
  serialize(item: CalloutModel): any {
    return {
      name: item.name,
      classification: item.classification,
      releasability: item.releasability,
      activity: item.activity,
      eventId: item.eventId,
      time: item.time
    };
  }

  deserialize(item: any): CalloutModel {
    return new CalloutModel(
      item.name,
      item.classification,
      item.releasability,
      item.activity,
      item.eventId,
      item.activity.match(/\d{4}Z/),
      item.tot
    );
  }
}