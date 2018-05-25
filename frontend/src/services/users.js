import {Observable} from 'rxjs';
import {decode} from 'jsonwebtoken';
import {
    request,
    handleResponse
} from './request';

const requestUsers = request('http://localhost:3003');

const mapToken2User = (json) => {
    const user = decode(json.token);
    return {
        username: user.username,
        avatar: user.avatar,
        token: json.token,
        admin: user.username.includes('centic') ? true : false
    };
};

const handleLoginError = (error) => {
    let response = {
        errorCode: 418,
        message: error.message || 'Unknown exception'
    };
    if(error.response && error.response.code) {
        response = {
            errorCode: error.response.code,
            message: error.response.message
        };
    }
    return Observable.of(response);
};
export const login = (username, password) => {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            username,
            password
        }
    };
    return requestUsers('POST', '/admin/login', options)
        .map((result) => handleResponse(result,mapToken2User))
        .catch(handleLoginError);
};
