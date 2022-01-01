import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './content/CountryList'





const App = () => {
  
  const [countries, setCountries] = useState([])
  const [userInput, setUserInput] = useState('')
  const [showAll, setShowAll] = useState(true)
  const countriesToShow = showAll
    ? countries : countries.filter(country => country.name.common.search(userInput)!==-1)

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  // useEffect is needed here because otherwise the 
  // userInput and showAll doesn't have enought time to
  // set the new values. They are asynchronous! 
  
  useEffect(() => {
    if (userInput!==''){
      setShowAll(false)
      console.log({userInput}, {showAll})
    } else {
      setShowAll(true)
      console.log({userInput}, {showAll})
    }
  },[userInput])

  const onUserInputChange = (event) => {
    setUserInput(event.target.value)
  }

  return (
    <>
    <div>
      find countries <input 
      value={userInput}
      onChange={onUserInputChange} />
    </div>
    <div>
      <CountryList countries={countriesToShow} />
    </div>
    </>
  );
}

export default App;
