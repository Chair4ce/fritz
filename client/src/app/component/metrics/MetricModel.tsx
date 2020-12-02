import { action, computed, observable } from 'mobx';

export enum MetricType {
  UNICORN_UPLOAD_SUCCESS= 'Image Uploaded to Unicorn',
  UNICORN_UPLOAD_FAILURE= 'Upload to Unicorn Failed'
}

export class MetricModel {
  @observable private _id: any = null;
  @observable private _uid: string;
  @observable private _action: string;
  @observable private _startTime: string;
  @observable private _endTime: string | null;
  @observable private _count: number | null;

  constructor(id: any, uid: string, act: string, startTime: string, endTime: string | null, count: number | null) {
    this._id = id;
    this._uid = uid;
    this._action = act;
    this._startTime = startTime;
    this._endTime = endTime;
    this._count = count;
  }

  @computed
  get id(): any {
    return this._id;
  }

  @computed
  get uid(): string {
    return this._uid;
  }

  @computed
  get action(): string {
    return this._action;
  }

  @computed
  get startTime(): string {
    return this._startTime;
  }

  @computed
  get endTime(): string | null {
    return this._endTime;
  }

  @computed
  get count(): number | null {
    return this._count;
  }

  @action.bound
  setId(value: any) {
    this._id = value;
  }

  @action.bound
  setUid(value: any) {
    this._uid = value;
  }

  @action.bound
  setAction(value: string) {
    this._action = value;
  }

  @action.bound
  setStartTime(value: string) {
    this._startTime = value;
  }

  @action.bound
  setEndTime(value: string) {
    this._endTime = value;
  }

  @action.bound
  setCount(value: number) {
    this._count = value;
  }
}