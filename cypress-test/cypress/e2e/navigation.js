describe(
    'Navigate',
    () => {
        beforeEach(() => {
            return cy.login();
        });

        it(
            'visit private area',
            () => {
                cy.visit('private');

                cy.contains(`[data-testid='private-main']`, 'Privado');
            }
        );

        it(
            'visit admin area',
            () => {
                cy.visit('admin');

                cy.contains(`[data-testid='admin-main']`, 'Administrador');
            }
        );
    }
);