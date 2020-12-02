import { action, computed, observable } from 'mobx';
import { MissionModel } from '../model/MissionModel';
import { UnicornRepository } from '../repositories/UnicornRepository';
import { CalloutModel } from '../model/CalloutModel';
import { ReleasabilityModel } from '../model/ReleasabilityModel';
import { SlideModel, SlideUploadStatus } from '../../slides/models/SlideModel';
import { DropdownOption } from '../../dropdown/Dropdown';
import * as Fuse from 'fuse.js';

const fmvPlatforms = ['pred', 'predator', 'reaper', 'mc-12'];

export class UnicornStore {
  @observable private _missions: MissionModel[] = [];
  @observable private _sites: string[] = [];
  @observable private _activeMission: MissionModel | null = null;
  @observable private _selectedSite: string = 'DGS 1';
  @observable private _callouts: CalloutModel[] = [];
  @observable private _releasabilities: ReleasabilityModel[] = [];
  @observable private _releasability: string;
  @observable private _releasabilityId: string;
  @observable private _pendingUpload: boolean = false;
  @observable private _uploadComplete: boolean = false;
  @observable private _currentUploadCount: number = 0;
  @observable private _unassignedCallouts: boolean = false;
  @observable private _isUploading: boolean = false;
  @observable private _loading: boolean;
  @observable private _pendingCallouts: boolean = true;
  @observable private _uploadQueue: SlideModel[] = [];
  @observable private _uploadsInProgress: boolean = false;
  @observable private _offline: boolean = false;
  @observable private _offlineModal: boolean = false;
  @observable private _isRefreshing: boolean = false;
  @observable private _pendingReleasability: string | null = null;

  @computed
  get pendingReleasability(): string | null {
    return this._pendingReleasability;
  }

  @computed
  get offlineModal(): boolean {
    return this._offlineModal;
  }

  @computed
  get offline(): boolean {
    return this._offline;
  }

  @computed
  get uploadQueue(): SlideModel[] {
    return this._uploadQueue;
  }

  @computed
  get loading(): boolean {
    return this._loading;
  }

  @computed
  get unassignedCallouts(): boolean {
    return this._unassignedCallouts;
  }

  @computed
  get currentUploadCount(): number {
    return this._currentUploadCount;
  }

  @computed
  get releasability(): string {
    return this._releasability;
  }

  @computed
  get releasabilityId(): string {
    return this._releasabilityId;
  }

  @computed
  get releasabilities(): ReleasabilityModel[] {
    return this._releasabilities;
  }

  @computed
  get missions(): MissionModel[] {
    return this._missions;
  }

  @computed
  get sites(): string[] {
    return this._sites;
  }

  @computed
  get activeMission(): MissionModel | null {
    return this._activeMission;
  }

  @computed
  get selectedSite(): string {
    return this._selectedSite;
  }

  @computed
  get callouts(): CalloutModel[] {
    return this._callouts;
  }

  @computed
  get pendingUpload(): boolean {
    return this._pendingUpload;
  }

  @computed
  get isUploading(): boolean {
    return this._isUploading;
  }

  @computed
  get uploadComplete(): boolean {
    return this._uploadComplete;
  }

  @computed
  get pendingCallouts(): boolean {
    return this._pendingCallouts;
  }

  @computed
  get uploadsInProgress(): boolean {
    return this._uploadsInProgress;
  }

  @computed
  get isRefreshing(): boolean {
    return this._isRefreshing;
  }

  @computed
  get releasabilityOptions(): DropdownOption[] {
    if (this.releasabilities) {
      let popularRel = this.releasabilities.sort((a, b) => {
        return b.timesClicked - a.timesClicked;
      }).map((r) => {
        return new DropdownOption(r.releasabilityId, r.releasabilityName);
      });
      if (popularRel.length > 3) {
        let otherRel = popularRel.slice(3);
        if (this.pendingReleasability) {
          let fuse = new Fuse(otherRel, {
            shouldSort: true,
            threshold: 1,
            keys: [
              'display'
            ],
          });
          let fuzzyResults = fuse.search(this.pendingReleasability);
          return popularRel.slice(0, 3).concat(fuzzyResults);
        }
        return popularRel;
      } else {
        return popularRel;
      }
    } else {
      return [];
    }
  }

