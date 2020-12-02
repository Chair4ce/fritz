import { Stores } from '../../../../utils/Stores';
import { UploadStore } from '../../form/upload/UploadStore';
import { SlideModel, SlideUploadStatus } from '../models/SlideModel';
import * as FileSaver from 'file-saver';
import { MetricActions } from '../../metrics/actions/MetricActions';
import { action } from 'mobx';
import { Repositories } from '../../../../utils/Repositories';
import { UnicornStore } from '../../unicorn/store/UnicornStore';
import { Toast } from '../../../../utils/Toast';
import { SlidesStore } from '../store/SlidesStore';
import { MissionModel } from '../../unicorn/model/MissionModel';
import { CalloutModel } from '../../unicorn/model/CalloutModel';

export class SlidesActions {
  public metricActions: MetricActions;

  private slidesStore: SlidesStore;
  private uploadStore: UploadStore;
  private unicornStore: UnicornStore;

  constructor(repositories: Partial<Repositories>, stores: Partial<Stores>) {
    this.slidesStore = stores.slidesStore!;
    this.uploadStore = stores.uploadStore!;
    this.unicornStore = stores.unicornStore!;
    this.metricActions = new MetricActions(repositories, stores);
  }

  @action.bound
  setAndUpdateActivity(slide: SlideModel, activity: any) {
    activity = activity.target.value.toUpperCase();
    this.slidesStore.setActivity(slide, activity);
    this.updateNewNames();
  }

  @action.bound
  setAndUpdateTime(slide: SlideModel, e: any) {
    let time = e.target.value;
    this.slidesStore.setTime(slide, time);
    this.updateNewNames();
  }

  setDateFromStatus(date: string) {
    this.slidesStore.setAllSlidesDates(date);
  }

  @action.bound
  setAndUpdateOpName(e: any) {
    if (e.target != null) {
      this.slidesStore.setOpName(e.target.value);
      this.updateNewNames();
    }

    if (this.slidesStore.hasInitiallyValidated) {
      this.slidesStore.validate();
    }
  }

  @action.bound
  setAndUpdateAsset(e: any) {
    if (e.target != null) {
      this.slidesStore.setAsset(e.target.value);
      this.compareCallsigns();
      if (this.slidesStore.hasInitiallyValidated) {
        this.slidesStore.validate();
      }
      this.updateNewNames();
    }
  }

  @action.bound
  setAndUpdateReleasability(releasability: string) {
    this.slidesStore.setReleasability(releasability);
    this.unicornStore.setReleasability(releasability);
    this.updateNewNames();
  }

  @action.bound
  changeCalloutOnSlide(slide: SlideModel, option: any) {
    slide.setTargetEventId(option.id);
    let selectedCallout = this.unicornStore.callouts.filter((callout: CalloutModel) => {
      return callout.eventId === option.id;
    });
    if (selectedCallout[0].time) {
      slide.setCalloutTime(selectedCallout[0].time);
    }
  }

  @action.bound
  setAndUpdateCustomReleasability(e: any) {
    if (e.target != null) {
      this.slidesStore.setReleasability(e.target.value);
      this.unicornStore.setReleasability(e.target.value);
      this.updateNewNames();
    }
  }

  @action.bound
  setAndUpdateClassification(classification: string) {
    this.slidesStore.setClassification(classification);
    this.updateNewNames();
  }

  @action.bound
  deleteSlide = async (s: SlideModel, carousel?: boolean) => {
    s.setDeleted(true);
    if (carousel) {
      Toast.create(5000, 'deleteToast', 'JPEG Deleted', s);
    }
  };

  updateNewNames() {
    this.slidesStore.slides.map((slide) => {
      slide.setNewName(this.slidesStore.nameFormat(slide));
    });
    this.slidesStore.slides.map((slide) => {
      let dupes = this.slidesStore.slides.filter((possibleDuplicate) => {
        return possibleDuplicate.newName === slide.newName;
      });
      if (dupes.length > 1) {
        dupes.map((dupe, index) => {
          dupe.setNewName(dupe.newName + (index + 1));
        });
      }
    });
  }

  updateOldNames() {
    this.slidesStore.slides.map((s: SlideModel) => {
      if (s.deleted) {
        this.metricActions!.createMetric('Delete JPG');
      }
      s.setOldName(s.newName);
    });
  }

  trackRenameAndDownload = async () => {
    this.slidesStore.initialValidation();
    if (this.uploadStore.uploaded) {
      if (this.slidesStore.validate()) {
        await this.metricActions.updateMetric('Renaming');
        await this.metricActions.trackMetric('Download');
        await this.download();
      }
    } else if (this.uploadStore.uploading) {
      this.triggerMustFinishConversionToast();
    } else {
      this.triggerMustUploadFirstToast();
    }
  };

  triggerMustUploadFirstToast() {
    Toast.create(
      5000,
      'errorToast',
      '<b>Error:</b> You must upload a PDF file before you can download JPEGS'
    );
  }

  triggerMustFinishConversionToast() {
    Toast.create(
      5000,
      'errorToast',
      '<b>Error:</b> Please wait. Your file is being converted'
    );
  }

  getAssignedCallouts() {
    let count: number = 0;

    for (let i = 0; i < this.slidesStore.slides.length; i++) {
      let slide = this.slidesStore.slides[i];
      if (slide.isReadyForUpload()) {
        count++;
      }
    }
    this.slidesStore.setAssignedCalloutCount(count);
  }

  async download() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = async () => {
      if (request.readyState === 4) {
        this.updateOldNames();
        await this.metricActions.updateMetric('Download');
      }
    };
    request.withCredentials = true;
    request.open('POST', 'api/rename', true);
    request.withCredentials = true;
    request.responseType = 'blob';
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.onload = () => {
      let blob = request.response;
      FileSaver.saveAs(blob, this.uploadStore.fileName.toUpperCase().replace('.PDF', '.zip'));
    };
    request.send(JSON.stringify(this.slidesStore.slides));
  }

  compareCallsigns() {
    if (this.slidesStore.asset !== undefined && !this.unicornStore.offline) {
      if (this.slidesStore.asset === '') {
        this.slidesStore.setDifferentAsset(false);
      } else if (this.slidesStore.asset !== '') {
        this.slidesStore.setDifferentAsset(this.unicornStore!.activeMission!.callsign.toUpperCase() !==
          this.slidesStore.asset!.toUpperCase());
      }
    }
  }

  @action.bound
  updateMission(mission: MissionModel) {
    this.unicornStore!.setActiveMission(mission);
    if (this.unicornStore!.activeMission) {
      this.compareCallsigns();
    }
  }

  @action.bound
  resetSlides() {
    this.slidesStore.slides.map((slide: SlideModel) => {
      slide.setCalloutTime('');
      slide.setTargetEventId('');
      slide.setUploadStatus(SlideUploadStatus.NOT_STARTED);
    });
  }
}