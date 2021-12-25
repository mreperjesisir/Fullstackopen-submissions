import React, { useState } from 'react'

const App = () => {
  const [selected, setSelected] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [votes, setvotes] = useState(Array(anecdotes.length).fill(0))
  console.log('The votes are ', votes)
  const mostVotes = Math.max(...votes)
  console.log('The most votes are ', mostVotes)

  const isLargest = (number) => number >= mostVotes

  const handleClick = () => {
  //If defining @randomInt before anecdote,
  //the random number generator gets "stuck"
  //and will keep throwing the same number
  //every time, so I define it here 
  const randomInt = Math.floor(Math.random() * 7) 
   return (
    setSelected(randomInt) 
   )
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] ++
    setvotes(copy)
    //Show a new random anecdote after voting
    //to prevent voting twice
    handleClick()
  }

  return (
    <>
    <h1>Anecdote of the day</h1>
    <div>
      {anecdotes[selected]}
    </div>
    <div>
      Has {votes[selected]} votes  
    </div> 
    <button onClick={handleVote}>vote</button>
    <button onClick={handleClick}>new anecdote</button>
    <h1>Anecdote with the most votes</h1>
    <div>
      {anecdotes[votes.findIndex(isLargest)]}
    </div>
    <div>Has {mostVotes} votes</div>
    </>
  )
}

export default App