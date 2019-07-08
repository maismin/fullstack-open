import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  createNotification,
  clearNotification
} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  let formRef = React.createRef()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createNotification(`'${content}' added`)
    formRef.reset()
    setTimeout(() => {
      props.clearNotification()
    }, 5000)
    props.createAnecdote(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote} ref={(el) => formRef = el}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  createNotification,
  clearNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)