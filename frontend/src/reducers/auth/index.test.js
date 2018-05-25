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

import reducer from './index';

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

                expect(state.user.username).toEqual(username);
                expect(state.isLoading).toBe(true);
                expect(state.token).toEqual(undefined);
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

                expect(state.user.username).toEqual(payload.username);
                expect(state.user.token).toEqual(payload.token);
                expect(state.user.avatar).toEqual(payload.avatar);
                expect(state.user.isAdmin).toEqual(payload.isAdmin);
                expect(state.error).toEqual(undefined);
                expect(state.isLoading).toBe(false);
            }
        );

        it(
            `${LOGIN_DENIED} action should return the the code and error`,
            () => {
                const message = 'Usuario y contraseña no coinciden';
                const action = loginDenied(message);

                const state = reducer(undefined, action);

                expect(state.user.username).toEqual(undefined);
                expect(state.user.token).toEqual(undefined);
                expect(state.user.avatar).toEqual(undefined);
                expect(state.user.isAdmin).toEqual(undefined);
                expect(state.error.code).toBe(401);
                expect(state.error.message).toEqual(message);
                expect(state.isLoading).toBe(false);
            }
        );

        it(
            `${LOGOUT} action should reset the state`,
            () => {
                const message = 'Usuario y contraseña no coinciden';
                const action = logout();

                const state = reducer(undefined, action);

                expect(state.username).toEqual(undefined);
                expect(state.token).toEqual(undefined);
                expect(state.avatar).toEqual(undefined);
                expect(state.isAdmin).toEqual(undefined);
                expect(state.code).toBe(undefined);
                expect(state.message).toEqual(undefined);
                expect(state.isLoading).toBe(false);
            }
        );
    }
);