import { computed, observable } from 'mobx';

export class UnicornUploadStatusModel {

  @observable private _successfulUpload: boolean = false;

  constructor(successfulUpload: boolean) {
    this._successfulUpload = successfulUpload;
  }

  @computed
  get successfulUpload(): boolean {
    return this._successfulUpload;
  }
}