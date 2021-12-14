/// <reference types="cypress" />
// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('can visit app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Usuario ainda nao logado', () => {
    // https://on.cypress.io/type
    cy.get('.isLogged')
      .should('have.value', 'none')
  })

  it('Posição do mapa correta', () => {
    // https://on.cypress.io/type
    cy.get('#mapPosition')
      .should('have.value', '-24.0308025 -52.3821952')
  })
  
  it('Login do google ', () => {
    // https://on.cypress.io/type
    cy.get('#loginBotao').click()
    
  })
})