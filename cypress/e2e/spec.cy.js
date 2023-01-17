describe('Homepage spec', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', {
      method: 'GET',
      fixture: 'orders.json'
    })
    cy.visit('http://localhost:3000/')
  });
  it('Should have a title', () => {
    cy.get('h1').should('have.text', 'Burrito Builder')
  });
  it('Should have a record of the orders', () => {
    cy.get('.order').eq(0).should('contain', 'Pat')
      .and('contain', 1)
      .and('contain', "beans",
      "lettuce",
      "carnitas",
      "queso fresco",
      "jalapeno")
  });
  it('Should show if nothing is selected', () => {
    cy.get('p').should('have.text', 'Order: Nothing selected')
  });
  it('Should be able to see the form', () => {
    cy.get('input').should('have.text', '')
    cy.get('[name="beans"]').should('have.text', 'beans')
    cy.get('[name="steak"]').should('have.text', 'steak')
    cy.get('[name="carnitas"]').should('have.text', 'carnitas')
    cy.get('[name="sofritas"]').should('have.text', 'sofritas')
    cy.get('[name="lettuce"]').should('have.text', 'lettuce')
    cy.get('[name="queso fresco"]').should('have.text', 'queso fresco')
    cy.get('[name="pico de gallo"]').should('have.text', 'pico de gallo')
    cy.get('[name="hot sauce"]').should('have.text', 'hot sauce')
    cy.get('[name="guacamole"]').should('have.text', 'guacamole')
    cy.get('[name="jalapenos"]').should('have.text', 'jalapenos')
    cy.get('[name="cilantro"]').should('have.text', 'cilantro')
    cy.get('[name="sour cream"]').should('have.text', 'sour cream')
    cy.get(':nth-child(15)').should('have.text', 'Submit Order')
  })
  it('Should show to input field value', () => {
    cy.get('input[placeholder="Name"]').should('have.text', '').type('Lauren').should('have.value', 'Lauren')
  })
  it('Should be able to fill out an order', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', { fixture: 'post.json' })
    cy.get('input').type('Lauren').should('have.value', 'Lauren')
    cy.get('[name="carnitas"]').should('have.text', 'carnitas').click()
    cy.get('[name="queso fresco"]').should('have.text', 'queso fresco').click()
    cy.get('[name="jalapenos"]').should('have.text', 'jalapenos').click()
    cy.get('p').should('have.text', 'Order: carnitas, queso fresco, jalapenos')
    cy.get(':nth-child(15)').should('have.text', 'Submit Order').click()
    cy.get('section > :nth-child(2)').should('contain', 'Lauren')
    .and('contain', 2)
    .and('contain', "carnitas","queso fresco","jalapeno")
    cy.get('p').should('have.text', 'Order: Nothing selected')
  })
})
