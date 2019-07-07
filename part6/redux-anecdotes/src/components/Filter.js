import React from 'react'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
  const store = props.store

  const handleChange = (event) => {
    store.dispatch(filterChange(event.target.value))
  }

  const style = {
    marginTop: 10,
  }

  return (
    <div style={style}>
      filter
      <input onChange={handleChange} />
    </div>
  )
}

export default Filter