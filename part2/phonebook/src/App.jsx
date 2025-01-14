import { useState, useEffect } from 'react'
import personService from './services/persons'

import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const App = () => {
  const title = 'Numbers'
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [message, setMessage] = useState(null)

  const hook = () => {
    personService
        .getAll()
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
        .create({name: newName, phonenumber: newNumber})
        .then(data => {
            setPersons(persons.concat(data))
            setNewName('')
            setNewNumber('')

            setMessage(`${newName} created.`)
            setTimeout(() => {
                setMessage(null)
            }, 5000);
        })
        .catch(error => {
            setMessage(`error: ${error.response.data.error}.`)

            setTimeout(() => {
              setMessage(null)
            }, 5000);
        })

    } else {
      const person = persons.find(x => x.name == newName)
      if (window.confirm(`${newName} is already in he phonebook, replace phone number?`)) {
        personService
          .update(person.id, {...person, phonenumber: newNumber})
          .then(data => {
            setPersons(persons.map(x => x.id != person.id ? x : data ))

            setMessage(`${newName} updated.`)
            setTimeout(() => {
              setMessage(null)
            }, 5000);
          })
          .catch( () => {
            setPersons(persons.filter(x => x.id !== person.id))

            setMessage(`${person.name} was already deleted from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000);
          })

        setNewName('')
        setNewNumber('')
      }
    }
  }

  const removeNameWithId = (id) => {
    return () => {
      if (window.confirm(`Confirm ${persons.find(x => x.id == id).name} deletion`)) {
        personService
          .remove(id)
          .then( () => setPersons(persons.filter(x => x.id !== id)))
      }
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
      <Notification message={message} />
      <div>filter shown with
        <input value={filterString} onChange={handleFilterStringChange} />
      </div>
      <h3>Add New</h3>
      <PersonForm newName={newName} handleNewNameChange={handleNewNameChange} newNumber={newNumber} handleNewNumberChange={handleNewNumberChange} addName={addName} />
      <Phonebook 
        title={title}
        persons={persons.filter(x => x.name.toLowerCase().includes(filterString.toLowerCase()))}
        removeNameWithId={removeNameWithId}
      />
    </>
  )
}

export default App