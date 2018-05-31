import {ActionsObservable} from 'redux-observable';
import toArray from 'rxjs/add/operator/toArray';
import { loginEpic } from './index';
import {
    login,
    loginDenied,
    loginGranted,
    fetchLogin
} from '../../actions/auth';
import * as APIUser from '../../services/users';
import { LOGIN_INIT, LOGIN_GRANTED, LOGIN_DENIED } from '../../constants';

jest.mock(
    '../../services/users',
    () => {
        let response = {};
        return {
            login: () => require('rxjs').Observable.of(response),
            _setResponse: (resp) => response = resp
        };
    }
);
jest.mock(
    '../../services/local-storage',
    () => {
        return {
            saveAuth: () => jest.fn(),
            clearAuth: () => jest.fn()
        };
    }
);

describe(
    'Auth Epic',
    () => {
        it(
            'successfull login should dispatch login granted action',
            () => {
                const username = 'juanjo@juanjofp.com';
                const password = '123456';
                const avatar = 'http://avatar/image';
                const token = 'tokensuperlargopreferiblementemockeado';
                APIUser._setResponse({username, password, avatar, token, admin: false});
                const initAction = login(username, password);
                const fetchLoginAction = fetchLogin(username, password);
                const loginGrantedAction = loginGranted(username, avatar, token, false);

                const action$ = ActionsObservable.of(initAction);
                const out$ = loginEpic(action$);

                return out$.toArray().forEach(
                    (action) => {
                        expect(Array.isArray(action)).toBe(true);
                        expect(action.length).toBe(2);
                        expect(action[0].type).toBe(LOGIN_INIT);
                        expect(action[0]).toEqual(fetchLoginAction);
                        expect(action[1].type).toBe(LOGIN_GRANTED);
                        expect(action[1]).toEqual(loginGrantedAction);
                    }
                );

            }
        );

        it(
            'bad login should dispatch login dinied action',
            () => {
                const username = 'juanjo@juanjofp.com';
                const password = '123456';
                APIUser._setResponse({code: 422, message: 'User and password do not match'});
                const initAction = login(username, password);
                const fetchLoginAction = fetchLogin(username, password);
                const loginDeniedAction = loginDenied('User and password do not match');

                const action$ = ActionsObservable.of(initAction);
                const out$ = loginEpic(action$);

                return out$.toArray().forEach(
                    (action) => {
                        expect(Array.isArray(action)).toBe(true);
                        expect(action.length).toBe(2);
                        expect(action[0].type).toBe(LOGIN_INIT);
                        expect(action[0]).toEqual(fetchLoginAction);
                        expect(action[1].type).toBe(LOGIN_DENIED);
                        expect(action[1]).toEqual(loginDeniedAction);
                    }
                );

            }
        );
    }
);