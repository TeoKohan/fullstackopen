import { useState } from 'react'
import Phonebook from './components/Phonebook'

const App = () => {
  const title = 'Numbers'
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  const handleNewNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} /><br/>
          number: <input value={newNumber} onChange={handleNewNumberChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <Phonebook title={title} persons={persons} />
    </>
  )
}

export default App