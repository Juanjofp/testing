import {
    UI_MENU_OPEN_DRAWER,
    UI_MENU_CLOSE_DRAWER
} from '../constants';

export const openDrawer = () => {
    return {
        type: UI_MENU_OPEN_DRAWER,
    };
};

export const closeDrawer = () => {
    return {
        type: UI_MENU_CLOSE_DRAWER,
    };
};