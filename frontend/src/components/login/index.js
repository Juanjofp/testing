import React from 'react';
import './styles.css';
import { Redirect } from 'react-router-dom';
import {
    Card
} from 'material-ui/Card';
import Button from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

const Login = (props) => {
    //console.log('Login Render', props);
    const { from } = props.location.state || { from: { pathname: '/' } };
    if(props.isLogin) {
        return (
            <Redirect to={ from }/>
        );
    }

    return (
        <div
            className='LoginPage'>
            <Card>
                <div className='LoginDialog'>
                    <div className='AvatarLogin'>
                        <Avatar
                            src='http://quizup-players.imgix.net/avatars/Avatar_astronaut-large-hd.png'
                            alt='User default avatar'
                            size={80}/>
                    </div>
                    <div className='InputLogin'>
                        <TextField
                            id='login_username_field'
                            hintText='Write your username or email'
                            data-testid='login-email'
                            onChange={(event) => {
                                //console.log('username', event.target.value);
                                props.updateUsername(event.target.value);
                            }}
                            value={props.username}/>
                    </div>
                    <div className='InputLogin'>
                        <TextField
                            id='login_password_field'
                            type='password'
                            hintText='Write your password'
                            data-testid='login-password'
                            onChange={(event) => {
                                //console.log('passwd', event.target.value);
                                props.updatePassword(event.target.value);
                            }}
                            value={props.password}/>
                    </div>
                    <div className='LoginButton'>
                        <Button
                            id='login_submit_button'
                            label='LOGIN'
                            primary={true}
                            style={{width: '240px'}}
                            disabled={props.isLoading}
                            data-testid='login-submit'
                            onClick={
                                () => {
                                    props.login(props.username, props.password);
                                }
                            }/>
                    </div>
                    { props.isLoading && <span className='LoginLoading'>Loading...</span> }
                    <Snackbar
                        open={!!props.hasErrors}
                        message={!!props.hasErrors && props.hasErrors.message}
                        autoHideDuration={6000}
                        onRequestClose={props.loginClearError}
                        data-testid='error-message'
                    />
                </div>
            </Card>
        </div>
    );
};
Login.displayName = 'Login';
export default Login;