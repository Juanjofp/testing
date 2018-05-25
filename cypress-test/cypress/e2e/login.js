describe(
    'Login',
    () => {
        beforeEach(() => {
            return cy.logout().visit('login');
        });

        it(
            'Do login successfully',
            () => {
                cy
                .getByTestId('login-email')
                .type('juanjo@centic.es')
                .getByTestId('login-password')
                .type('123456')
                .getByTestId('login-submit')
                .click();

                cy.contains(`[data-testid='public-main']`, 'Home');
            }
        );
    }
);