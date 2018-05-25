import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

export const PrivateRoute = ({ component, isLogin, fallback = '/login', ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                (props) => {
                    return (
                        isLogin ?
                        React.createElement(component, props):
                        <Redirect
                            to={
                                {
                                    pathname: fallback,
                                    state: { from: props.location }
                                }
                            }
                        />
                    );
                }
            }
        />
    );
};

export const PrivateAdminRoute = ({ component, isLogin, isAdmin, fallback = '/login', ...rest }) => {
    return (
        <Route
            {...rest}
            render={
                (props) => {
                    return (
                        isLogin && isAdmin ?
                        React.createElement(component, props):
                        <Redirect
                            to={
                                {
                                    pathname: fallback,
                                    state: { from: props.location }
                                }
                            }
                        />
                    );
                }
            }
        />
    );
};

export const LogoutRoute = ({ component, logout, fallback = '/', ...rest }) => {
    return (
        <Route 
            {...rest}
            render={ 
                (props) => {
                    setTimeout(
                        () => {
                            logout();
                        },
                        0
                    );
                    return (<Redirect to={fallback}/>); 
                }
            }
        />
    );
};