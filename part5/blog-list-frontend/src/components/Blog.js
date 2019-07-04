import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [ showInfo, setShowInfo ] = useState(false)

  const displayInfo = { display: showInfo ? '' : 'none'}
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
        {blog.likes} likes <button>like</button> <br/>
        added by {blog.user.name}
      </div>
    </div>
  )
}

export default Blog