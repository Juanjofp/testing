import {
    requestLogin
} from './admin';

const createResponse = () => Object.create({
    status(status) {
        this.statusCode = status;
        return this;
    },
    json(resp) {
        this.jsonObject = resp;
        return this;
    },
    send(resp) {
        this.textPlain = resp;
        return this;
    }
});

const requester = (response) => {
    return new Promise(
        (resolve) => {
            response.status(302);
            setTimeout(() => resolve(response), 0);
        }
    );
};

const requesterError = (response) => {
    return new Promise(
        (resolve, reject) => {
            response.status(302);
            setTimeout(() => {
                console.log('Error Boom');
                reject(new Error('Booom!'));
            }, 0);
        }
    );
};

describe(
    'Admin',
    () => {
        it(
            'grant access when receive a valid credentials',
            async () => {
                expect.assertions(2);
                let req = {
                        body: {
                            username: 'juanjo@centic.es',
                            password: '123456'
                        }
                    },
                    res = createResponse();

                    await requestLogin(req, res);

                    expect(res.statusCode).toBe(200);
                    expect(res.jsonObject.token).toBeTruthy();
            }
        );

        it(
            'reject access when receive an invalid credentials',
            async () => {
                expect.assertions(2);
                let req = {
                        body: {
                            username: 'juanjo@centic.es',
                            password: 'invalid'
                        }
                    },
                    res = createResponse();

                    await requestLogin(req, res);

                    expect(res.statusCode).toBe(404);
                    expect(res.jsonObject.token).toBe(undefined);
            }
        );

        it(
            'register new user when receive a valid credentials',
            async () => {
                expect.assertions(2);
                let req = {
                        body: {
                            username: 'juanjo@centic.es',
                            password: '123456'
                        }
                    },
                    res = createResponse();

                    await requestRegister(req, res);

                    expect(res.statusCode).toBe(200);
                    expect(res.jsonObject.token).toBeTruthy();
            }
        );

        it(
            'fails to register user when receive a invalid credentials',
            async () => {
                expect.assertions(2);
                let req = {
                        body: {
                            username: 'juanjo@centic.es',
                            password: '123456'
                        }
                    },
                    res = createResponse();

                    await requestRegister(req, res);

                    expect(res.statusCode).toBe(412);
                    expect(res.jsonObject.token).toBe(undefined);
            }
        );
    }
);

