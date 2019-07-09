import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  clearNotification
} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  let formRef = React.createRef()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.setNotification(`'${content}' added`, 5000)
    formRef.reset()
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
  setNotification,
  clearNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)