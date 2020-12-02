import { action, computed, observable } from 'mobx';

export class StatisticModel {
  @observable private _uid: string;
  @observable private _timesUsed: number;

  constructor(uid: string, timesUsed: number) {
    this._uid = uid;
    this._timesUsed = timesUsed;
  }

  @computed
  get uid(): string {
    return this._uid;
  }

  @computed
  get timesUsed(): number {
    return this._timesUsed;
  }

  @action.bound
  setUid(value: string) {
    this._uid = value;
  }

  @action.bound
  setTimesUsed(value: number) {
    this._timesUsed = value;
  }
}