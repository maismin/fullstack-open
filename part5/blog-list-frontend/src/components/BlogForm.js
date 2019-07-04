import React from 'react'

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

export default BlogForm