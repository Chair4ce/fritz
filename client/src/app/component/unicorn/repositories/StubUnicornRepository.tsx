import { UnicornRepository } from './UnicornRepository';
import { MissionModel } from '../model/MissionModel';
import { CalloutModel } from '../model/CalloutModel';
import { UnicornUploadModel } from '../model/UnicornUploadModel';
import { ReleasabilityModel } from '../model/ReleasabilityModel';
import { UnicornUploadStatusModel } from '../model/UnicornUploadStatusModel';

export class StubUnicornRepository implements UnicornRepository {
  getStatus(): Promise<number> {
    return Promise.resolve(200);
  }

  getMissions(): Promise<MissionModel[]> {
    return Promise.resolve([
      new MissionModel('1', '04-17-19', 'testCallsign', 'Test Mission', 'open', 'DGS-1', 'Pred')
    ]);
  }

  getCallouts(missionId: string): Promise<CalloutModel[]> {
    return Promise.resolve([
      new CalloutModel(
        'Callout1',
        '2351-ei-235223',
        'sas-232-1293821',
        'Stuff here',
        '78282-sd-23512521',
        '1450Z',
        null
      ),
      new CalloutModel(
        'Callout2',
        '2351-ei-235223',
        'sas-232-1293821',
        'Stuff here',
        '78282-sd-23512522',
        '1451Z',
        null
      ),
      new CalloutModel(
        'Callout3',
        '2351-ei-235223',
        'sas-232-1293821',
        'Stuff here',
        '78282-sd-23512523',
        '1452Z',
        null
      ),
      new CalloutModel(
        'Callout4',
        '2351-ei-235223',
        'sas-232-1293821',
        'Stuff here',
        '78282-sd-23512524',
        '1453Z',
        null
      )
    ]);
  }

  upload(model: UnicornUploadModel): Promise<UnicornUploadStatusModel> {
    return Promise.resolve(
      new UnicornUploadStatusModel(true)
    );
  }

  getReleasabilities(): Promise<ReleasabilityModel[]> {
    return Promise.resolve([
      new ReleasabilityModel('1', 'Unclass', 0)
    ]);
  }
}