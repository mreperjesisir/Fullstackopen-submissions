import React, {useState} from 'react'
import DetailedCountry from './DetailedCountry'

const Country = ( {countryObject, countryName} ) => {

    const [showDetailed, setShowDetailed] = useState(false)
  
    const onClickHandler = () => {
      setShowDetailed(!showDetailed)
    }
  
    if (!showDetailed){
          return (
            <>
            <div>{countryName}  
            <button onClick={onClickHandler}>Show</button>
            </div>
            </>
          )
        } else {
          return (
            <>
            <DetailedCountry countryJSObject={countryObject}/>
            <button onClick={onClickHandler}>Hide</button>
            </>
          )
        }
  } 

  export default Country