import React, { PureComponent } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AppBar from 'material-ui/AppBar'
import {DrawerMenu} from '../drawer';

import {
    Route,
    Redirect
} from 'react-router-dom';

import {
    PrivateRoute,
    PrivateAdminRoute
} from './private-routes';
import Login from '../../containers/login';
import './styles.css';

const Home = (props) => {
    return (
        <div data-testid='public-main'>Home</div>
    );
};

const Private = (props) => {
    console.log('Private', props);
    return (
        <div data-testid='private-main'>
            Privado
        </div>
    );
};

const Admin = (props) => {
    console.log('Admin', props);
    return (
        <div data-testid='admin-main'>
            Administrador
        </div>
    );
};

class App extends PureComponent {
    state = { errors: null};

    componentDidCatch(error, info) {
        this.setState(
            (state) => ({errors: error.message})
        );
    }
    

    render() {
        if(this.state.errors) {
            return (
                <div>{this.state.errors}</div>
            );
        }
        return (
            <div>
                <AppBar
                    title='Testing Samples'
                    iconClassNameRight='muidocs-icon-navigation-expand-more'
                    onLeftIconButtonTouchTap={this.props.openDrawer}
                    style={{
                        position: 'fixed',
                        paddingTop: 0
                    }}
                />
                <Router>
                    <div>
                        <Route
                            path='/' 
                            render={
                                (props) => (
                                    <DrawerMenu
                                        {...props}
                                        isLogin={this.props.isLogin}
                                        isAdmin={this.props.isAdmin}
                                        user={this.props.user}
                                        isOpen={!!this.props.isDrawerOpen}
                                        closeDrawer={this.props.closeDrawer}/>
                                )
                            }
                        />
                        <div style={{paddingTop: 64, height: '90vh'}}>
                            <Route exact path='/' component={ Home }/>
                            <PrivateRoute path='/private' fallback='/login' isLogin={this.props.isLogin} component={ Private }/>
                            <PrivateAdminRoute path='/admin' fallback='/login' isLogin={this.props.isLogin} isAdmin={this.props.isAdmin} component={ Admin }/>
                            <Route path='/login' component={ Login }/>
                            <Route 
                                path='/logout'
                                render={ 
                                    (props) => {
                                        setTimeout(
                                            () => {
                                                this.props.logout();
                                            },
                                            0
                                        );
                                        return (<Redirect to='/'/>); 
                                    }
                                }
                            />
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
