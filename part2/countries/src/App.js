import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import Display from './components/Display'

function App() {
  const [ country, setCountry ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ filteredCountries, setFilteredCountries ] = useState([])

  const URL = 'https://restcountries.eu/rest/v2/all'

  const fetchData = () => {
      axios
        .get(URL)
        .then(response => {
          setCountries(response.data)
          setFilteredCountries(response.data)
        })
    }

  useEffect(fetchData, [])

  const handleCountry = (event) => {
    const name = event.target.value
    setCountry(name)
    if (name === '') {
      setFilteredCountries(countries)
    } else {
      const searchResults = countries.filter(country => country['name'].toLowerCase().includes(name.toLowerCase()))
      setFilteredCountries(searchResults)
    }
  }

  const showCountry = (country) => {
    setFilteredCountries([country])
    setCountry(country.name)
  }

  return (
    <div>
      <SearchBar country={country} handleCountry={handleCountry} />
      <Display countries={filteredCountries} showCountry={showCountry} />
    </div>
  );
}

export default App;
