import React from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import {
  Button,
  Form,
  Header
} from 'semantic-ui-react'

const BlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleAddBlog = async event => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    props.addBlog(newBlog)
    title.reset()
    author.reset()
    url.reset()
    props.setMessage(`a new blog '${newBlog.title}' by ${newBlog.author} added`, 'success', 3000)
  }

  return (
    <div>
      <Header as='h2'>Create New</Header>
      <Form onSubmit={handleAddBlog}>
        <Form.Input fluid placeholder='Title' name='title' {...title} reset=''/>
        <Form.Input fluid placeholder='Author' name='author' {...author} reset=''/>
        <Form.Input fluid placeholder='URL' name='url' {...url} reset=''/>

        <Button type="submit">Create</Button>
      </Form>
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