import { Serializer } from '../../../../utils/Serializer';
import { UnicornUploadModel } from '../model/UnicornUploadModel';

export class UnicornUploadSerializer implements  Serializer<UnicornUploadModel> {
  serialize(item: UnicornUploadModel): any {
    return {
      productName: item.productName,
      missionId: item.missionId,
      targetEventId: item.targetEventId,
      classificationId: item.classificationId,
      releasabilityId: item.releasabilityId,
      personnelId: item.personnelId,
      isrRoleId: item.isrRoleId,
      endFilePath: item.endFilePath,
      uploadType: item.uploadType,
      uploadedFile: item.uploadedFile,
      fileName: item.fileName
    };
  }

  deserialize(item: any): UnicornUploadModel {
    return item;
  }
}