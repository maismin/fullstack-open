import React from 'react'
import 'jest-dom/extend-expect'
import {
  render,
  fireEvent,
  cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let blog
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()
    blog = {
      title: 'this is the blog title',
      author: 'John Doe',
      likes: 14
    }
  })

  afterEach(cleanup)

  test('renders blog', () => {
    const component = render(
      <SimpleBlog blog={blog} onClick={mockHandler}/>
    )

    expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(component.container).toHaveTextContent(`blog has ${blog.likes} likes`)
  })

  test('when like button is pressed twice, the event handler passed as prop is called twice', () => {
    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler}/>
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})