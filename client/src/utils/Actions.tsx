import { UploadActions } from '../app/component/form/upload/actions/UploadActions';
import { WebRepositories } from './Repositories';
import { stores } from './Stores';
import { SlidesActions } from '../app/component/slides/actions/SlidesActions';
import { MetricActions } from '../app/component/metrics/actions/MetricActions';
import { ClassificationActions } from '../app/component/classification/ClassificationActions';
import { UnicornActions } from '../app/component/unicorn/actions/UnicornActions';
import { CarouselActions } from '../app/component/carousel/CarouselActions';

const uploadActions = new UploadActions(WebRepositories, stores);
const slidesActions = new SlidesActions(WebRepositories, stores);
const metricActions = new MetricActions(WebRepositories, stores);
const classificationActions = new ClassificationActions(WebRepositories, stores);
const unicornActions = new UnicornActions(WebRepositories, stores);
const carouselActions = new CarouselActions(stores);

export const actions = {
  uploadActions,
  slidesActions,
  metricActions,
  classificationActions,
  unicornActions,
  carouselActions
};