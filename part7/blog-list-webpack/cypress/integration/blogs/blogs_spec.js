describe('blog', () => {
  const username = 'root'
  const name = 'root'
  const password = 'root'
  const blog = {
    title: 'foobar',
    author: 'John Doe',
    url: 'www.google.com',
  }

  before(() => {
    cy.resetDB()
    cy.initializeUser(username, name, password)
  })

  beforeEach(() => {
    cy.login(username, password)
    cy.visit('/')
  })

  it('creates a new blog', () => {
    cy.contains('new blog').click()

    cy.get('[data-cy=blog-form-title]')
      .find('input')
      .type(blog.title)
      .should('have.value', blog.title)

    cy.get('[data-cy=blog-form-author]')
      .find('input')
      .type(blog.author)
      .should('have.value', blog.author)

    cy.get('[data-cy=blog-form-url]')
      .find('input')
      .type(blog.url)
      .should('have.value', blog.url)

    cy.get('[data-cy=blog-form-submit]').click()

    cy.get('[data-cy=blog-list]')
      .find('a')
      .should('have.html', blog.title)
  })

  it('shows blog info', () => {
    cy.contains(blog.title).click()
    cy.url().should('include', '/blogs/')
  })

  it('can like a blog', () => {
    cy.contains(blog.title).click()

    cy.get('[data-cy=likes]').should('have.text', '0')

    cy.get('[data-cy=like-button]').click()

    cy.get('[data-cy=likes]').should('have.text', '1')
  })

  it('can post a comment', () => {
    const comment = 'test comment'
    cy.contains(blog.title).click()

    cy.get('[name=comment]')
      .type(comment)
      .should('have.value', comment)

    cy.get('[data-cy=comment-submit-button]').click()

    cy.get('.comment')
      .find('.text')
      .should('have.html', comment)
  })
})
