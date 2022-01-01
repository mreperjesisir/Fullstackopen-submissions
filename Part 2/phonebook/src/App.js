import React, { useState, useEffect } from 'react'
import personService from './services/entries'
import Filter from './components/Filter'
import DataForm from './components/DataForm'
import ListOfPersons from './components/ListOfPersons'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const peopleToShow = showAll
      ? persons
      : persons.filter(person => person.name.search(newSearch)!==-1)

  useEffect(() => {
    personService
    .getAllEntries()
    .then(response => setPersons(response.data))
  },[])

  // have a useEffect when filtering,
  // otherwise the filtering can use the previous state of
  // showAll sometimes becasue setting state is also 
  // async!

  useEffect(() => {
    if (newSearch!==""){
      setShowAll(false)
    } else {
      setShowAll(true)
    }
      },[newSearch])

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }
  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const onSearchChange = (event) => {   
    setNewSearch(event.target.value)
  }

  // this function handles adding and updating 

  const addInformation = (event) => {

    //check if input is already in phonebook

    let isNameDuplicate = false
    let isNumberDuplicate = false
    
    persons.forEach(person => {
      if (person.name === newName) {
        isNameDuplicate = true
      }

      if (person.number === newNumber){
        isNumberDuplicate = true
      }
    });

    //allow to update number if the name is duplicate

    if (isNameDuplicate === true) {
      event.preventDefault()
      const result = window.confirm(`${newName} is already added to phonebook, would you like to update the number`)

      if (result && isNumberDuplicate === true) {
        alert(`${newNumber} is already someone else's number`)
      return false 
      }

      if (result && isNumberDuplicate ===false){
        
        const oldPerson = persons.find(p => p.name===newName)
        const updateId = oldPerson.id
        const updatedPerson = {...oldPerson, number: newNumber}

        personService
        .updateEntry(updateId, updatedPerson )
        .then(response => {
          setPersons(persons.map(person => person.id !== updateId ? person : response.data))
          
          setErrorMessage(`You updated the phone number of: ${updatedPerson.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        setNewName('')
        setNewNumber('')
        })
        .catch(error => {
          console.log('we reached the error')
          setErrorMessage(`Information of ${updatedPerson.name} has already been deleted from the phonebook`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          setNewName('')
          setNewNumber('')
        })
        
      }

    } else if (isNumberDuplicate === true) {
      event.preventDefault()
      alert(`${newNumber} is already someone else's number`)
      return false

    //if new data is unique create new entry

    } else {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber 
      }
        personService
        .createEntry(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))  
        })
        setErrorMessage(`You added ${personObject.name} to the phonebook`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        setNewName('')
        setNewNumber('')
    }
  }


  //reminder for self: keep passing along the
  //reference of the function to as many child and
  //grandchild component as needed, only the last
  //one needs to set props

  const deleteEntry = (id) => {
    console.log('clicking happened on id ', id)
    const nameOfDeleted = persons.filter(n => n.id===id)

    const result = window.confirm('Are you sure you want to delete ' + nameOfDeleted[0].name)
    if (result){
      const filteredEntries = persons.filter(n => n.id !== id)
          console.log(filteredEntries)
      personService
      .deleteEntry(id)
      .then(response => {
        setPersons(filteredEntries)      
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter value = {newSearch} onChange={onSearchChange} />
      <h2>add a new</h2>
      <DataForm onSubmit={addInformation} 
      newName={newName} 
      onNameChange={onNameChange} 
      newNumber={newNumber}
      onNumberChange={onNumberChange} />
      <h2>Numbers</h2>
      <ListOfPersons peopleToShow={peopleToShow} deleteEntry={deleteEntry} />
    </div>
  )
}

export default App
