import {
    LOGIN,
    LOGIN_INIT,
    LOGIN_GRANTED,
    LOGIN_DENIED,
    LOGIN_CLEAR_ERROR,
    LOGOUT
} from '../constants';

import {
    saveAuth,
    clearAuth
} from '../services/local-storage';

export const login = (username, password) => {
    return {
        type: LOGIN,
        payload: {
            username,
            password
        }
    };
};

export const fetchLogin = (username, password) => {
    return {
        type: LOGIN_INIT,
        payload: {
            username,
            password
        }
    };
};

export const loginGranted = (username, avatar, token, isAdmin = false) => {
    saveAuth(username, avatar, token, isAdmin);
    return {
        type: LOGIN_GRANTED,
        payload: {
            username,
            avatar,
            token,
            isAdmin
        }
    };
};

export const loginDenied = (message) => {
    return {
        type: LOGIN_DENIED,
        payload: {
            code: 401,
            message: message
        }
    };
};

export const loginClearError = () => {
    return {
        type: LOGIN_CLEAR_ERROR
    };
};

export const logout = () => {
    clearAuth();
    return { type: LOGOUT };
};
