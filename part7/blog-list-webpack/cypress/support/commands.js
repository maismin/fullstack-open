// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/login',
    body: {
      username,
      password,
    },
  }).then(response => {
    window.localStorage.setItem(
      'loggedBlogappUser',
      JSON.stringify(response.body),
    )
  })
})

Cypress.Commands.add('initializeUser', (username, name, password) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/users',
    body: {
      username,
      password,
      name,
    },
  })
})

Cypress.Commands.add('resetDB', () => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/testing/reset',
  })
})
