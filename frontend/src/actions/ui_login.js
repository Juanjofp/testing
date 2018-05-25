import {
    UI_LOGIN_UPDATE_USERNAME,
    UI_LOGIN_UPDATE_PASSWORD
} from '../constants';

export const updateUsername = (username) => {
    return {
        type: UI_LOGIN_UPDATE_USERNAME,
        payload: username
    };
};

export const updatePassword = (password) => {
    return {
        type: UI_LOGIN_UPDATE_PASSWORD,
        payload: password
    };
};