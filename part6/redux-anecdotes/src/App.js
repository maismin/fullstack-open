import React from 'react'
import Notification from './components/Notification'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = (props) => {
  const store = props.store
  return (
    <div>
      <Notification store={store} />
      <Filter store={store} />
      <AnecdoteList store={store} />
      <AnecdoteForm store={store} />
    </div>
  )
}

export default App