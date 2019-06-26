import React from 'react'
let _ = require('lodash')

const Weather = ({ country, weatherInfo }) => {
  if (_.isEmpty(weatherInfo)) {
    return (<div></div>)
  }
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p><b>temperature: </b>
        {weatherInfo.current.temp_c} Celsius
      </p>
      <p>
        <img src={weatherInfo.current.condition.icon} 
             alt={weatherInfo.current.condition.text} />
      </p>
      <p><b>wind: </b> 
        {weatherInfo.current.wind_kph} kph
        direction {weatherInfo.current.wind_dir}
      </p>
    </div>
  )
}

export default Weather