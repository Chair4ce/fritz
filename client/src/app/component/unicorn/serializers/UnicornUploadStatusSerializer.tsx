import { UnicornUploadStatusModel } from '../model/UnicornUploadStatusModel';
import { Serializer } from '../../../../utils/Serializer';

export class UnicornUploadStatusSerializer implements Serializer<UnicornUploadStatusModel> {
  serialize(item: UnicornUploadStatusModel): any {
    return {
      successfulUpload: item.successfulUpload
    };
  }

  deserialize(item: any): UnicornUploadStatusModel {
    return new UnicornUploadStatusModel(
      item.successfulUpload
    );
  }
}