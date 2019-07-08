import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
  const style = {
    marginTop: 10,
  }

  return (
    <div style={style}>
      filter
      <input onChange={(e) => props.filterChange(e.target.value)} />
    </div>
  )
}

const mapDispatchToProps = {
  filterChange
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)