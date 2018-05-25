import {login} from './users';
import {Observable} from 'rxjs';
import nock from 'nock';
import {sign} from 'jsonwebtoken';

describe(
    'Users service',
    () => {
        it(
            'when login with juanjo@juanjofp.com/123456 should return a valid user',
            () => {

                const username = 'juanjo@juanjofp.com';
                const password = '123456';
                const avatar = 'http://www.iconpot.com/icon/preview/male-user-avatar.jpg';
                const token = sign({
                        username: username,
                        avatar: avatar
                    }, 'testsecret');
                const ajax = nock('http://localhost:3003')
                    .post('/admin/login',{username, password})
                    .reply(
                        200,
                        {
                            token: token
                        }
                    );

                const ouput$ = login(username, password);

                return ouput$.toArray().forEach(
                    (result) => {
                        expect(result[0].username).toBe(username);
                        expect(result[0].avatar).toBe(avatar);
                        expect(result[0].token).toBe(token);
                        expect(result[0].admin).toBe(false);
                    }
                );
            }
        );

        it(
            'when login with juanjo@juanjofp.com/123456 should return 422 User and password do not match',
            () => {

                const username = 'juanjo@juanjofp.com';
                const password = '123456';
                const ajax = nock('http://localhost:3003')
                    .post('/admin/login',{username, password})
                    .reply(
                        422,
                        {
                            code: 422,
                            message: 'User and password do not match'
                        }
                    );

                const ouput$ = login(username, password);

                return ouput$.toArray().forEach(
                    (result) => {
                        expect(result[0].errorCode).toBe(422);
                        expect(result[0].message).toBe('User and password do not match');
                    }
                );
            }
        );
    }
);