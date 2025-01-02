import Phonenumber from './Phonenumber'

const Phonebook = ({ title, persons }) => {

  return (
    <>
        <h2>{title}</h2>
        <>
            {persons.map(x => <Phonenumber key={x.name} person={x} />)}
        </>
    </>
  )
}

export default Phonebook