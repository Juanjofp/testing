// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
Cypress.Commands.add(
    'logout',
    () => {
        return cy
            .window()
            .its('localStorage')
            .invoke('removeItem', 'token');
    }
);

Cypress.Commands.add(
    'login',
    () => {
        cy
        .visit('login')
        .getByTestId('login-email')
        .type('juanjo@centic.es')
        .getByTestId('login-password')
        .type('123456')
        .getByTestId('login-submit')
        .click();

        cy.contains(`[data-testid='public-main']`, 'Home');
    }
);
