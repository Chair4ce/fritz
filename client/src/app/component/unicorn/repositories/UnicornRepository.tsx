import { MissionModel } from '../model/MissionModel';
import { CalloutModel } from '../model/CalloutModel';
import { UnicornUploadModel } from '../model/UnicornUploadModel';
import { ReleasabilityModel } from '../model/ReleasabilityModel';
import { UnicornUploadStatusModel } from '../model/UnicornUploadStatusModel';

export interface UnicornRepository {
  getStatus(): Promise<number>;

  getMissions(): Promise<MissionModel[]>;

  getCallouts(missionId: string): Promise<CalloutModel[]>;

  upload(model: UnicornUploadModel): Promise<UnicornUploadStatusModel>;

  getReleasabilities(): Promise<ReleasabilityModel[]>;
}