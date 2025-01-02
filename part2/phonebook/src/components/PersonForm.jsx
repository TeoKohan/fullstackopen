import InputField from "./InputField"

const PersonForm = ({ newName, handleNewNameChange, newNumber, handleNewNumberChange, addName }) => {

  return (
    <form onSubmit={addName}>
      <div>
        <InputField text='name' value={newName} callback={handleNewNameChange} />
        <InputField text='number' value={newNumber} callback={handleNewNumberChange} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}

export default PersonForm