import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  likeBlog,
  sortBlogs,
  deleteBlog
} from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'

const Blog = (props) => {
  const [ showInfo, setShowInfo ] = useState(false)
  const displayInfo = { display: showInfo ? '' : 'none' }
  const toggleShowInfo = () => {
    setShowInfo(!showInfo)
  }

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleShowInfo} className='defaultInfo'>
        {props.blog.title} {props.blog.author}
      </div>
      <div style={displayInfo} className='moreInfo'>
        <a href={props.blog.url} target='_blank' rel='noopener noreferrer'>{props.blog.url}</a> <br/>
        {props.blog.likes} likes <button onClick={() => handleLike(props.blog)}>like</button> <br/>
        added by {props.blog.user.name} <br/>
        {
          props.loginUser.username === props.blog.user.username &&
          <button onClick={() => handleDelete(props.blog)}>remove</button>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser
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