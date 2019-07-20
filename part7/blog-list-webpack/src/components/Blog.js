import React from 'react'
import { connect } from 'react-redux'
import {
  likeBlog,
  sortBlogs,
  deleteBlog,
  addComment,
} from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'
import { withRouter } from 'react-router-dom'
import { Button, Comment, Form, Header, Segment } from 'semantic-ui-react'

const BlogWithNoHistory = props => {
  if (props.blogs.length === 0) {
    return null
  }
  const blog = props.blogs.find(blog => blog.id === props.id)

  const handleLike = async blog => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    await props.likeBlog(newBlog.id, newBlog)
    props.setMessage(
      `'${blog.title}' by ${blog.author} liked!`,
      'success',
      3000
    )
    props.sortBlogs()
  }

  const handleDelete = blog => {
    try {
      const result = window.confirm(
        `remove blog '${blog.title}' by ${blog.author}?`
      )
      if (result) {
        props.deleteBlog(blog)
        props.setMessage(
          `'${blog.title}' by ${blog.author} deleted`,
          'success',
          3000
        )
        props.history.push('/')
      }
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleComment = event => {
    event.preventDefault()
    props.addComment(blog, event.target.comment.value)
    event.target.reset()
  }

  return (
    <div>
      <Segment>
        <Header as='h3'>
          {blog.title} {blog.author}
        </Header>
        <a href={blog.url} target='_blank' rel='noopener noreferrer'>
          {blog.url}
        </a>{' '}
        <br />
        {blog.likes} likes{' '}
        <Button
          color='blue'
          icon='thumbs up outline'
          onClick={() => handleLike(blog)}
        ></Button>{' '}
        <br />
        added by {blog.user.name} <br />
        {props.loginUser.username === blog.user.username && (
          <Button onClick={() => handleDelete(blog)}>remove</Button>
        )}
      </Segment>
      <Segment>
        <Comment.Group>
          <Header as='h3' dividing>
            Comments
          </Header>
        </Comment.Group>
        {blog.comments.map((comment, idx) => (
          <Comment key={idx}>
            <Comment.Content>
              <Comment.Author>Anonymous</Comment.Author>
              <Comment.Text>{comment}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
        <Form reply onSubmit={handleComment}>
          <Form.TextArea name='comment' />
          <Button
            content='Add Comment'
            labelPosition='left'
            icon='edit'
            primary
            type='submit'
          />
        </Form>
      </Segment>
    </div>
  )
}

const Blog = withRouter(BlogWithNoHistory)

const mapStateToProps = state => {
  return {
    loginUser: state.loginUser,
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  likeBlog,
  sortBlogs,
  deleteBlog,
  setMessage,
  addComment,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
