import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  createNotification,
  clearNotification
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

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
    const newAnecdote = await anecdoteService.createNew(content)
    props.createAnecdote(newAnecdote)
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