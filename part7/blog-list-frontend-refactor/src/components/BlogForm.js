import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ title, author, url, handleBlog }) => (
  <div>
    <h2>Create New</h2>
    <form onSubmit={handleBlog}>
      <div>
        title:
        <input {...title} reset=""/>
      </div>

      <div>
        author:
        <input {...author} reset=""/>
      </div>

      <div>
        url:
        <input {...url} reset=""/>
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

BlogForm.propTypes = {
  handleBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired
}

export default BlogForm