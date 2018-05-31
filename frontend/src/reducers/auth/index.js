import {
    LOGIN_INIT,
    LOGIN_GRANTED,
    LOGIN_DENIED,
    LOGOUT,
    LOGIN_CLEAR_ERROR
} from '../../constants';

const actions = {
    [LOGIN_INIT](state, action) {
        return {
            error: undefined,
            user: {
                token: undefined,
                username: action.payload.username,
                avatar: undefined,
                isAdmin: undefined
            },
            isLoading: true
        };
    },
    [LOGIN_GRANTED](state, action) {
        return {
            error: undefined,
            user: {
                username: action.payload.username,
                avatar: action.payload.avatar,
                token: action.payload.token,
                isAdmin: !!action.payload.isAdmin
            },
            isLoading: false
        };
    },
    [LOGIN_DENIED](state, action) {
        return {
            ...state,
            error: {
                code: action.payload.code,
                message: action.payload.message
            },
            isLoading: false
        };
    },
    [LOGIN_CLEAR_ERROR](state, action) {
        return {
            ...state,
            error: undefined,
            isLoading: false
        };
    },
    [LOGOUT](state, action) {
        return {
            user: {
                avatar: undefined,
                username: undefined,
                token: undefined,
                isAdmin: undefined,
            },
            error: undefined,
            isLoading: false
        };
    }
};
const initState = {
    user: {},
    error: undefined,
    isLoading: false
};
const auth = (state = initState, action) => {
    if(actions[action.type]) {
        return actions[action.type](state, action);
    }
    return state;
};
export default auth;

export const isLogin = (state) => {
    return !!state.user.token;
};
export const isAdmin = (state) => {
    return !!state.user.isAdmin;
};
export const isLoading = (state) => {
    return !!state.isLoading;
};
export const hasErrors = (state) => {
    if(!!state.error) {
        return state.error;
    }
    return undefined;
};
export const getUser = (state) => {
    if(!state.user.token) {
        return undefined;
    }
    return state.user;
};
export const getToken = (state) => {
    return state.user.token;
};
export const getUserName = (state) => {
    if(!state.user) {
        return undefined;
    }
    return state.user.username;
};
export const getUserAvatar = (state) => {
    if(!state.user) {
        return undefined;
    }
    return state.user.avatar;
};