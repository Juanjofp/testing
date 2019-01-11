describe(
    'Root API',
    () => {
        it(
            'return a JSON header',
            () => {
                cy.request('/')
                    .its('headers')
                    .its('content-type')
                    .should('include', 'application/json');
            }
        );

        it(
            'return API name and version',
            () => {
                cy.request('/')
                    .its('body')
                    .should('deep.eq', { name: 'API Testing', version: "2.0"});
            }
        );
    }
);