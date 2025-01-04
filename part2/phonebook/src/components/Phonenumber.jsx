const Phonenumber = ({ person, deleteperson: removeName }) => {

  return (
    <>
        <div>{person.name} {person.number} <button onClick={removeName}>delete</button></div>
    </>
  )
}

export default Phonenumber