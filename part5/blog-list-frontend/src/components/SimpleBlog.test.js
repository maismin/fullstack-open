import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders blog', () => {
  const blog = {
    title: 'this is the blog title',
    author: 'John Doe',
    likes: 14
  }

  const component = render(
    <SimpleBlog blog={blog} onClick={null}/>
  )

  expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(component.container).toHaveTextContent(`blog has ${blog.likes} likes`)
})