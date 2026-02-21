describe('Products Page', () => {

  beforeEach(() => {
    cy.visitHome()
  })


  it('shows a loading state and then products', () => {

    cy.contains(/Loading products.../i).should('exist')

    cy.get('.product-card')
      .should('have.length.at.least', 1)

    cy.contains(/Loading products.../i)
      .should('not.exist')
  })


  it('displays product details', () => {

    cy.get('.product-card')
      .first()
      .within(() => {

        cy.get('.product-title').should('exist')
        cy.get('.product-price').should('contain', '$')
        cy.get('.product-image').should('be.visible')

      })
  })


  it('handles Show more / Show less for long descriptions', () => {

    cy.get('.product-card').then(cards => {

      const card = [...cards].find(el =>
        el.querySelector('.desc-toggle')
      )

      if (!card) {
        cy.log('No expandable description found')
        return
      }

      cy.wrap(card).within(() => {

        cy.get('.desc-toggle')
          .as('toggle')

        cy.get('@toggle').should('contain', 'Show more')
        cy.get('@toggle').click()

        cy.get('@toggle').should('contain', 'Show less')
        cy.get('@toggle').click()

        cy.get('@toggle').should('contain', 'Show more')
      })
    })
  })


  it('supports pagination when multiple pages exist', () => {

    cy.get('.product-card')
      .should('have.length.at.most', 6)

    cy.get('body').then($body => {

      if (!$body.find('.pagination').length) {
        cy.log('Pagination not present')
        return
      }

      cy.get('.pagination button')
        .contains('2')
        .click()

      cy.get('.product-card')
        .first()
        .find('.product-title')
        .invoke('text')
        .then(titlePage2 => {

          cy.get('.pagination button').contains('1').click()

          cy.get('.product-card')
            .first()
            .find('.product-title')
            .invoke('text')
            .should(titlePage1 => {
              expect(titlePage1).not.to.equal(titlePage2)
            })

        })
    })
  })

})