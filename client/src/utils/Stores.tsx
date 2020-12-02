import { UploadStore } from '../app/component/form/upload/UploadStore';
import { SlidesStore } from '../app/component/slides/store/SlidesStore';
import { MetricStore } from '../app/component/metrics/MetricStore';
import { ClassificationStore } from '../app/component/classification/store/ClassificationStore';
import { UnicornStore } from '../app/component/unicorn/store/UnicornStore';
import { CarouselStore } from '../app/component/carousel/CarouselStore';
import { StatisticStore } from '../app/component/metrics/StatisticStore';
import { HomePageStore } from '../app/page/HomePageStore';

const uploadStore = new UploadStore();
const slidesStore = new SlidesStore();
const metricStore = new MetricStore();
const classificationStore = new ClassificationStore();
const unicornStore = new UnicornStore();
const carouselStore = new CarouselStore();
const statisticStore = new StatisticStore();
const homePageStore = new HomePageStore(carouselStore, unicornStore, uploadStore);

export interface Stores {
  uploadStore: UploadStore;
  slidesStore: SlidesStore;
  metricStore: MetricStore;
  classificationStore: ClassificationStore;
  unicornStore: UnicornStore;
  carouselStore: CarouselStore;
  statisticStore: StatisticStore;
  homePageStore: HomePageStore;
}

export const stores = {
  uploadStore,
  slidesStore,
  metricStore,
  classificationStore,
  unicornStore,
  carouselStore,
  statisticStore,
  homePageStore
};