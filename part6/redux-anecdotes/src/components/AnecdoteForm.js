import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  createNotification,
  clearNotification
} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const store = props.store
  let formRef = React.createRef()

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    const anecdoteAction = createAnecdote(anecdote)
    const notificationAction = createNotification(`'${anecdote}' added`)
    store.dispatch(anecdoteAction)
    store.dispatch(notificationAction)
    formRef.reset()
    setTimeout(() => {
      store.dispatch(clearNotification())
    }, 5000)
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

export default AnecdoteForm