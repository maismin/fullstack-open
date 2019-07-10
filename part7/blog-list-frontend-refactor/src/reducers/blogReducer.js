import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
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

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE':
      const id = action.data.id
      const updatedBlog = action.data
      return state.map(blog => 
        blog.id !== id ? blog : updatedBlog
      )
    default:
      return state
  }
}

export default reducer