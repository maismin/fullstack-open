import React from 'react'
import DisplayCountryInfo from './DisplayCountryInfo'

const Button = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      show
    </button>
  )
}

const Display = ({ countries, showCountry }) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if (countries.length === 1) {
    return <DisplayCountryInfo country={countries[0]} />
  }

  const result = countries.map(country => 
    <div key={country.name}>
      {country.name}
      <Button handleClick={() => showCountry(country)} />
    </div>)

  return (
    <div>
      {result}
    </div>
  )
}

export default Display