import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const loginForm = component.queryByTestId('login-form')
    const usernameNode = component.getByLabelText('username')
    const passwordNode = component.getByLabelText('password')

    expect(loginForm).toBeDefined()
    expect(usernameNode.value).toBe('')
    expect(passwordNode.value).toBe('')
    expect(component.queryByTestId('blog-list')).toBeNull()
  })
})