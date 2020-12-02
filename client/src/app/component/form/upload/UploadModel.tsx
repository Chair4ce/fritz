import { computed, observable } from 'mobx';

export class UploadModel {
  @observable private _file: string;
  @observable private _hash: string;

  constructor(
    file: string = '',
    hash: string = ''
  ) {
    this._file = file;
    this._hash = hash;
  }

  @computed
  get file(): string {
    return this._file;
  }

  @computed
  get hash(): string {
    return this._hash;
  }
}
