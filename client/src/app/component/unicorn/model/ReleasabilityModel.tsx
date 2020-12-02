import { action, computed, observable } from 'mobx';

export class ReleasabilityModel {
  @observable private _releasabilityId: string;
  @observable private _releasabilityName: string;
  @observable private _timesClicked: number = 0;

  constructor(releasabilityId: string, releasabilityName: string, timesClicked: number) {
    this._releasabilityId = releasabilityId;
    this._releasabilityName = releasabilityName;
    this._timesClicked = timesClicked;
  }

  @computed
  get timesClicked(): number {
    return this._timesClicked;
  }

  @computed
  get releasabilityId(): string {
    return this._releasabilityId;
  }

  @computed
  get releasabilityName(): string {
    return this._releasabilityName;
  }

  @action.bound
  setTimesClicked(value: number) {
    this._timesClicked = value;
  }

  @action.bound
  setReleasabilityId(value: string) {
    this._releasabilityId = value;
  }

  @action.bound
  setReleasabilityName(value: string) {
    this._releasabilityName = value;
  }
}