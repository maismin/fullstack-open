import React, { useState } from 'react'

const Blog = ({ blog, handleLikes,  handleDelete }) => {
  const [ showInfo, setShowInfo ] = useState(false)
  const displayInfo = { display: showInfo ? '' : 'none' }
  const toggleShowInfo = () => {
    setShowInfo(!showInfo)
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
      <div onClick={toggleShowInfo}>
        {blog.title} {blog.author}
      </div>
      <div style={displayInfo}>
        <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a> <br/>
        {blog.likes} likes <button onClick={() => handleLikes(blog)}>like</button> <br/>
        added by {blog.user.name} <br/>
        {handleDelete && <button onClick={() => handleDelete(blog)}>remove</button>}
      </div>
    </div>
  )
}

export default Blog