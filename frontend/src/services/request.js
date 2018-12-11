import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export const handleError = (error) => {
    let response = {
        errorCode: 418,
        message: error.message || 'Unknown exception'
    };
    if(error.response && error.response.error) {
        response = {
            errorCode: error.response.error,
            message: error.response.message
        };
    }
    return of(response);
};

export const handleResponse = (result, mapping) => {
    let response = {
        errorCode: 418,
        message: 'Invalid response'
    };

    if(result.response.error) {
        response = {
            errorCode: result.response.error,
            message: result.response.message
        };
    }
    else {
        if(mapping && typeof mapping === 'function') {
            response = mapping(result.response);
        }
        else {
            response = result.response;
        }
    }
    return response;
};

export const request = (SERVER) => (method, resource, options={}) => {
    const req = {
            url: SERVER + resource,
            method: method,
            crossDomain: true,
            headers: {...options.headers}
        };
    if(options) {
        if(options.token) {
            req.headers['Authorization'] = 'Bearer ' + options.token;
        }
        if(options.body) {
            req.body = options.body;
        }
    }
    return ajax(req);
};
