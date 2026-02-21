describe('Cart Behavior', () => {

  beforeEach(() => {
    cy.visitHome()
  })

  it('updates header cart badge when adding items', () => {

    cy.get('.cart-badge').should('not.exist')

    cy.addFirstProduct(1)
    cy.assertCartCount(1)

    cy.addFirstProduct(1)
    cy.assertCartCount(2)
  })


  it('shows added items on the cart page', () => {

    cy.addFirstProduct()

    cy.openCart()

    cy.url().should('include', '/cart')
    cy.get('.cart-page').should('exist')

    cy.get('.cart-item').should('have.length', 1)
    cy.get('.cart-item .quantity-value').should('contain.text', '1')

    cy.get('.cart-total').should('contain.text', 'Total: $')
  })


  it('updates quantity in cart using + and -', () => {

    cy.addFirstProduct(2)
    cy.assertCartCount(2)

    cy.openCart()

    cy.get('.cart-item').within(() => {

      cy.get('.quantity-value').should('contain.text', '2')

      cy.get('.quantity-btn').contains('-').click()
      cy.get('.quantity-value').should('contain.text', '1')

      cy.get('.quantity-btn').contains('+').click()
      cy.get('.quantity-value').should('contain.text', '2')

    })

    cy.get('.cart-total').should('contain.text', 'Total: $')
  })


  it('removes a single item from cart using remove button', () => {

    cy.addFirstProduct()

    cy.openCart()

    cy.get('.cart-item').should('have.length', 1)

    cy.get('.remove-btn').click()

    cy.contains(/Your cart is empty/i).should('exist')
    cy.get('.cart-badge').should('not.exist')
  })


  it('handles multiple items in cart and combined total', () => {

    cy.addFirstProduct(2)

    cy.get('.product-card').eq(1).within(() => {
      cy.get('.quantity-btn').contains('+').click()
    })

    cy.openCart()

    cy.get('.cart-item').should('have.length.at.least', 2)

    cy.get('.cart-total')
      .invoke('text')
      .should(text => {
        expect(text).to.match(/Total: \$\d/)
      })
  })

})