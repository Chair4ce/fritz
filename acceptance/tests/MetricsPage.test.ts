/// <reference path="../steps.d.ts" />

Feature('Metrics Page');

Scenario('should display some metrics and the average time for the actions', (I) => {
  I.amOnPage('/metrics');
  I.see('Avg. Workflow Time');
  I.see('Avg. Upload Time');
  I.see('Avg. Rename Time');
  I.see('Avg. Download Time');
  I.see('Avg. Conversion Time');  
  I.click('#activityLogButton');
  I.waitForText('Converted', 5);
  I.waitForText('Renaming', 5);
  I.waitForText('Conversion', 5);
  I.waitForText('Upload', 5);
});