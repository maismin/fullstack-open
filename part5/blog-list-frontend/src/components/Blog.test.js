import React from 'react'
import {
  render,
  fireEvent
} from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog
  let mockLikeHandler
  let mockDeleteHandler
  let component

  beforeEach(() => {
    mockLikeHandler = jest.fn()
    mockDeleteHandler = jest.fn()

    blog = {
      title: 'this is the blog title',
      author: 'John Doe',
      url: 'https://www.fake.com',
      likes: 14,
      user: {
        username: 'dj',
        name: 'Jane Doe'
      }
    }

    component = render(
      <Blog
        blog={blog}
        handleLikes={mockLikeHandler}
        handleDelete={mockDeleteHandler}
      />
    )
  })

  test('at start only the name and blog of blog post is shown', () => {
    const blogInfo = component.container.querySelector('.defaultInfo')
    const hiddenDiv = component.container.querySelector('.moreInfo')

    expect(blogInfo).toBeDefined()
    expect(hiddenDiv).toHaveStyle('display: none')
  })

  test('when blog post is clicked, other info becomes visible', () => {
    const blogInfo = component.container.querySelector('.defaultInfo')
    const hiddenDiv = component.container.querySelector('.moreInfo')

    fireEvent.click(blogInfo)
    expect(hiddenDiv).not.toHaveStyle('display: none')
  })
})