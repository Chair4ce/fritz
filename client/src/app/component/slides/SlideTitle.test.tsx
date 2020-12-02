import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { SlideTitle } from './SlideTitle';
import { SlideModel } from './models/SlideModel';
import * as moment from 'moment';

describe('SlideTitle', () => {
  let subject: ShallowWrapper;
  let slide: SlideModel;

  beforeEach(() => {
    slide = new SlideModel('', '', '1234', '', false, '1', '1', moment('2019-06-13'));

    subject = shallow(
      <SlideTitle
        slide={slide}
        opName={null}
        asset={null}
        releasability={null}
      />
    );
  });

  it('should render a full title in order for each slide', () => {
    slide = new SlideModel('', '', '1234', 'superduper job', false, '', '', moment('2019-06-14'));
    subject = shallow(
      <SlideTitle
        slide={slide}
        opName={'valid targer'}
        asset={'flybird'}
        releasability={'rel to me & you'}
      />
    );
    expect(subject.find('div').text()).toBe('141234ZJUN19_VALID_TARGER_SUPERDUPER_JOB_FLYBIRD_REL_TO_ME_&_YOU');
  });

  it('should display date and time or placeholder', () => {
    expect(subject.find('div').text()).toContain('131234ZJUN19');
    expect(subject.find('.blue-text-time').exists()).toBeFalsy();
    slide.setTime('');
    expect(subject.find('.blue-text-time').exists()).toBeTruthy();
    expect(subject.find('.blue-text-time').text()).toContain('TTTT');
    expect(subject.find('div').text()).toContain('13TTTTZJUN19');
  });

  it('should display operation or placeholder', () => {
    expect(subject.find('div').text()).toContain('_TGT_NAME');
    subject = shallow(
      <SlideTitle
        slide={slide}
        opName={'op lucky'}
        asset={null}
        releasability={null}
      />
    );
    expect(subject.find('div').text()).not.toContain('_TGT_NAME');
    expect(subject.find('div').text()).toContain('_OP_LUCKY');
  });

  it('should display activity name or placeholder', () => {
    expect(subject.find('div').text()).toContain('_ACTY');
    expect(subject.find('.blue-text-activity').exists()).toBeTruthy();
    slide.setActivity('new thiNg');
    expect(subject.find('div').text()).not.toContain('ACTY');
    expect(subject.find('.blue-text-activity').exists()).toBeFalsy();
    expect(subject.find('div').text()).toContain('_NEW_THING');
  });

  it('should display asset name or placeholder', () => {
    expect(subject.find('div').text()).toContain('_ASSET');
    subject = shallow(
      <SlideTitle
        slide={slide}
        opName={null}
        asset={'big Bertha'}
        releasability={null}
      />
    );
    expect(subject.find('div').text()).not.toContain('_ASSET');
    expect(subject.find('div').text()).toContain('_BIG_BERTHA');
  });

  it('should display releasability or placeholder', () => {
    expect(subject.find('div').text()).toContain('_RELEASABILITY');
    subject = shallow(
      <SlideTitle
        slide={slide}
        opName={null}
        asset={null}
        releasability={'REL to Five Guys'}
      />
    );
    expect(subject.find('div').text()).not.toContain('_RELEASABILITY');
    expect(subject.find('div').text()).toContain('_REL_TO_FIVE_GUYS');
  });
});