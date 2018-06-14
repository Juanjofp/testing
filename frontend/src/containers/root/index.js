// TODO: Main container, it will be suscribed to store to get updates from auth reducer 
import { connect } from 'react-redux';

import {
    logout,
    login
} from '../../actions/auth';
import {
    openDrawer,
    closeDrawer
} from '../../actions/ui_menu';
import {
    isAuthLogin,
    isAuthAdmin,
    getAuthUserInfo,
    isUIDrawerOpen
} from '../../reducers';

import App from '../../components/app';

const mapState2Props = (state) => {
    return {
        isLogin: isAuthLogin(state),
        isAdmin: isAuthAdmin(state),
        user: getAuthUserInfo(state),
        isDrawerOpen: isUIDrawerOpen(state)
    };
};

export default connect(
    mapState2Props,
    {
        login,
        logout,
        openDrawer,
        closeDrawer
    }
)(App);