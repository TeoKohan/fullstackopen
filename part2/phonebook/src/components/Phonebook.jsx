import Phonenumber from './Phonenumber'

const Phonebook = ({ title, persons }) => {

  return (
    <>
        <h3>{title}</h3>
        <>
            {persons.map(x => <Phonenumber key={x.id} person={x} />)}
        </>
    </>
  )
}

export default Phonebook