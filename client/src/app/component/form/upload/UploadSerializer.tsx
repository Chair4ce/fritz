import { UploadModel } from './UploadModel';
import { Serializer } from '../../../../utils/Serializer';

export class UploadSerializer implements Serializer<UploadModel> {
  serialize(item: UploadModel): any {
    return {
      file: item.file,
      hash: item.hash
    };
  }

  deserialize(item: any): UploadModel {
    return new UploadModel(
      item.file,
      item.hash
    );
  }
}