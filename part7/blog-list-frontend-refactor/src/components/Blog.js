import React from 'react'
import { connect } from 'react-redux'
import {
  likeBlog,
  sortBlogs,
  deleteBlog
} from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'

const Blog = (props) => {
  if (props.blogs.length === 0) {
    return null
  }
  const blog = props.blogs.find(blog => blog.id === props.id)

  const handleLike = async (blog) => {
    const newBlog = {...blog, likes: blog.likes +1}
    await props.likeBlog(newBlog.id, newBlog)
    props.setMessage(`'${blog.title}' by ${blog.author} liked!`, 'success', 3000)
    props.sortBlogs()
  }

  const handleDelete = (blog) => {
    try {
      const result = window.confirm(`remove blog '${blog.title}' by ${blog.author}?`)
      if (result) {
        props.deleteBlog(blog)
        props.setMessage(`'${blog.title}' by ${blog.author} deleted`, 'success', 3000)
      }
    } catch(exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <div>
        <h3>{blog.title} {blog.author}</h3>
        <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a> <br/>
        {blog.likes} likes <button onClick={() => handleLike(blog)}>like</button> <br/>
        added by {blog.user.name} <br/>
        {
          props.loginUser.username === blog.user.username &&
          <button onClick={() => handleDelete(blog)}>remove</button>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  likeBlog,
  sortBlogs,
  deleteBlog,
  setMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (Blog)