import React, { useState, useEffect } from "react";
import axios from "axios";

const DetailedCountry = ( {countryJSObject} ) => {
    const api_key = process.env.REACT_APP_API_KEY
    const address = 'http://api.openweathermap.org/data/2.5/weather?q=' 
    + countryJSObject.capital + '&appid=' + api_key
    console.log(address)
    const languages = Object.values(countryJSObject.languages)
    const [weatherData, setWeatherData] = useState({
      main: {
        temp: ''
      }, 
      wind: {
        speed: '',
        deg: ''
      } 
    })
  
    useEffect(() => {
      axios
      .get(address)
      .then(response =>{
        setWeatherData(response.data)
      })
    },[])
  
    return(
      <>
      <h1>{countryJSObject.name.common}</h1>
      <div>capital: {countryJSObject.capital[0]}</div>
      <div>population: {countryJSObject.population}</div>
      <h2>languages</h2>
      <ul>
        {languages.map(language => 
          <li key={language}>{language}</li>)}
      </ul>
      <img src={countryJSObject.flags.png} />
      <h2>Weather in {countryJSObject.capital[0]}</h2>
      <div><strong>temperature: {Math.floor(weatherData.main.temp-272.15)} Celsius</strong></div>
      <div><strong>wind speed: {Math.floor(weatherData.wind.speed)} kph</strong></div>
      <div><strong> direction: {weatherData.wind.deg} degrees </strong></div>
      </>
    )
  }

  export default DetailedCountry