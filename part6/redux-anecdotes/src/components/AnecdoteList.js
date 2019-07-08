// modify the AnecdoteList so that it accesses the 
// store's state with the help of the connect function
import React from 'react'
import { connect } from 'react-redux'
import {
  createNotification,
  clearNotification
} from '../reducers/notificationReducer'
import {
  voteAnecdote,
  sortAnecdotes
} from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    const anecdote = props.visibleAnecdotes.find(a => a.id === id)
    props.voteAnecdote(id)
    props.sortAnecdotes()
    props.createNotification(`you voted "${anecdote.content}"`)
    setTimeout(() => {
      props.clearNotification()
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.visibleAnecdotes.map(anecdote =>
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

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes
    .filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  createNotification,
  clearNotification,
  voteAnecdote,
  sortAnecdotes
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)