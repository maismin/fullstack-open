import reducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
  let state
  beforeEach(() => {
    state = [
      {
        content: 'If it hurts, do it more often',
        id: '70640',
        votes: 5
      },
      {
        content: 'Adding manpower to a late software project makes it later!',
        id: '34630',
        votes: 3 
      },
      {
        content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        id: '35712',
        votes: 4 
      },
      {
        content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        id: '68991',
        votes: 3
      },
      {
        content: 'Premature optimization is the root of all evil.',
        id: '80294',
        votes: 1
      },
      { 
        content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        id: '977',
        votes: 10
      }
    ]

  })

  test('sorts anecdotes by descending order', () => {
    const action = { type: 'SORT' }
    deepFreeze(state)
    const newState = reducer(state, action)
    expect(newState[0].votes).toBe(10)
  })
})