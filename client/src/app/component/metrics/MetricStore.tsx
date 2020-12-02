import { action, computed, observable } from 'mobx';
import { MetricModel, MetricType } from './MetricModel';
import { MetricRepository } from './repository/MetricRepository';
import { AverageModel } from '../average/AverageModel';

export class MetricStore {
  @observable private _metrics: MetricModel[] = [];
  @observable private _pendingUploadMetric: MetricModel;
  @observable private _endTime: String;
  @observable private _pendingDownloadMetric: MetricModel;
  @observable private _pendingConversionMetric: MetricModel;
  @observable private _pendingRenamingMetric: MetricModel;
  @observable private _filteredMetrics: MetricModel[] = [];
  @observable private _filterValue: number = 9007199254740991;
  @observable private _averages: AverageModel = new AverageModel();
  @observable private _pendingUploadToUnicornMetric: MetricModel;
  @observable private _averageWorkflow: any;
  @observable private _averageUpload: any;
  @observable private _averageRename: any;
  @observable private _averageDownload: any;
  @observable private _averageConversion: any;

  async hydrate(metricRepository: MetricRepository) {
    this._metrics = await metricRepository.findAll();
    if (this._filteredMetrics.length === 0) {
      this._filteredMetrics = this._metrics;
    }
  }

  @computed
  get averageUpload(): any {
    return this._averageUpload;
  }

  @computed
  get averageRename(): any {
    return this._averageRename;
  }

  @computed
  get averageDownload(): any {
    return this._averageDownload;
  }

  @computed
  get averageConversion(): any {
    return this._averageConversion;
  }

  @computed
  get averageWorkflow() {
    return this._averageWorkflow;
  }

  @computed
  get uploadToUnicornAttempts(): number {
    return this.failedUploadAttempts + this.successfulUploadAttempts;
  }

  @computed
  get failedUploadAttempts(): number {
    return (
      this.filteredMetrics.filter((e: MetricModel) => {
          return e.action === MetricType.UNICORN_UPLOAD_FAILURE;
        }
      ).length
    );
  }

  @computed
  get successfulUploadAttempts(): number {
    return (
      this.filteredMetrics.filter((e: MetricModel) => {
          return e.action === MetricType.UNICORN_UPLOAD_SUCCESS;
        }
      ).length
    );
  }

  @computed
  get successFulUniqueProductUploads(): number {
    return [...new Set(this.filteredMetrics.filter((m: MetricModel) => {
      return m.action === MetricType.UNICORN_UPLOAD_SUCCESS;
    })
      .map((m: MetricModel) => {
        return m.uid;
      }))].length;
  }

  @computed
  get successRate(): number {
    return (
      this.successfulUploadAttempts * 100 /
      (this.successfulUploadAttempts + this.failedUploadAttempts)
    );
  }

  @computed
  get averages(): AverageModel {
    return this._averages;
  }

  @computed
  get filterValue(): number {
    return this._filterValue;
  }

  @computed
  get filteredMetrics(): MetricModel[] {
    return this._filteredMetrics;
  }

  @computed
  get pendingRenamingMetric(): MetricModel {
    return this._pendingRenamingMetric;
  }

  @computed
  get metrics(): MetricModel[] {
    return this._metrics;
  }

  @computed
  get pendingUploadMetric(): MetricModel {
    return this._pendingUploadMetric;
  }

  @computed
  get pendingDownloadMetric(): MetricModel {
    return this._pendingDownloadMetric;
  }

  @computed
  get pendingConversionMetric(): MetricModel {
    return this._pendingConversionMetric;
  }

  @computed
  get endTime(): String {
    return this._endTime;
  }

  @computed
  get pendingUploadToUnicornMetric(): MetricModel {
    return this._pendingUploadToUnicornMetric;
  }

  @action.bound
  setPendingUploadToUnicornMetric(value: MetricModel) {
    this._pendingUploadToUnicornMetric = value;
  }

  @action.bound
  setAverage(value: AverageModel) {
    this._averages = value;
  }

  @action.bound
  setFilterValue(value: number) {
    this._filterValue = value;
  }

  @action.bound
  setPendingRenamingMetric(value: MetricModel) {
    this._pendingRenamingMetric = value;
  }

  @action.bound
  setPendingDownloadMetric(value: MetricModel) {
    this._pendingDownloadMetric = value;
  }

  @action.bound
  setEndTime(value: String) {
    this._endTime = value;
  }

  @action.bound
  setMetrics(value: MetricModel[]) {
    this._metrics = value;
  }

  @action.bound
  setPendingUploadMetric(value: MetricModel) {
    this._pendingUploadMetric = value;
  }

  @action.bound
  setPendingDownloadEndTime(value: string) {
    this._pendingDownloadMetric.setEndTime(value);
  }

  @action.bound
  setPendingConversionMetric(value: MetricModel) {
    this._pendingConversionMetric = value;
  }

  @action.bound
  setFilteredMetrics(value: MetricModel[]) {
    this._filteredMetrics = value;
  }

  @action.bound
  setAverageWorkflow(value: number) {
    this._averageWorkflow = value;
  }

  @action.bound
  setAverageUpload(value: any) {
    this._averageUpload = value;
  }

  @action.bound
  setAverageRename(value: any) {
    this._averageRename = value;
  }

  @action.bound
  setAverageDownload(value: any) {
    this._averageDownload = value;
  }

  @action.bound
  setAverageConversion(value: any) {
    this._averageConversion = value;
  }
}