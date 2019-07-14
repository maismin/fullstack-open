import { cloneDeep } from 'lodash'
import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
    dispatch(sortBlogs())
  }
}

export const likeBlog = (id, blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, blog)

    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

export const sortBlogs = () => {
  return {
    type: 'SORT'
  }
}

export const addBlog = (newBlog) => {
  return async dispatch => {
    const returnedBlog = await blogService.create(newBlog)

    dispatch({
      type: 'ADD_BLOG',
      data: returnedBlog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    const response = await blogService.remove(blog.id)

    if (response.status === 204) {
      dispatch({
        type: 'DELETE_BLOG',
        data: blog
      })
    }

  }
}

export const clearBlogs = () => {
  return {
    type: 'CLEAR_BLOGS'
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    const response = await blogService.createComment(blog.id, comment)
    if (response.status === 201) {
      const blogWithNewComment = {...blog}
      blogWithNewComment.comments.push(response.data.comment)
      dispatch({
        type: 'ADD_COMMENT',
        data: blogWithNewComment
      })
    }
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE':
      const updatedBlog = action.data
      return state.map(blog => 
        blog.id !== action.data.id ? blog : updatedBlog
      )
    case 'SORT':
      const newState = cloneDeep(state).sort((a,b) => b.likes - a.likes)
      return newState
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'ADD_COMMENT':
      return state.map(blog =>
        blog.id !== action.data.id ? blog : action.data
      )
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    case 'CLEAR_BLOGS':
      return []
    default:
      return state
  }
}

export default reducer