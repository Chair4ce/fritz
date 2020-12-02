import { action, computed, observable } from 'mobx';

export class AverageSubsetModel {
  @observable private _startTime: number;
  @observable private _timeTaken: number;

  constructor(startTime: number, timeTaken: number) {
    this._startTime = startTime;
    this._timeTaken = timeTaken;
  }

  @computed
  get startTime(): number {
    return this._startTime;
  }

  @action.bound
  setStartTime(value: number) {
    this._startTime = value;
  }

  @computed
  get timeTaken(): number {
    return this._timeTaken;
  }

  @action.bound
  setTimeTaken(value: number) {
    this._timeTaken = value;
  }
}