import { combineReducers } from 'redux';

import uiMenu, * as uiMenuSelectors from './menu';
import uiLogin, * as uiLoginSelectors from './login';

export default combineReducers({
    uiMenu,
    uiLogin
});
// Menu Selectors
export const isDrawerOpen = (state) => uiMenuSelectors.isDrawerOpen(state.uiMenu);
// Login Selectors
export const getUsernameFromLogin = (state) => uiLoginSelectors.getUsername(state.uiLogin);
export const getPasswordFromLogin = (state) => uiLoginSelectors.getPassword(state.uiLogin);