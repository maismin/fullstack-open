import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const DisplayCountryInfo = ({ country }) => {
  const [ weatherInfo, setWeatherInfo ] = useState({})

  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
  const URL = 'http://api.apixu.com/v1/current.json?key=' + WEATHER_API_KEY + '&q=' + country.capital
  
  const fetchData = () => {
    axios
      .get(URL)
      .then(response => {
        setWeatherInfo(response.data)
      }) 
  }

  useEffect(fetchData, [])

  const languages = country.languages.map(language => <li key={language.name}>{language.name}</li>)
  

  return (
    <div>
      <h2>{country.name}</h2>
      <div>
        capital {country.capital}
      </div>
      <div>
        population {country.population}
      </div>
      <h2> languages</h2>
      <ul>
        {languages}
      </ul>
      <img src={country.flag} alt={country.name} height='200' width='400' />
      <Weather country={country} weatherInfo={weatherInfo} />
    </div>
  )  
}

export default DisplayCountryInfo