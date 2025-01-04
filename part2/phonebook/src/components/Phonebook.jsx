import Phonenumber from './Phonenumber'

const Phonebook = ({ title, persons, removeNameWithId }) => {

  return (
    <>
        <h3>{title}</h3>
        <>
            {persons.map(x => <Phonenumber key={x.id} person={x} deleteperson={removeNameWithId(x.id)} />)}
        </>
    </>
  )
}

export default Phonebook