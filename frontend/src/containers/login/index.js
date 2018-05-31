import { connect } from 'react-redux';

import {
    login,
    loginClearError
} from '../../actions/auth';

import {
    updateUsername,
    updatePassword
} from '../../actions/ui_login';

import {
    isAuthLogin,
    isAuthAdmin,
    isAuthAdminLoading,
    hasAuthAdminErrors,
    getUIUsernameFromLogin,
    getUIPasswordFromLogin
} from '../../reducers';

import Login from '../../components/login';

const mapState2Props = (state, ownProps) => {
    return {
        isLogin: isAuthLogin(state),
        isAdmin: isAuthAdmin(state),
        isLoading: isAuthAdminLoading(state),
        hasErrors: hasAuthAdminErrors(state),
        username: getUIUsernameFromLogin(state),
        password: getUIPasswordFromLogin(state)
    };
};

export default connect(
    mapState2Props,
    {
        login,
        loginClearError,
        updateUsername,
        updatePassword
    }
)(Login);