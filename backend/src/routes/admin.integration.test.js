import {
    requestLogin,
    requestRegister
} from './admin';
import {
    deleteUser,
    saveUser
} from '../helpers/storage';

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

describe(
    'Integration Admin',
    () => {
        it(
            'Create and validate a new user',
            async () => {
                // Prepare Test
                let userName = 'juanjo@juanjofp.com',
                        password = '123456',
                        req = {
                        body: {
                            username: userName,
                            password: password
                        }
                    },
                res = createResponse();
                deleteUser(userName);

                await requestRegister(req, res);
                expect(res.statusCode).toBe(200);
                expect(res.jsonObject.token).toBeTruthy();

                await requestLogin(req, res);
                expect(res.statusCode).toBe(200);
                expect(res.jsonObject.token).toBeTruthy();

                // clear test
                deleteUser(userName);
            }
        );

        it(
            'Cannot duplicate users',
            async () => {
                // Prepare Test
                let userName = 'juanjo@juanjofp.com',
                        password = '123456',
                        req = {
                        body: {
                            username: userName,
                            password: password
                        }
                    },
                res = createResponse();
                saveUser(userName, password);

                await requestRegister(req, res);
                expect(res.statusCode).toBe(412);
                expect(res.jsonObject.message).toEqual('User already exists');
                expect(res.jsonObject.token).toBe(undefined);

                await requestLogin(req, res);
                expect(res.statusCode).toBe(200);
                expect(res.jsonObject.token).toBeTruthy();

                // clear test
                deleteUser(userName);
            }
        );

        it(
            'Cannot login with invalid credentials',
            async () => {
                // Prepare Test
                let userName = 'juanjo@juanjofp.com',
                        password = '123456',
                        invalidPassword = '654321',
                        req = {
                        body: {
                            username: userName,
                            password: invalidPassword
                        }
                    },
                res = createResponse();
                deleteUser(userName);
                saveUser(userName, password);

                await requestLogin(req, res);
                expect(res.statusCode).toBe(404);
                expect(res.jsonObject.token).toBe(undefined);
                expect(res.jsonObject.message).toEqual('Password do not match');

                // Clear test
                deleteUser(userName);
            }
        );
    }
);
