import React from 'react'
import { createAnecdote } from './reducers/anecdoteReducer'

const App = (props) => {
  const store = props.store
  const anecdotes = props.store.getState()
  let formRef = React.createRef()

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    const action = createAnecdote(anecdote)
    store.dispatch(action)
    formRef.reset()
  }

  const vote = (id) => {
    store.dispatch({
      type: 'LIKE',
      data: {
        id
      }
    })
    store.dispatch({
      type: 'SORT'
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote} ref={(el) => formRef = el}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App