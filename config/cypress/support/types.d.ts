// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Select DOM element by data-testid attribute
         * @example cy.id('sign-in-button')
         */
        id<T extends string>(value: T): Chainable<Element>

		autoViewport(): void
    }
}