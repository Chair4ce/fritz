import { action, computed, observable } from 'mobx';
import { AverageSubsetModel } from './AverageSubsetModel';

export class AverageModel {

  @observable private _download: AverageSubsetModel[] = [];
  @observable private _rename: AverageSubsetModel[] = [];
  @observable private _workflow: AverageSubsetModel[] = [];
  @observable private _upload: AverageSubsetModel[] = [];
  @observable private _conversion: AverageSubsetModel[] = [];

  @computed
  get download(): AverageSubsetModel[] {
    return this._download;
  }

  @computed
  get rename(): AverageSubsetModel[] {
    return this._rename;
  }

  @computed
  get workflow(): AverageSubsetModel[] {
    return this._workflow;
  }

  @computed
  get upload(): AverageSubsetModel[] {
    return this._upload;
  }

  @computed
  get conversion(): AverageSubsetModel[] {
    return this._conversion;
  }

  @action.bound
  setRename(value: AverageSubsetModel[]) {
    this._rename = value;
  }

  @action.bound
  setWorkflow(value: AverageSubsetModel[]) {
    this._workflow = value;
  }

  @action.bound
  setUpload(value: AverageSubsetModel[]) {
    this._upload = value;
  }

  @action.bound
  setDownload(value: AverageSubsetModel[]) {
    this._download = value;
  }

  @action.bound
  setConversion(value: AverageSubsetModel[]) {
    this._conversion = value;
  }
}