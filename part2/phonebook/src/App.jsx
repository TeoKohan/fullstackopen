import { useState, useEffect } from 'react'
import personService from './services/persons'

import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'

const App = () => {
  const title = 'Numbers'
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  const hook = () => {
    personService.getAll()
    .then(data => {
      setPersons(data)
    })
  }

  useEffect(hook, [])

  const addName = (e) => {
    e.preventDefault()
    const names = persons.map(x => x.name)

    if (names.indexOf(newName) < 0) {

      personService
        .create({name: newName, number: newNumber})
        .then(data => setPersons(persons.concat(data)))

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