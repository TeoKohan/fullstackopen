import { useState } from 'react'
import Phonebook from './components/Phonebook'

const App = () => {
  const title = 'Numbers'
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (e) => {
    e.preventDefault()
    setPersons(persons.concat({name: newName}))
    setNewName('')
  }

  const handleNewNameChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}>
          </input>
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