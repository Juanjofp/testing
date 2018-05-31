import {
    fetchLogin,
    loginGranted,
    loginDenied,
    logout
} from '../../actions/auth';
import {
    LOGIN_INIT,
    LOGIN_GRANTED,
    LOGIN_DENIED,
    LOGOUT
} from '../../constants';

import reducer, * as selectors from './index';

jest.mock(
    '../../services/local-storage',
    () => {
        return {
            saveAuth: jest.fn(),
            clearAuth: jest.fn()
        };
    }
);

describe(
    'Auth reducer',
    () => {
        it(
            `${LOGIN_INIT} action should return state with only username field`,
            () => {
                const username = 'juanjofp';
                const action = fetchLogin(username);

                const state = reducer(undefined, action);

                expect(selectors.getUserName(state)).toEqual(username);
                expect(selectors.isLoading(state)).toBe(true);
                expect(selectors.getToken(state)).toEqual(undefined);
            }
        );

        it(
            `${LOGIN_GRANTED} action should return the user info`,
            () => {
                let payload = {
                    username: 'juanjofp',
                    avatar: 'http://juanjofp.com',
                    token: '123456',
                    isAdmin: false
                };
                let {
                    username,
                    avatar,
                    token,
                    isAdmin
                } = payload;
                const action = loginGranted(username, avatar, token, isAdmin);

                const state = reducer(undefined, action);

                expect(selectors.getUserName(state)).toEqual(payload.username);
                expect(selectors.getToken(state)).toEqual(payload.token);
                expect(selectors.getUserAvatar(state)).toEqual(payload.avatar);
                expect(selectors.isAdmin(state)).toEqual(payload.isAdmin);
                expect(selectors.hasErrors(state)).toEqual(undefined);
                expect(selectors.isLoading(state)).toBe(false);
            }
        );

        it(
            `${LOGIN_DENIED} action should return the the code and error`,
            () => {
                const message = 'Usuario y contraseña no coinciden';
                const action = loginDenied(message);

                const state = reducer(undefined, action);

                expect(selectors.getUserName(state)).toBe(undefined);
                expect(selectors.getToken(state)).toBe(undefined);
                expect(selectors.getUserAvatar(state)).toBe(undefined);
                expect(selectors.isAdmin(state)).toBe(false);
                expect(selectors.hasErrors(state).code).toBe(401);
                expect(selectors.hasErrors(state).message).toEqual(message);
                expect(selectors.isLoading(state)).toBe(false);
            }
        );

        it(
            `${LOGOUT} action should reset the state`,
            () => {
                const message = 'Usuario y contraseña no coinciden';
                const action = logout();

                const state = reducer(undefined, action);

                expect(selectors.getUserName(state)).toEqual(undefined);
                expect(selectors.getToken(state)).toBe(undefined);
                expect(selectors.getUserAvatar(state)).toBe(undefined);
                expect(selectors.isAdmin(state)).toBe(false);
                expect(selectors.hasErrors(state)).toBe(undefined);
                expect(selectors.isLoading(state)).toBe(false);
            }
        );
    }
);