import nock from 'nock';

export const nocker = nock;
export const requester = nock('http://localhost:3003');

export const loginSuccess = (username, password, token) => {
    const response = {
        token: token
    };
    requester.post('/admin/login',{username, password})
    .reply(
        200,
        response
    );
    return response;
}

export const loginFailed404 = (username, password) => {
    const response = {
        code: 404,
        message: 'Password do not match'
    };
    requester.post('/admin/login',{username, password})
    .reply(
        404,
        response
    );
    return response;
};

export const loginFailed412 = (username) => {
    const response = {
        code: 412,
        message: 'Invalid credentials'
    };
    requester.post('/admin/login',{username})
    .reply(
        412,
        response
    );
    return response;
}