describe('nav bar', () => {
  beforeEach(() => {
    cy.resetDB()
    cy.initializeUser('root', 'root', 'root')
    cy.login('root', 'root')
    cy.visit('/')
  })

  it('it shows the name of the user', () => {
    cy.get('[data-cy=user-name-display]').contains('logged in')
  })
})
