/// <reference path="../steps.d.ts" />

let assert = require('assert');

Feature('Home Page');

Scenario('should allow you to edit the activity and time of a image and view image in expanded view', (I) => {
  navigateHomeAndUploadPDF(I);

  I.fillField('#activityInput', 'activity test');
  assert(
    I.grabTextFrom('.slideTitle'),
    '291235ZAPR19_OP_LEPRECHAUN_PHASE_8_ACTIVITY_TEST_STEPHEN_13_RELEASABILITY'
  );

  I.fillField('#timeInput', '1234');
  assert(
    I.grabTextFrom('.slideTitle'),
    '291234ZAPR19_OP_LEPRECHAUN_PHASE_8_ACTIVITY_TEST_STEPHEN_13_RELEASABILITY'
  );
  I.click('.upArrow');
  assert(
    I.grabTextFrom('.slideTitle'),
    '301234ZAPR19_OP_LEPRECHAUN_PHASE_8_ACTIVITY_TEST_STEPHEN_13_RELEASABILITY'
  );
});

Scenario('should edit slide information in the carousel', (I) => {
  navigateHomeAndUploadPDF(I);

  I.waitForText('UNICORN Callout', 10);
  I.click('.thumbnailClickOverlay');
  assert(
    I.grabTextFrom('.currentSlide > .slideTitle'),
    '301234ZAPR19_OP_LEPRECHAUN_PHASE_8_ACTIVITY_TEST_STEPHEN_13_RELEASABILITY'
  );

  clearActivityInput(I);
  I.fillField('#activityInput', 'carousel activity test');

  clearTimeInput(I);
  I.fillField('#timeInput', '0123');

  assert(
    I.grabTextFrom('.currentSlide > .slideTitle'),
    '300123ZAPR19_OP_LEPRECHAUN_PHASE_8_CAROUSEL_ACTIVITY_TEST_STEPHEN_13_RELEASABILITY'
  );
  I.click('.exitIcon');
  assert(
    I.grabTextFrom('.slideTitle'),
    '300123ZAPR19_OP_LEPRECHAUN_PHASE_8_CAROUSEL_ACTIVITY_TEST_STEPHEN_13_RELEASABILITY'
  );
  assert(I.grabTextFrom('.header > h2'), 'JPEG Renamer - Details');
});

Scenario('should restrict uploads to PDFs and delete uploads', (I) => {
  navigateHomeAndSelectMission(I);

  I.attachFile('#browseInput', 'data/blank.txt');
  I.waitForText('File must be a PDF', 10);
  I.attachFile('#browseInput', 'data/AcceptanceMission.pdf');
  assert(
    I.grabTextFrom('#pdfFileName'), 'AcceptanceMission.pdf');

  assert(
    I.grabTextFrom('.slideTitle'),
    '291235ZAPR19_OP_LEPRECHAUN_PHASE_8_ACTY_STEPHEN_13_RELEASABILITY'
  );
  I.waitForText('UNICORN Callout', 10);
  I.click('#deletePP');
  I.waitForText('Are you sure you want to delete the PDF', 10);
  I.click('.btn-primary');
  I.waitForText('PDF File Removed', 10);
  I.waitForText('Drag and drop', 10);
});

Scenario('should validateInput fields before download', (I) => {
  navigateHomeAndUploadPDF(I);

  assert(I.grabTextFrom('.validatingInput:nth-of-type(2) > .errorMessage'), 'The callsign does not match selected mission');
  assert(I.grabTextFrom('.controlUnit > .errorMessage'), 'The releasability field must be chosen');

  I.fillField('#opInput', 'd');
  I.pressKey('Backspace');
  I.fillField('#assetInput', 'TEST11');
  I.dontSee('The callsign does not match selected mission');

  I.fillField('#assetInput', 'a');
  I.pressKey('Backspace');
  I.dontSee('The op name field must not be empty');
  I.dontSee('The callsign field must not be empty');

  I.click('#downloadButton');
  assert(I.grabTextFrom('.validatingInput:first-of-type > .errorMessage'), 'The op name field must not be empty');
  assert(I.grabTextFrom('.validatingInput:nth-of-type(2) > .errorMessage'), 'The callsign field must not be empty');
  assert(I.grabTextFrom('.controlUnit > .errorMessage'), 'The releasability field must be chosen');

  I.fillField('#opInput', 'op test');
  assert(I.grabTextFrom('.validatingInput:first-of-type > .errorMessage'), 'The op name field must not be empty');
  assert(I.grabTextFrom('.validatingInput:nth-of-type(2) > .errorMessage'), 'The callsign field must not be empty');
  assert(I.grabTextFrom('.controlUnit > .errorMessage'), 'The releasability field must be chosen');

  I.fillField('#assetInput', 'asset');
  I.dontSee('The callsign field must not be empty');
  assert(I.grabTextFrom('.validatingInput:nth-of-type(2) > .errorMessage'), 'The callsign does not match selected mission');
  assert(I.grabTextFrom('.controlUnit > .errorMessage'), 'The releasability field must be chosen');

  I.fillField('#assetInput', 'TEST11');
  I.dontSee('The callsign does not match selected mission');
  assert(I.grabTextFrom('.controlUnit > .errorMessage'), 'The releasability field must be chosen');

  I.click('FOUO');
  I.dontSee('The releasability field must be chosen');
});

// @ts-ignore
function navigateHomeAndSelectMission(I) {
  I.amOnPage('/');
  I.waitForText('TEST11', 10);
  I.click('.testId');
  I.waitForText('Mission: TEST11', 10);
}

// @ts-ignore
function navigateHomeAndUploadPDF(I) {
  navigateHomeAndSelectMission(I);
  I.attachFile('#browseInput', 'data/AcceptanceMission.pdf');
  assert(
  I.grabTextFrom('#pdfFileName'), 'AcceptanceMission.pdf');
  assert(
    I.grabTextFrom('.slideTitle'),
    '291235ZAPR19_OP_LEPRECHAUN_PHASE_8_ACTY_STEPHEN_13_RELEASABILITY'
  );
  I.wait(10);
}

// @ts-ignore
function clearActivityInput(I) {
  I.fillField('#activityInput', '');
  for (let i = 0; i < 'activity test'.length; i++) {
    I.pressKey('Backspace')
  }
}

// @ts-ignore
function clearTimeInput(I) {
  I.fillField('#timeInput', '');
  for (let i = 0; i < '1234'.length; i++) {
    I.pressKey('Backspace')
  }
}
