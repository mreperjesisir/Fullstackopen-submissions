import React from 'react'
import DetailedCountry from './DetailedCountry'
import Country from './Country'

const CountryList = ( {countries} ) => {

    if (countries.length>10){
      return(
        <div>Too many matches, specify another filter</div>
      )} else if (countries.length===1) {
        return(
          <DetailedCountry countryJSObject={countries[0]} />
        )
      } else {
       return(
        <ul>
          {countries.map(country =>
            <Country key={country.name.official}
            countryObject={country} 
            countryName={country.name.common}  />
          )}
        </ul>
      ) 
    }
  }

  export default CountryList