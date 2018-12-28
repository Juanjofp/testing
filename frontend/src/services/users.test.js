import {login} from './users';
import { 
    loginSuccess,
    loginFailed,
    nocker,
    loginFailed404,
    loginFailed412
} from './api-fake';
import {sign} from 'jsonwebtoken';

describe(
    'Users service',
    () => {

        beforeEach(() => {
            nocker.cleanAll();
        });
        it(
            'when login with juanjo@triveca.ovh/123456 should return a valid user',
            () => {
                const username = 'juanjo@triveca.ovh';
                const password = '123456';
                const avatar = 'http://www.iconpot.com/icon/preview/male-user-avatar.jpg';
                const token = sign({
                        username: username,
                        avatar: avatar
                    }, 'testsecret');
                loginSuccess(username, password, token);

                const ouput$ = login(username, password);

                return ouput$.toPromise().then(
                    (response) => {
                        expect(response.username).toBe(username);
                        expect(response.avatar).toBe(avatar);
                        expect(response.token).toBe(token);
                        expect(response.admin).toBe(false);
                    }
                );
            }
        );

        it(
            'when login with juanjo@juanjofp.com/123456 should return 404 User and password do not match',
            () => {
                const username = 'juanjo@juanjofp.com';
                const password = '123456';
                loginFailed404(username, password);

                const ouput$ = login(username, password);

                return ouput$.toPromise().then(
                    (response) => {
                        expect(response.errorCode).toBe(404);
                        expect(response.message).toBe('Password do not match');
                    }
                );
            }
        );

        it(
            'when login with juanjo@juanjofp.com/undefined should return 412 Ivalid credentials',
            () => {
                const username = 'juanjo@juanjofp.com';
                const password = undefined;
                loginFailed412(username);
                
                const ouput$ = login(username, password);

                return ouput$.toPromise().then(
                    (response) => {
                        console.log('Result login failed', response);
                        expect(response.errorCode).toBe(412);
                        expect(response.message).toBe('Invalid credentials');
                    }
                );
            }
        );
    }
);