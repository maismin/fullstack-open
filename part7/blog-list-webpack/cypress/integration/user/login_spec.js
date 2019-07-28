describe('/login', () => {
  beforeEach(() => {
    cy.resetDB()
    cy.initializeUser('root', 'root', 'root')
    cy.visit('/')
  })

  it('successfully loads', () => {
    cy.contains('Log-in to your account')
  })

  it('successfully logs in', () => {
    cy.get('[data-cy=username]').within(() => {
      cy.get('input').type('root')
    })
    cy.get('[data-cy=password]').within(() => {
      cy.get('input').type('root')
    })
    cy.get('[data-cy=login-button]').click()
  })
})
