import React, { PureComponent } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
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
                <AppBar position='sticky'>
                    <Toolbar>
                        <IconButton
                            color='inherit'
                            aria-label='Open drawer'
                            onClick={this.props.openDrawer}
                            >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' color='inherit'>
                            SEW
                        </Typography>
                    </Toolbar>
                </AppBar>
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
