import { selectors } from './selectors'

Cypress.Commands.add('visitHome', () => {
  cy.visit('/')
})

Cypress.Commands.add('addFirstProduct', (count = 1) => {
  cy.get(selectors.productCard)
    .first()
    .within(() => {
      for (let i = 0; i < count; i++) {
        cy.get(selectors.quantityBtn).contains('+').click()
      }
    })
})

Cypress.Commands.add('openCart', () => {
  cy.get(selectors.cartLink).click()
})

Cypress.Commands.add('assertCartCount', count => {
  cy.get(`${selectors.cartLink} ${selectors.cartBadge}`)
    .should('contain.text', count)
})