import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
 <button onClick={handleClick}>
   {text}
 </button> 
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
) 


const Statistics = ({good, neutral, bad}) => {
  const calculatedAverage = (good-bad)/(good+neutral+bad)
  const calculatedPositives = (good/(good+neutral+bad))*100
  
  if (good==0&&neutral==0&&bad==0){
    return (
      <p>No feedback given</p>
    )
  }

  return(
    <>
    <h1>Statistics</h1>
    <table>
      <tbody>
    <StatisticLine text='good' value={good}/>
    <StatisticLine text='neutral' value={neutral}/>
    <StatisticLine text='bad' value={bad}/>
    <StatisticLine text='all' value={good+neutral+bad}/>
    <StatisticLine text='average' value={calculatedAverage}/>
    <StatisticLine text='positives' value={calculatedPositives}/>
      </tbody>
    </table>
    </>
  )
}

const App = () => {
  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good+1)
  
  const handleNeutralClick = () => setNeutral(neutral+1)
  
  const handleBadClick = () => setBad(bad+1)

  return (
    <div>
    <h1>Give Feedback</h1>
    <Button handleClick={handleGoodClick} text="Good"/>
    <Button handleClick={handleNeutralClick} text="Neutral"/>
    <Button handleClick={handleBadClick} text="Bad"/>
    <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
