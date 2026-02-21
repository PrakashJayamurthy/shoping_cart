describe('Navigation', () => {

  it('navigates from products to cart', () => {

    cy.visitHome()

    cy.openCart()

    cy.url().should('include', '/cart')
    cy.get('.cart-page').should('exist')
  })


  it('navigates back to shop from cart page', () => {

    cy.visitHome()

    cy.addFirstProduct()

    cy.openCart()

    cy.get('.back-to-shop').click()

    cy.url().should('eq', `${Cypress.config('baseUrl')}/`)
    cy.get('.product-card').should('have.length.at.least', 1)
  })

})