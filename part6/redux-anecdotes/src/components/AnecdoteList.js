import React from 'react'
import {
  createNotification,
  clearNotification
} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const store = props.store
  const { anecdotes, filter } = store.getState()
  
  const filteredAnecdotes = anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    store.dispatch({
      type: 'LIKE',
      data: {
        id
      }
    })
    store.dispatch({
      type: 'SORT'
    })
    store.dispatch(createNotification(`you voted "${anecdote.content}"`))
    setTimeout(() => {
      store.dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList