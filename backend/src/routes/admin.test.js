import {requestLogin, requestRegister} from './admin';
import * as storage from '../helpers/storage';

const createResponse = () =>
    Object.create({
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
        },
    });

jest.mock('../helpers/storage');

describe('Admin', () => {
    it('grant access when receive a valid credentials', async () => {
        let req = {
                body: {
                    username: 'juanjo@centic.es',
                    password: '123456',
                },
            },
            res = createResponse();
        storage.validateUser.mockResolvedValue(true);

        await requestLogin(req, res);

        expect(res.statusCode).toBe(200);
        expect(res.jsonObject.token).toBeTruthy();
    });

    it('reject access when receive an invalid credentials', async () => {
        let req = {
                body: {
                    username: 'juanjo@centic.es',
                    password: 'invalid',
                },
            },
            res = createResponse();
        storage.validateUser.mockResolvedValue(false);

        await requestLogin(req, res);

        expect(res.statusCode).toBe(404);
        expect(res.jsonObject.token).toBe(undefined);
        expect(res.jsonObject.message).toEqual('Password do not match');
    });

    it('register new user when receive a valid credentials', async () => {
        let req = {
                body: {
                    username: 'juanjo@centic.es',
                    password: '123456',
                },
            },
            res = createResponse();
        storage.saveUser.mockResolvedValue(true);

        await requestRegister(req, res);

        expect(res.statusCode).toBe(200);
        expect(res.jsonObject.token).toBeTruthy();
    });

    it('fails to register user when receive a invalid credentials', async () => {
        let req = {
                body: {
                    username: 'juanjo@centic.es',
                    password: '123456',
                },
            },
            res = createResponse(),
            errorMessage = 'User already exists';
        storage.saveUser.mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await requestRegister(req, res);

        expect(res.statusCode).toBe(412);
        expect(res.jsonObject.message).toEqual(errorMessage);
        expect(res.jsonObject.token).toBe(undefined);
    });
});
