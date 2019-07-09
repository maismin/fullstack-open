import React from 'react'
import { connect } from 'react-redux'
import {
  setNotification,
  clearNotification
} from '../reducers/notificationReducer'
import {
  voteAnecdote,
  sortAnecdotes
} from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const vote = async (id) => {
    const anecdote = props.visibleAnecdotes.find(a => a.id === id)
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    props.voteAnecdote(newAnecdote.id, newAnecdote)
    props.setNotification(`you voted "${anecdote.content}"`, 5000)
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
  setNotification,
  clearNotification,
  voteAnecdote,
  sortAnecdotes
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)