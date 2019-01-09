import fetch from 'node-fetch';

const username = `juanjo_${Date.now()}@testing`;
const password = '123456';

describe(
    'API /admin',
    () => {

        it(
            '/register should return a token string when send a valid username and password',
            async () => {
                const response = await fetch(
                    'https://api.testing.centic.ovh/admin/register',
                    {
                        method: 'post',
                        body: JSON.stringify({username, password}),
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                const data = await response.json();

                expect(response.status).toBe(200);
                expect(data).toEqual({ token: expect.any(String)});
            }
        );

        it(
            '/register should fails when send a invalid username',
            async () => {
                const response = await fetch(
                    'https://api.testing.centic.ovh/admin/register',
                    {
                        method: 'post',
                        body: JSON.stringify({username: undefined, password}),
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                const data = await response.json();

                expect(response.status).toBe(422);
                expect(data).toEqual({ error: 1001, message: 'Invalid credentials'});
            }
        );

        it(
            '/login should return a token string when send a valid username and password',
            async () => {
                const response = await fetch(
                    'https://api.testing.centic.ovh/admin/login',
                    {
                        method: 'post',
                        body: JSON.stringify({username, password}),
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                const data = await response.json();

                expect(response.status).toBe(200);
                expect(data).toEqual({ token: expect.any(String)});
            }
        );

        it(
            '/login should fails when send a invalid username and password',
            async () => {
                const response = await fetch(
                    'https://api.testing.centic.ovh/admin/login',
                    {
                        method: 'post',
                        body: JSON.stringify({username: undefined, password}),
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                const data = await response.json();

                expect(response.status).toBe(422);
                expect(data).toEqual({ error: 1001, message: 'Invalid credentials'});
            }
        );

        it(
            '/login should fails when username and password no not match',
            async () => {
                const response = await fetch(
                    'https://api.testing.centic.ovh/admin/login',
                    {
                        method: 'post',
                        body: JSON.stringify({username, password: '654321'}),
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                const data = await response.json();

                expect(response.status).toBe(422);
                expect(data).toEqual({ error: 1001, message: 'Invalid credentials'});
            }
        );

        it(
            '/register should fails when username already exists',
            async () => {
                const response = await fetch(
                    'https://api.testing.centic.ovh/admin/register',
                    {
                        method: 'post',
                        body: JSON.stringify({username, password}),
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                const data = await response.json();

                expect(response.status).toBe(422);
                expect(data).toEqual({ error: 1002, message: 'User already exists in database'});
            }
        );
    }
);
