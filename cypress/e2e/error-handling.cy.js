describe('Error Handling', () => {

  it('shows error message when product fetch fails', () => {

    cy.intercept(
      'GET',
      '**/products.json',
      {
        statusCode: 500,
        body: {}
      }
    ).as('products')

    cy.visitHome()

    cy.wait('@products')

    cy.contains(/Error: Network response was not ok/i)
      .should('exist')
  })


  it('recovers when fetch works', () => {

    cy.intercept('GET', '**/products.json').as('products')

    cy.visitHome()

    cy.wait('@products')

    cy.contains(/Error:/i).should('not.exist')

    cy.get('.product-card')
      .should('have.length.at.least', 1)
  })

})