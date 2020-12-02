import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { MetricsPage } from './MetricsPage';
import { StyledMetricsTable } from '../component/metrics/table/MetricsTable';
import { StyledMetricCard } from '../component/metrics/MetricCard';
import { StyledMetric } from '../component/metrics/Metric';
import { AverageSubsetModel } from '../component/average/AverageSubsetModel';

describe('MetricsPage', () => {
  let subject: ShallowWrapper;
  let metricActions: any;
  let metricStore: any;

  beforeEach(() => {

    metricActions = {
      initializeStores: jest.fn(),
      calculateAllAverages: jest.fn(),
      exportMetrics: jest.fn(),
      filterMetrics: jest.fn(),
      calculateAverageDifference: (s: string) => {
        switch (s) {
          case 'workflow':
            return 5;
          case 'upload':
            return 6;
          case 'rename':
            return 7;
          case 'download':
            return 8;
          case 'conversion':
            return 9;
          default:
            return null;
        }
      },
      countConverted: () => {
        return 40;
      },
      calculateAverage: (s: string) => {
        switch (s) {
          case 'workflow':
            return 50;
          case 'upload':
            return 60;
          case 'rename':
            return 70;
          case 'download':
            return 80;
          case 'conversion':
            return 90;
          default:
            return null;
        }
      },
      countUserAction: (s: string) => {
        switch (s) {
          case 'Download':
            return 40;
          case 'Upload':
            return 50;
          case 'Delete JPG':
            return 60;
          default:
            return null;
        }
      },
    };

    metricStore = {
      successRate: 57,
      averages: {workflow: new AverageSubsetModel(1, 5)},
      filterValue: jest.fn(),
      averageWorkflow: 50,
      averageUpload: 60,
      averageRename: 70,
      averageDownload: 80,
      averageConversion: 90
    };

    subject = shallow(
      <MetricsPage
        metricActions={metricActions}
        metricStore={metricStore}
      />
    );
  });

  it('should render the dashboard', () => {
    expect(subject.find(StyledMetricsTable).exists()).toBeTruthy();
  });

  it('should have a metrics page banner', () => {
    expect(subject.find('#bannerTitle').text()).toBe('Metrics');
  });

  it('should have an export metrics button that exports metrics', () => {
    subject.find('.exportMetrics').simulate('click');
    expect(metricActions.exportMetrics).toHaveBeenCalled();
  });

  it('should display a select menu with options for filtering metrics', () => {
    expect(subject.find('.sortSelector').simulate('change', {target: {value: 60 * 60 * 24}}));
    expect(metricActions.filterMetrics).toHaveBeenCalledWith(60 * 60 * 24);
  });

  it('should render two different tabs', () => {
    expect(subject.find('#tab1').exists()).toBeTruthy();
    expect(subject.find('#tab2').exists()).toBeTruthy();
  });

  it('should display the action times metric card', () => {
    let actionTimesCard = subject.find(StyledMetricCard).at(0);
    expect(actionTimesCard.prop('title')).toBe('Action Times');
    expect(actionTimesCard.prop('icon')).toBe('ActionTimesIcon.svg');

    let avgWorkflowTime = actionTimesCard.childAt(0);
    expect(avgWorkflowTime.exists).toBeTruthy();
    expect(avgWorkflowTime.prop('title')).toBe('Avg. Workflow Time');
    expect(avgWorkflowTime.prop('value')).toBe(50);
    expect(avgWorkflowTime.prop('unit')).toBe('s');
    expect(avgWorkflowTime.prop('difference')).toBe(5);

    let avgUploadTime = actionTimesCard.childAt(1);
    expect(avgUploadTime.exists()).toBeTruthy();
    expect(avgUploadTime.prop('title')).toBe('Avg. Upload Time');
    expect(avgUploadTime.prop('value')).toBe(60);
    expect(avgUploadTime.prop('unit')).toBe('s');
    expect(avgUploadTime.prop('difference')).toBe(6);

    let avgRenameTime = actionTimesCard.childAt(2);
    expect(avgRenameTime.exists()).toBeTruthy();
    expect(avgRenameTime.prop('title')).toBe('Avg. Rename Time');
    expect(avgRenameTime.prop('value')).toBe(70);
    expect(avgRenameTime.prop('unit')).toBe('s');
    expect(avgRenameTime.prop('difference')).toBe(7);

    let avgDownloadTime = actionTimesCard.childAt(3);
    expect(avgDownloadTime.exists()).toBeTruthy();
    expect(avgDownloadTime.prop('title')).toBe('Avg. Download Time');
    expect(avgDownloadTime.prop('value')).toBe(80);
    expect(avgDownloadTime.prop('unit')).toBe('s');
    expect(avgDownloadTime.prop('difference')).toBe(8);

    let avgConversionTime = actionTimesCard.childAt(4);
    expect(avgConversionTime.exists()).toBeTruthy();
    expect(avgConversionTime.prop('title')).toBe('Avg. Conversion Time');
    expect(avgConversionTime.prop('value')).toBe(90);
    expect(avgConversionTime.prop('unit')).toBe('s');
    expect(avgConversionTime.prop('difference')).toBe(9);
  });

  it('should display the user actions metric card', () => {
    let userActionsMetricCard = subject.find(StyledMetricCard).at(1);
    expect(userActionsMetricCard.exists()).toBeTruthy();
    expect(userActionsMetricCard.prop('title')).toBe('User Actions');
    expect(userActionsMetricCard.prop('icon')).toBe('UserActionsIcon.svg');

    let ppSlidesConvertedMetric = userActionsMetricCard.childAt(0);
    expect(ppSlidesConvertedMetric.exists()).toBeTruthy();
    expect(ppSlidesConvertedMetric.prop('title')).toBe('Powerpoint Slides Converted');
    expect(ppSlidesConvertedMetric.prop('value')).toBe(40);

    let zipFilesDownloadedMetric = userActionsMetricCard.childAt(1);
    expect(zipFilesDownloadedMetric.exists()).toBeTruthy();
    expect(zipFilesDownloadedMetric.prop('title')).toBe('Zip Files Downloaded');
    expect(zipFilesDownloadedMetric.prop('value')).toBe(40);

    let powerpointsUploaded = userActionsMetricCard.childAt(2);
    expect(powerpointsUploaded.exists()).toBeTruthy();
    expect(powerpointsUploaded.prop('title')).toBe('Powerpoints Uploaded');
    expect(powerpointsUploaded.prop('value')).toBe(50);

    let jpegsDeletedMetric = userActionsMetricCard.childAt(3);
    expect(jpegsDeletedMetric.exists()).toBeTruthy();
    expect(jpegsDeletedMetric.prop('title')).toBe('JPEGs Deleted');
    expect(jpegsDeletedMetric.prop('value')).toBe(60);
  });

  it('should display the unicorn metric card for success rate', () => {
    let unicornMetricCard = subject.find(StyledMetricCard).at(2);
    expect(unicornMetricCard.exists()).toBeTruthy();
    expect(unicornMetricCard.prop('title')).toBe('UNICORN Metrics');
    expect(unicornMetricCard.prop('icon')).toBe('UnicornIcon.svg');

    let successRateMetric = unicornMetricCard.childAt(0);
    expect(successRateMetric.type()).toBe(StyledMetric);
    expect(successRateMetric.prop('title')).toBe('Upload Success Rate');
    expect(successRateMetric.prop('value')).toBe(metricStore.successRate);
    expect(successRateMetric.prop('unit')).toBe('%');

    let totalAttemptsMetric = unicornMetricCard.childAt(1);
    expect(totalAttemptsMetric.type()).toBe(StyledMetric);
    expect(totalAttemptsMetric.prop('title')).toBe('Upload Attempts');
    expect(totalAttemptsMetric.prop('value')).toBe(metricStore.uploadToUnicornAttempts);
  });
});