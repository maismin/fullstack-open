import React from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'

const BlogForm = (props) => {
  let formRef = React.createRef()
  const handleAddBlog = async event => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    props.addBlog(newBlog)
    props.setMessage(`a new blog '${newBlog.title}' by ${newBlog.author} added`, 'success', 3000)
    formRef.reset()
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleAddBlog} ref={(el) => formRef = el}>
        <div>
          title:
          <input name="title"/>
        </div>

        <div>
          author:
          <input name="author"/>
        </div>

        <div>
          url:
          <input name="url"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addBlog,
  setMessage
}

export default connect(
  null,
  mapDispatchToProps
)(BlogForm)