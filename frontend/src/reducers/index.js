import { combineReducers } from 'redux';

import logger from './logger';
import auth, * as authSelectors from './auth';
import ui, * as uiSelectors from './ui';

export default combineReducers({
    logger,
    auth,
    ui
});
// Auth Selectors
export const isAuthLogin = (state) => authSelectors.isLogin(state.auth);
export const isAuthAdmin = (state) => authSelectors.isAdmin(state.auth);
export const isAuthAdminLoading = (state) => authSelectors.isLoading(state.auth);
export const hasAuthAdminErrors = (state) => authSelectors.hasErrors(state.auth);
export const getAuthUserInfo = (state) => authSelectors.getUser(state.auth);
export const getAuthUserToken = (state) => authSelectors.getToken(state.auth);

// UI Selectors
export const isUIDrawerOpen = (state) => uiSelectors.isDrawerOpen(state.ui);
export const getUIUsernameFromLogin = (state) => uiSelectors.getUsernameFromLogin(state.ui);
export const getUIPasswordFromLogin = (state) => uiSelectors.getPasswordFromLogin(state.ui);

