import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from './dashboard';


describe('ModalPopup ', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
  var localStorageMock = (function () {
    var store = {};
    return {
      getItem: function (key) {
        return store[key];
      },
      setItem: function (key, value) {
        store[key] = value.toString();
      },
      clear: function () {
        store = {};
      },
      removeItem: function (key) {
        delete store[key];
      }
    };
  })();
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  it('shallow wrapper instance should not be null', () => {
    const wrapper = shallow(<Dashboard history={[]} planets={[]} />);
    const instance = wrapper.instance();
    expect(instance).toBeInstanceOf(Dashboard);
  });

  it('Testing handleChangeSearchText function', () => {
    const cb = jest.fn();
    const wrapper = shallow(<Dashboard history={[]} planets={[]} searchPlanets={cb} />);
    const instance = wrapper.instance();
    wrapper.instance().handleChangeSearchText({ target: { value: 's' } });
    expect(cb.mock.calls.length).toEqual(1);
  });

  it('Testing onPreviousButtonClick function', () => {
    const cb = jest.fn();
    const wrapper = shallow(<Dashboard history={[]} planets={[]} searchPlanets={cb} />);  
    const instance = wrapper.instance();
    wrapper.instance().onPreviousButtonClick();
    expect(cb.mock.calls.length).toEqual(1);
  });

  it('Testing onNextButtonClick function', () => {
    const cb = jest.fn();
    const wrapper = shallow(<Dashboard history={[]} planets={[]} searchPlanets={cb} />);  
    const instance = wrapper.instance();
    wrapper.instance().onNextButtonClick();
    expect(cb.mock.calls.length).toEqual(1);
  });

  it('Testing onLogout function', () => {
    const wrapper = shallow(<Dashboard history={[]} planets={[]} />);
    const instance = wrapper.instance();
    wrapper.instance().onLogout();
    expect(localStorage.getItem('authorized')).toBeUndefined();
  });
})