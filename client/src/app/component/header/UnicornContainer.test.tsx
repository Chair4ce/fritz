import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UnicornContainer } from './UnicornContainer';
import { MissionModel } from '../unicorn/model/MissionModel';
import { badCallsignCSS, goodCSS } from '../../../themes/default';

describe('UnicornContainer', () => {
  let subject: ShallowWrapper;
  let unicornStore: any;
  let unicornActions: any;
  let activeMission: MissionModel;
  let slidesStore: any;

  beforeEach(() => {
    activeMission = new MissionModel('', '', 'Kirby1', '', '', '', '');

    unicornStore = {
      activeMission: activeMission,
      offline: false
    };

    unicornActions = {
      resetActiveMission: jest.fn(),
      refreshCallouts: jest.fn(),
      refreshUnicorn: jest.fn()
    };

    slidesStore = {
      differentAsset: false
    };

    subject = shallow(
      <UnicornContainer
        unicornActions={unicornActions}
        unicornStore={unicornStore}
        slidesStore={slidesStore}
      />
    );
  });

  it('should display the correct mission name or prompt to select', () => {
    expect(subject.text()).toContain('Kirby1');
    unicornStore.activeMission = new MissionModel('', '', 'Kirby2', '', '', '', '');
    subject.instance().forceUpdate();
    expect(subject.text()).toContain('Kirby2');
    unicornStore.activeMission = null;
    subject.instance().forceUpdate();
    expect(subject.text()).toContain('None Selected');
  });

  it('should display error styling when callsigns do not match', () => {
    expect(subject.find('.missionContainer').props().style).toEqual(goodCSS);
    slidesStore.differentAsset = true;
    subject.instance().forceUpdate();
    expect(subject.find('.missionContainer').props().style).toEqual(badCallsignCSS);
  });

  it('should clear the select mission on change Mission button click', () => {
    expect(subject.text()).toContain('Change');
    subject.find('.missionContainer').simulate('click');
    expect(unicornActions.resetActiveMission).toHaveBeenCalled();
  });

  it('should refresh callouts', () => {
    expect(subject.text()).toContain('Refresh Callouts');
    subject.find('.refreshContainer').simulate('click');
    expect(unicornActions.refreshCallouts).toHaveBeenCalled();
  });

  it('should display a wheel that spins while isRefreshing', () => {
    expect(subject.find('img').props().className).toBe('stationary');
    expect(subject.find('img').exists()).toBeTruthy();
    expect(subject.find('img').props().src).toBe('RefreshIcon.svg');
    unicornStore.isRefreshing = true;
    subject.instance().forceUpdate();
    expect(subject.find('img').props().className).toBe('rotating');
  });

  it('should display a UNICORN status message and omit mission information when offline', () => {
    unicornStore.offline = true;
    subject.instance().forceUpdate();
    expect(subject.text()).toContain('Refresh UNICORN');
    expect(subject.text()).not.toContain('Refresh Callouts');
    expect(subject.text()).not.toContain('Mission: Kirby1');
    expect(subject.text()).not.toContain('Change');

    subject.find('.refreshBtn').simulate('click');
    expect(unicornActions.refreshUnicorn).toHaveBeenCalled();
  });

});