  @computed
  get calloutOptions(): DropdownOption[] {
    return this.callouts
      ? this.callouts
        .filter((c: CalloutModel) => {
          return (c.time && c.time.toString().length > 0);
        })
        .map((c: CalloutModel) => {
          return {id: c.eventId, display: c.time ? `${c.time}Z` : ''};
        })
      : [];
  }

  async hydrate(unicornRepository: UnicornRepository) {
    let code = await unicornRepository.getStatus();
    if (code === 200) {
      this.setOffline(false);
      this.setLoading(true);
      if (this.isLaunchedInTestEnvironment()) {
        this.produceFakeTestData();
      } else {
        this._releasabilities = (await unicornRepository.getReleasabilities());
        this._missions = (await unicornRepository.getMissions())
          .filter((m) => {
            return fmvPlatforms.indexOf(m.platform.toLowerCase()) > -1;
          });
        this._sites = [...new Set(this._missions.map(m => m.org))];
        this.setLoading(false);
      }
    } else {
      this.setOffline(true);
      this.setOfflineModal(true);
    }
  }

  @action.bound
  setPendingReleasability(value: string | null) {
    this._pendingReleasability = value;
  }

  @action.bound
  setOfflineModal(value: boolean) {
    this._offlineModal = value;
  }

  @action.bound
  setOffline(value: boolean) {
    this._offline = value;
  }

  @action.bound
  setUnassignedCallouts(value: boolean) {
    this._unassignedCallouts = value;
  }

  @action.bound
  setMissions(value: MissionModel[]) {
    this._missions = value;
  }

  @action.bound
  setActiveMission(mission: MissionModel | null) {
    this._activeMission = mission;
  }

  @action.bound
  setSelectedSite(value: string) {
    this._selectedSite = value;
  }

  @action.bound
  setCallouts(callouts: CalloutModel[]) {
    this._callouts = callouts;
  }

  @action.bound
  setReleasabilities(value: ReleasabilityModel[]) {
    this._releasabilities = value;
  }

  @action.bound
  setReleasability(value: string) {
    this._releasability = value;
  }

  @action.bound
  setReleasabilityId(value: string) {
    this._releasabilityId = value;
  }

  @action.bound
  setPendingUpload(value: boolean) {
    this._pendingUpload = value;
  }

  @action.bound
  setUploadComplete(value: boolean) {
    this._uploadComplete = value;
    if (value) {
      this._isUploading = false;
    }
  }

  @action.bound
  setCurrentUploadCount(value: number) {
    this._currentUploadCount = value;
  }

  @action.bound
  setIsUploading(status: boolean) {
    if (status) {
      this._uploadComplete = false;
    }
    this._isUploading = status;
  }

  @action.bound
  setLoading(value: boolean) {
    this._loading = value;
  }

  @action.bound
  setPendingCallouts(value: boolean) {
    this._pendingCallouts = value;
  }

  addToUploadQueue(slide: SlideModel) {
    slide.setUploadStatus(SlideUploadStatus.PENDING);
    this._uploadQueue.push(slide);
  }

  @action.bound
  setUploadsInProgress(value: boolean) {
    this._uploadsInProgress = value;
  }

  @action.bound
  setRefreshing(value: boolean) {
    this._isRefreshing = value;
  }

  @action.bound
  setUploadQueue(value: SlideModel[]) {
    this._uploadQueue = value;
  }

  private produceFakeTestData() {
    this._missions.push(new MissionModel(
      'testId', 'starttime', 'TEST11', 'fake mission', 'OPEN', 'DGS 1', 'Pred')
    );
    this._releasabilities.push(new ReleasabilityModel('', 'FOUO', 0));
  }

  private isLaunchedInTestEnvironment() {
    return navigator.userAgent.toLowerCase().indexOf('electron') !== -1;
  }
}
