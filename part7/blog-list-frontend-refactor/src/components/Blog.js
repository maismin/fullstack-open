import React, { useState } from 'react'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  const [ showInfo, setShowInfo ] = useState(false)
  const displayInfo = { display: showInfo ? '' : 'none' }
  const toggleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleLike = (blog) => {
    const newBlog = {...blog, likes: blog.likes +1}
    props.likeBlog(newBlog.id, newBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = () => {}

  return (
    <div style={blogStyle}>
      <div onClick={toggleShowInfo} className='defaultInfo'>
        {props.blog.title} {props.blog.author}
      </div>
      <div style={displayInfo} className='moreInfo'>
        <a href={props.blog.url} target='_blank' rel='noopener noreferrer'>{props.blog.url}</a> <br/>
        {props.blog.likes} likes <button onClick={() => handleLike(props.blog)}>like</button> <br/>
        added by {props.blog.user.name} <br/>
        {handleDelete && <button onClick={() => handleDelete()}>remove</button>}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = {
  likeBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (Blog)