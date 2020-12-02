import { action, computed, observable } from 'mobx';
import * as moment from 'moment';
import { Moment } from 'moment';

export class CalloutModel {

  @observable private _name: string;
  @observable private _classification: string;
  @observable private _releasability: string;
  @observable private _activity: string;
  @observable private _eventId: string;
  @observable private _time: string | null = null;
  @observable private _date: Moment | null = null;

  constructor(
    name: string,
    classification: string,
    releasability: string,
    activity: string,
    eventId: string,
    time: string | null,
    date: Moment | number | null
  ) {
    this._name = name;
    this._classification = classification;
    this._releasability = releasability;
    this._activity = activity;
    this._eventId = eventId;
    this.setTime(time);
    if (typeof date === 'number') {
      this._date = moment.unix(date).utc();
    } else {
      this._date = date;
    }
  }

  @computed
  get name(): string {
    return this._name;
  }

  @action.bound
  setName(value: string) {
    this._name = value;
  }

  @computed
  get classification(): string {
    return this._classification;
  }

  @action.bound
  setClassification(value: string) {
    this._classification = value;
  }

  @computed
  get releasability(): string {
    return this._releasability;
  }

  @action.bound
  setReleasability(value: string) {
    this._releasability = value;
  }

  @computed
  get activity(): string {
    return this._activity;
  }

  @action.bound
  setActivity(value: string) {
    this._activity = value;
  }

  @computed
  get eventId(): string {
    return this._eventId;
  }

  @action.bound
  setEventId(value: string) {
    this._eventId = value;
  }

  @computed
  get time(): string | null {
    return this._time;
  }

  @action.bound
  setTime(time: string | null) {
    if (time) {
      time = time.toString().replace('Z', '');
      if (
        time.length === 4
        && parseInt(time, 10)
        && parseInt(time, 10) <= 2359
        && parseInt(time.slice(2), 10) <= 59
      ) {
        this._time = time;
      } else {
        this._time = null;
      }
    }
  }

  @computed
  get date(): Moment | null {
    return this._date;
  }

  @action.bound
  setDate(value: Moment | null) {
    this._date = value;
  }
}