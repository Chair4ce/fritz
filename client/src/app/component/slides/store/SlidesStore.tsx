import { action, computed, observable } from 'mobx';
import { SlideModel } from '../models/SlideModel';
import * as moment from 'moment';

export class SlidesStore {
  @observable private _files: string[] = [];
  @observable private _opName: string | null;
  @observable private _asset: string | null;
  @observable private _classification: string | null = 'Secret';
  @observable private _slides: SlideModel[] = [];
  @observable private _activity: string | null;
  @observable private _time: string | null;
  @observable private _releasability: string = '';
  @observable private _assignedCalloutCount: number;
  @observable private _differentAsset: boolean = false;
  @observable private _isValidOpName: boolean = true;
  @observable private _isValidAsset: boolean = true;
  @observable private _isValidReleasability: boolean = false;
  @observable private _hasInitiallyValidated: boolean = false;
  @observable private _errorMessages: string[] = [
    'The op name field must not be empty',
    'The callsign field must not be empty',
    'The callsign does not match selected mission'
  ];
  private months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  @computed
  get errorMessages(): string[] {
    return this._errorMessages;
  }

  @computed
  get assignedCalloutCount(): number {
    return this._assignedCalloutCount;
  }

  @computed
  get time(): string | null {
    return this._time;
  }

  @computed
  get activity(): string | null {
    return this._activity;
  }

  @computed
  get files(): string[] {
    return this._files;
  }

  @computed
  get slides(): SlideModel[] {
    return this._slides;
  }

  @computed
  get opName(): string | null {
    return this._opName;
  }

  @computed
  get asset(): string | null {
    return this._asset;
  }

  @computed
  get classification(): string | null {
    return this._classification;
  }

  @computed
  get releasability(): string {
    return this._releasability;
  }

  @computed
  get isValidOpName() {
    return this._isValidOpName;
  }

  @computed
  get isValidAsset() {
    return this._isValidAsset;
  }

  @computed
  get isValidReleasability() {
    return this._isValidReleasability;
  }

  @computed
  get differentAsset(): boolean {
    return this._differentAsset;
  }

  @computed
  get hasInitiallyValidated(): boolean {
    return this._hasInitiallyValidated;
  }
  @computed
  get undeletedSlides(): SlideModel[] {
    return this._slides.filter((s: SlideModel) => {
      return !s.deleted;
    });
  }

  nameFormat(slide: SlideModel): string {
    let valueOrPlaceholder = (
      value: string | null,
      placeholder: string
    ): string => {
      return (value || placeholder).split(' ').join('_');
    };

    let datetime = () => {
      return [
        (slide.dayWithLeadingZero),
        (slide.time || 'TTTT') + 'Z',
        (slide.monthThreeLetter),
        (slide.yearTwoDigit)
      ].join('');
    };

    return [
      datetime(),
      valueOrPlaceholder(this._opName, 'TGT_NAME'),
      valueOrPlaceholder(slide.activity, 'ACTY'),
      valueOrPlaceholder(this._asset, 'ASSET'),
      valueOrPlaceholder(this._releasability, 'RELEASABILITY'),
    ]
      .join('_')
      .toUpperCase();
  }

  @action.bound
  setErrorMessages(value: []) {
    this._errorMessages = value;
  }

  initialValidation() {
    this._hasInitiallyValidated = true;
  }

  isMilitaryDateFormat(date: string) {
    let militaryDate = false;
    this.months.map((month) => {
      if (date.substr(2, 3).toUpperCase() === month.toUpperCase()) {
        militaryDate = true;
      }
    });
    return militaryDate;
  }

  parseMilitaryDate(date: string): string {
    let monthIndex = 0;
    this.months.map((m, index) => {
      if (date.toUpperCase().includes(m.toUpperCase())) {
        monthIndex = index + 1;
        return;
      }
    });

    let month = ('0' + monthIndex.toString().substr(0, 2)).slice(-2);
    let day = ('0' + date.substr(0, 2)).slice(-2);
    let year = date.slice(-2);
    return `20${year}-${month}-${day}`;
  }

  @action.bound
  setDifferentAsset(value: boolean) {
    this._differentAsset = value;
    this._isValidAsset = !value;
  }

  @action.bound
  setAssignedCalloutCount(value: number) {
    this._assignedCalloutCount = value;
  }

  @action.bound
  setReleasability(value: string) {
    this._releasability = value;
    this.validateReleasability();
  }

  @action.bound
  setClassification(value: string | null) {
    this._classification = value;
  }

  @action.bound
  setTime(slide: SlideModel, value: string) {
    this._time = value;
    slide.setTime(value);
  }

  @action.bound
  setActivity(slide: SlideModel, value: string) {
    this._activity = value;
    slide.setActivity(value);
  }

  @action.bound
  setFiles(value: string[]) {
    this._files = value;
  }

  @action.bound
  setOpName(value: string) {
    this._opName = value;
  }

  @action.bound
  setAsset(value: string) {
    this._asset = value;
  }

  @action.bound
  setSlides(value: SlideModel[]) {
    this._slides = value;
  }

  validate(): boolean {
    if (this.hasInitiallyValidated) {
      this.validateOpName();
      this.validateAsset();
      this.validateReleasability();
      this.validateDifferentAsset();
    }
    return this.areAllFieldsValid();
  }

  setAllSlidesDates(dateString: string) {
    this._slides.map((slide: SlideModel) => {
      slide.setDate(moment(this.deriveDateFromString(dateString)));
    });
  }

  private deriveDateFromString(value: string) {
    if (this.isMilitaryDateFormat(value)) {
      value = this.parseMilitaryDate(value);
    }
    return value;
  }

  private areAllFieldsValid(): boolean {
    if (this.hasInitiallyValidated) {
      return (
        this.isValidOpName &&
        this.isValidAsset &&
        this.isValidReleasability
      );
    }
    return false;
  }

  private validateOpName() {
    this._isValidOpName = (
      this._opName != null
      && this._opName !== ''
    );
  }

  private validateAsset() {
    this._isValidAsset = (
      this._asset != null
      && this._asset !== ''
      && !this._differentAsset
    );
  }

  private validateReleasability() {
    this._isValidReleasability = (
      this._releasability != null
      && this._releasability !== ''
    );
  }

  private validateDifferentAsset() {
    return this._differentAsset;
  }
}