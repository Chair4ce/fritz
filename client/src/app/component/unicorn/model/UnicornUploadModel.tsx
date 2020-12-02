import { action, computed, observable } from 'mobx';

export class UnicornUploadModel {
  @observable private _productName: string;
  @observable private _missionId: string;
  @observable private _targetEventId: string;
  @observable private _classificationId: string;
  @observable private _releasabilityId: string;
  @observable private _personnelId: string = '2a7081f8-7cc9-45f3-a29e-f94a0003b3fe';
  @observable private _isrRoleId: string = '';
  @observable private _endFilePath: string;
  @observable private _uploadType: string = 'targetevent';
  @observable private _uploadedFile: string = '';
  @observable private _fileName: string;

  @computed
  get productName(): string {
    return this._productName;
  }

  @computed
  get missionId(): string {
    return this._missionId;
  }

  @computed
  get targetEventId(): string {
    return this._targetEventId;
  }

  @computed
  get classificationId(): string {
    return this._classificationId;
  }

  @computed
  get releasabilityId(): string {
    return this._releasabilityId;
  }

  @computed
  get personnelId(): string {
    return this._personnelId;
  }

  @computed
  get isrRoleId(): string {
    return this._isrRoleId;
  }

  @computed
  get endFilePath(): string {
    return this._endFilePath;
  }

  @computed
  get uploadType(): string {
    return this._uploadType;
  }

  @computed
  get uploadedFile(): string {
    return this._uploadedFile;
  }

  @computed
  get fileName(): string {
    return this._fileName;
  }

  @action.bound
  setFileName(value: string) {
    this._fileName = value;
  }

  @action.bound
  setProductName(value: string) {
    this._productName = value;
  }

  @action.bound
  setMissionId(value: string) {
    this._missionId = value;
  }

  @action.bound
  setTargetEventId(value: string) {
    this._targetEventId = value;
  }

  @action.bound
  setClassificationId(value: string) {
    this._classificationId = value;
  }

  @action.bound
  setReleasabilityId(value: string) {
    this._releasabilityId = value;
  }

  @action.bound
  setPersonnelId(value: string) {
    this._personnelId = value;
  }

  @action.bound
  setIsrRoleId(value: string) {
    this._isrRoleId = value;
  }

  @action.bound
  setEndFilePath(value: string) {
    this._endFilePath = value;
  }

  @action.bound
  setUploadType(value: string) {
    this._uploadType = value;
  }

  @action.bound
  setUploadedFile(value: string) {
    this._uploadedFile = value;
  }
}