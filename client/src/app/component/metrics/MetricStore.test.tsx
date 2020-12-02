import { MetricStore } from './MetricStore';
import { StubMetricRepository } from './repository/StubMetricRepository';

describe('MetricStore', () => {
  let subject: MetricStore;
  let metricRepository: StubMetricRepository;

  beforeEach(() => {
    metricRepository = new StubMetricRepository();

    subject = new MetricStore();
    subject.hydrate(metricRepository);
  });

  it('should calculate the success rate', () => {
    expect(subject.successRate).toBe(40);
  });

  it('should calculate the failed upload attempts', () => {
    expect(subject.failedUploadAttempts).toBe(3);
  });

  it('should calculate the successful upload attempts', () => {
    expect(subject.successfulUploadAttempts).toBe(2);
  });

  it('should calculate the total upload attempts to unicorn', () => {
    expect(subject.uploadToUnicornAttempts).toBe(5);
  });
});