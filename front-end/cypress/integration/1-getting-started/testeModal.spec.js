describe('can visit app', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/teste')
    })
  
    it('Modal Funcionando', () => {
      // https://on.cypress.io/type
      cy.get('#testModal').click()
    })
  
  it('Inserir dados', () => {
      // https://on.cypress.io/type
      cy.get('#testModal').click()
      cy.get('#Modelo').type('Astra')
      cy.get('#Placa').type('QYT-1234')
      cy.get('#Comum').click()
      cy.get('#Observacao').type('Carro muito sujo')
      cy.get('#Cartao').click()
      cy.get('#cupomSelector').should('have.value', '')
  
    })
    it('Preço da lavagem comum correta', () => {
      // https://on.cypress.io/type
      cy.get('#testModal').click()
      cy.get('#Comum').click()
      cy.get("#precoLavagem").should('have.value', 'R$ 50,00')
  
    })
    it('Preço da lavagem premium correta', () => {
      // https://on.cypress.io/type
      cy.get('#testModal').click()
      cy.get('#Premium').click()
      cy.get("#precoLavagem").should('have.value', 'R$ 75,00')
  
    })
    it('Método de cartão aceito', () => {
      // https://on.cypress.io/type
      cy.get('#testModal').click()
      cy.get('#Cartao').click()
      cy.get("#metodoPagamento").should('have.value', 'card')
  
    })
    it('Método de dinheiro aceito', () => {
      // https://on.cypress.io/type
      cy.get('#testModal').click()
      cy.get('#Dinheiro').click()
      cy.get("#metodoPagamento").should('have.value', 'cash')
  
    })
    it('Não deve haver cupons', () => {
      // https://on.cypress.io/type
      cy.get('#testModal').click()
      cy.get('#cupomSelector').should('have.value', '')
  
    })
  
    it('há cupons', () => {
      // https://on.cypress.io/type
      cy.get('#testModal').click()
      cy.get('#cupomSelector').should('not.have.value', '')
  
    })
  })