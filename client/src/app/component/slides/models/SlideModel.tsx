import { action, computed, observable } from 'mobx';
import { Moment } from 'moment';
import * as moment from 'moment';

export enum SlideUploadStatus {
  NOT_STARTED,
  PENDING,
  IN_PROGRESS,
  FAILED,
  SUCCEEDED
}

export class SlideModel {
  @observable private _oldName: string;
  @observable private _time: string = 'TTTT';
  @observable private _activity: string = '';
  @observable private _newName: string = '';
  @observable private _deleted: boolean = false;
  @observable private _targetEventId: string = '';
  @observable private _releasabilityId: string = '';
  @observable private _id: number | null = null;
  @observable private _calloutTime: string;
  @observable private _hash: string;
  @observable private _date: Moment;
  @observable private _displayDate: string = '';
  @observable private _monthThreeLetter: string = '';
  @observable private _dayWithLeadingZero: string = '';
  @observable private _uploadStatus: SlideUploadStatus = SlideUploadStatus.NOT_STARTED;

  constructor(
    oldName: string = '',
    newName: string = '',
    time: string = '',
    activity: string = '',
    deleted: boolean = false,
    targetEventId: string = '',
    releasabilityId: string = '',
    date: Moment | null = null
  ) {
    this._oldName = oldName;
    this._time = time;
    this._activity = activity;
    this._newName = newName;
    this._deleted = deleted;
    this._targetEventId = targetEventId;
    this._releasabilityId = releasabilityId;
    if (date === null) {
      this._date = moment().utc();
    } else {
      this._date = date;
    }
    this.setDisplayDate();
  }

  @computed
  get uploadStatus(): SlideUploadStatus {
    return this._uploadStatus;
  }

  @computed
  get dayWithLeadingZero(): string {
    return this._dayWithLeadingZero;
  }

  @computed
  get monthThreeLetter(): string {
    return this._monthThreeLetter;
  }

  @computed
  get yearTwoDigit(): string {
    return this._date.year().toString().slice(2);
  }

  @computed
  get calloutTimeForDisplay() {
    return this._calloutTime ? `${this._calloutTime}Z` : this._calloutTime;
  }

  @computed
  get calloutTime(): string {
    return this._calloutTime;
  }

  @computed
  get oldName(): string {
    return this._oldName;
  }

  @computed
  get newName(): string {
    return this._newName;
  }

  @computed
  get time(): string {
    return this._time;
  }

  @computed
  get activity(): string {
    return this._activity;
  }

  @computed
  get deleted(): boolean {
    return this._deleted;
  }

  @computed
  get targetEventId(): string {
    return this._targetEventId;
  }

  @computed
  get releasabilityId(): string {
    return this._releasabilityId;
  }

  @computed
  get id(): number | null {
    return this._id;
  }

  @computed
  get hash(): string {
    return this._hash;
  }

  @computed
  get date(): Moment {
    return this._date;
  }

  @computed
  get displayDate() {
    return this._displayDate;
  }

  @computed
  get isValidTime(): boolean {
    if (this.time.length !== 4) {
      return false;
    }
    if (this.time.search(/^([0-1]?[0-9]|2[0-3])([0-5][0-9])(:[0-5][0-9])?$/)) {
      return false;
    }
    return true;
  }

  @action.bound
  setOldName(value: string) {
    this._oldName = value;
  }

  @action.bound
  setNewName(value: string) {
    this._newName = value;
  }

  @action.bound
  setTime(value: string) {
    this._time = value;
  }

  @action.bound
  setActivity(value: string) {
    this._activity = value;
  }

  @action.bound
  setDeleted(value: boolean) {
    this._deleted = value;
  }

  @action.bound
  setTargetEventId(value: string) {
    this._targetEventId = value;
  }

  @action.bound
  setReleasabilityId(value: string) {
    this._releasabilityId = value;
  }

  @action.bound
  setId(value: number | null) {
    this._id = value;
  }

  @action.bound
  setCalloutTime(value: string) {
    this._calloutTime = value;
  }

  @action.bound
  setHash(hash: string) {
    this._hash = hash;
  }

  @action.bound
  setDate(value: Moment) {
    this._date = value;
    this.setDisplayDate();
  }

  setDisplayDate() {
    this.setDayWithLeadingZero();
    this.setMonthThreeLetter();
    this._displayDate = `${this.date.date()} ${this.monthThreeLetter}`;
  }

  @action.bound
  incrementDay() {
    this._date.add(1, 'day');
    this.setDisplayDate();
  }

  @action.bound
  decrementDay() {
    this._date.subtract(1, 'day');
    this.setDisplayDate();
  }

  @action.bound
  setUploadStatus(status: SlideUploadStatus) {
    this._uploadStatus = status;
  }

  isReadyForUpload() {
    return (
      this.targetEventId !== '' &&
      !this.deleted &&
      this.uploadStatus === SlideUploadStatus.NOT_STARTED
    );
  }

  private setMonthThreeLetter() {
    this._monthThreeLetter = moment.monthsShort('-MMM-', this._date.month());
  }

  private setDayWithLeadingZero() {
    if (this._date.date() < 10) {
      let day = 0 + '' + this._date.date();
      this._dayWithLeadingZero = day;
    } else {
      this._dayWithLeadingZero = this._date.date().toString();
    }
  }
}