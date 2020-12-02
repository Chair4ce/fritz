import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { SelectMissionModal } from './SelectMissionModal';
import { MissionModel } from '../unicorn/model/MissionModel';
import { StyledMission } from '../unicorn/Mission/Mission';
import { StyledUnicornMissionLoading } from '../average/loading/UnicornMissionLoading';
import { Provider } from 'mobx-react';

describe('SelectMissionModal', () => {
  let subject: any;
  let unicornStore: any;
  let unicornActions: any;
  let map: any;

  beforeEach(() => {

    map = {};

    document.addEventListener = jest.fn(
      (event, cb) => {
        map[event] = cb;
      }
    );

    unicornActions = {
      initializeStores: jest.fn(),
      closeMissionModal: jest.fn()
    };

    unicornStore = {
      missions: [
        new MissionModel('1', '04-17-19', 'testCallsign1', 'testDescr1', 'openTest1', 'DGS 1', 'Pred'),
        new MissionModel('2', '04-18-19', 'testCallsign2', 'testDescr2', 'openTest2', 'DGS 1', 'Pred'),
        new MissionModel('3', '04-19-19', 'testCallsign3', 'testDescr3', 'openTest3', 'DGS 1', 'Pred')
      ],
      selectedSite: 'DGS 1',
      setLoading: jest.fn(),
      loading: jest.fn(),
      sites: [
        'DGS 1',
        'DGS 2',
        'DGS 3'
      ],
      setMissions: () => {
        unicornStore.missions = [];
      }
    };

    subject = mount(
      <Provider
        unicornActions={unicornActions}
        unicornStore={unicornStore}
        uploadActions={{} as any}
        slidesActions={{} as any}
      >
        <SelectMissionModal
          unicornActions={unicornActions}
          unicornStore={unicornStore}
        />
      </Provider>
    );
  });

  it('should initialize the stores', () => {
    expect(unicornActions.initializeStores).toHaveBeenCalled();
  });

  it('should display a list of missions', () => {
    expect(subject.find(StyledMission).length).toBe(3);
  });

  it('should render a loading state when the missions are populating', () => {
    unicornStore.setLoading(true);
    unicornStore.setMissions([]);
    subject = shallow(
      <SelectMissionModal
        unicornActions={unicornActions}
        unicornStore={unicornStore}
      />
    );
    expect(subject.find(StyledUnicornMissionLoading).exists()).toBeTruthy();
  });

  it('should call a function when clicked outside the modal', () => {
    map.keydown({keyCode: 27});
    expect(unicornActions.closeMissionModal).toHaveBeenCalled();
  });

  it('should call a fucntion when clicked outside', () => {
    map.click({target: document.body});
    expect(unicornActions.closeMissionModal).toHaveBeenCalled();
  });
});
