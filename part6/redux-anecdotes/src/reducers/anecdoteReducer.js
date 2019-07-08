import { cloneDeep } from 'lodash'

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'LIKE',
    data: {
      id
    }
  }
}

export const sortAnecdotes = () => {
  return {
    type: 'SORT'
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'LIKE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'SORT':
      const newState = cloneDeep(state).sort((a,b) => b.votes - a.votes)
      return newState
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer