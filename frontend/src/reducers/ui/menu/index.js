import {
    UI_MENU_OPEN_DRAWER,
    UI_MENU_CLOSE_DRAWER
} from '../../../constants';

const actions = {
    [UI_MENU_OPEN_DRAWER](state, action) {
        return {
            ...state,
            isDrawerOpen: true
        };
    },
    [UI_MENU_CLOSE_DRAWER](state, action) {
        return {
            ...state,
            isDrawerOpen: false
        };
    }
};

const initialState = {
    isDrawerOpen: false
};

const menu = (state = initialState, action) => {
    if(actions[action.type]) {
        return actions[action.type](state, action);
    }
    return state;
};
export default menu;

export const isDrawerOpen = (state) => {
    return !!state.isDrawerOpen;
};
