import React from 'react';
import { shallow } from 'enzyme';
import { Login } from './login';


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
        const wrapper = shallow(<Login loginService={()=>jest.fn()} />);
        const instance = wrapper.instance();
        expect(instance).toBeInstanceOf(Login);
    });

    it('Testing handleChangeUserName function', () => {
        const wrapper = shallow(<Login loginService={jest.fn()} />);
        const instance = wrapper.instance();
        wrapper.instance().handleChangeUserName({ target: { value: 'luke' } });
        expect(wrapper.state('username')).toEqual('luke');
    });

    it('Testing handleChangePassword function', () => {
        const wrapper = shallow(<Login loginService={jest.fn()} />);
        const instance = wrapper.instance();
        wrapper.instance().handleChangeUserName({ target: { value: '19bby' } });
        expect(wrapper.state('username')).toEqual('19bby');
    });

    it('Testing onSubmit function', () => {
        const cb = jest.fn();
        const wrapper = shallow(<Login history={[]} loginService={cb} />);
        const instance = wrapper.instance();
        wrapper.setState({ username: 'luke', password: '19bby', validUsers: [{ name: 'luke', birth_year: '19bby' }] });
        wrapper.instance().onSubmit();
        expect(cb.mock.calls.length).toBe(1);
    });

})