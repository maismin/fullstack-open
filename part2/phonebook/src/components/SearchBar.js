import React from 'react'

const SearchBar = ({ filterName, handleFilterName }) => {
  return (
    <div>
      filter shown with 
      <input value={filterName} onChange={handleFilterName} />
    </div>
  )
}

export default SearchBar