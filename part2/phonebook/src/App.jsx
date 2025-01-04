import { useState, useEffect } from 'react'
import axios from 'axios'

import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'

const App = () => {
  const title = 'Numbers'
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  const hook = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

  const addName = (e) => {
    e.preventDefault()
    const names = persons.map(x => x.name)

    if (names.indexOf(newName) < 0) {
      setPersons(persons.concat(
        {id: persons.length+1, name: newName, number: newNumber}
      ))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already in phonebook.`)
    }
  }

  const handleFilterStringChange = (e) => {
    setFilterString(e.target.value)
  }

  const handleNewNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <div>filter shown with
        <input value={filterString} onChange={handleFilterStringChange} />
      </div>
      <h3>Add New</h3>
      <PersonForm newName={newName} handleNewNameChange={handleNewNameChange} newNumber={newNumber} handleNewNumberChange={handleNewNumberChange} addName={addName} />
      <Phonebook 
        title={title}
        persons={persons.filter(x => x.name.toLowerCase().includes(filterString.toLowerCase()))}
      />
    </>
  )
}

export default App