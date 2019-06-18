import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const DisplayQuote = ({ quote }) => (
  <div>
    {quote}
  </div>
)

const DisplayVotes = ({ numVotes }) => (
  <div>
    has {numVotes} votes
  </div>
)

const Title = ({ text }) => (
  <div>
    <h1>{text}</h1>
  </div>
)

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [idxOfMaxVotes, setIdxOfMaxVotes] = useState(0)

  const selectRandomQuote = () => {
    setSelected(getRandomInt(0, anecdotes.length))
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    if (copy[selected] > copy[idxOfMaxVotes]) {
      setIdxOfMaxVotes(selected)
    }
  }

  return (
    <div>
      <Title text='Anecdote of the day' />
      <DisplayQuote quote={anecdotes[selected]} />
      <DisplayVotes numVotes={points[selected]} />
      <div>
        <Button handleClick={vote} text='vote' />
        <Button handleClick={selectRandomQuote} text='next anecdote' />
      </div>
      <Title text='Anecdote with most votes' />
      <DisplayQuote quote={anecdotes[idxOfMaxVotes]} />
      <DisplayVotes numVotes={points[idxOfMaxVotes]} />
    </div>
  )
}



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)