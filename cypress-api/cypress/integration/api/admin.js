const user = {
    username: `juanjo_${Date.now()}@testing`,
    password: '123456'
};

describe(
    'Admin API',
    () => {
        it(
            '/register create a new user',
            () => {
                cy.request('POST','/admin/register', user)
                    .its('body')
                    .its('token')
                    .should('to.be.a', 'string');
            }
        );

        it(
            '/login get its token',
            () => {
                cy.request('POST','/admin/login', user)
                    .its('body')
                    .its('token')
                    .should('to.be.a', 'string');
            }
        );

        it(
            '/login return status 422 if send invalid credentials',
            () => {
                cy.request({
                    method: 'POST',
                    url: '/admin/login',
                    body: {password: '123456'},
                    failOnStatusCode: false
                })
                    .its('status')
                    .should('to.be', 422);
            }
        );

        it(
            '/login return ans error if send invalid credentials',
            () => {
                cy.request({
                    method: 'POST',
                    url: '/admin/login',
                    body: {username: user.username, password: '123_456'},
                    failOnStatusCode: false
                })
                    .its('body')
                    .should('deep.eq', {error: 1001, message: 'Invalid credentials'});
            }
        );

        it(
            '/login return ans error if send invalid credentials',
            () => {
                cy.request({
                    method: 'POST',
                    url: '/admin/login',
                    body: {password: '123456'},
                    failOnStatusCode: false
                })
                    .its('body')
                    .should('deep.eq', {error: 1001, message: 'Invalid credentials'});
            }
        );

        it(
            '/register return status 422 if send invalid credentials',
            () => {
                cy.request({
                    method: 'POST',
                    url: '/admin/register',
                    body: {password: '123456'},
                    failOnStatusCode: false
                })
                    .its('status')
                    .should('to.be', 422);
            }
        );

        it(
            '/register return ans error if send invalid credentials',
            () => {
                cy.request({
                    method: 'POST',
                    url: '/admin/register',
                    body: {password: '123456'},
                    failOnStatusCode: false
                })
                    .its('body')
                    .should('deep.eq', {error: 1001, message: 'Invalid credentials'});
            }
        );

        it(
            '/register return status 422 if user already exists',
            () => {
                cy.request({
                    method: 'POST',
                    url: '/admin/register',
                    body: user,
                    failOnStatusCode: false
                })
                    .its('status')
                    .should('to.be', 422);
            }
        );

        it(
            '/register return ans error if user already exists',
            () => {
                cy.request({
                    method: 'POST',
                    url: '/admin/register',
                    body: user,
                    failOnStatusCode: false
                })
                    .its('body')
                    .should('deep.eq', {error: 1002, message: 'User already exists in database'});
            }
        );
    }
);