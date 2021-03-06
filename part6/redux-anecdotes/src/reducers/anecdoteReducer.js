import { cloneDeep } from 'lodash'
import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (id, anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id, anecdote)
    dispatch({
      type: 'LIKE',
      data: updatedAnecdote
    })
    dispatch(sortAnecdotes())
  }
  
}

export const sortAnecdotes = () => {
  return {
    type: 'SORT'
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
    dispatch(sortAnecdotes())
  }
  
}

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'LIKE':
      const id = action.data.id
      const changedAnecdote = action.data
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