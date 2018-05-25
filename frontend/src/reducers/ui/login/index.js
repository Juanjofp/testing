import {
    UI_LOGIN_UPDATE_USERNAME,
    UI_LOGIN_UPDATE_PASSWORD
} from '../../../constants';

const actions = {
    [UI_LOGIN_UPDATE_USERNAME](state, action) {
        return {
            ...state,
            username: action.payload
        };
    },
    [UI_LOGIN_UPDATE_PASSWORD](state, action) {
        return {
            ...state,
            password: action.payload
        };
    }
};

const initialState = {
    username: '',
    password: ''
};

const uiLogin = (state = initialState, action) => {
    if(actions[action.type]) {
        return actions[action.type](state, action);
    }
    return state;
};
export default uiLogin;

export const getUsername = (state) => {
    return state.username;
};

export const getPassword = (state) => {
    return state.password;
};
