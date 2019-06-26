import React from 'react'

const SearchBar = ({ country, handleCountry }) => {
  return (
    <div>
      find countries
      <input value={country} onChange={handleCountry} />
    </div>
  )
}

export default SearchBar