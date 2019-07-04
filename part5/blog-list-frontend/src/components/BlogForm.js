import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ title, author, url, handleTitle, handleAuthor, handleUrl, handleBlog }) => (
  <div>
    <h2>Create New</h2>
    <form onSubmit={handleBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => handleTitle(target.value)}
        />
      </div>

      <div>
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => handleAuthor(target.value)}
        />
      </div>

      <div>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => handleUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

BlogForm.propTypes = {
  handleTitle: PropTypes.func.isRequired,
  handleAuthor: PropTypes.func.isRequired,
  handleUrl: PropTypes.func.isRequired,
  handleBlog: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm