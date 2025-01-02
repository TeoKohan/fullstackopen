const InputField = ({ text, value, callback }) => {

  return (
    <>
    {text}: <input value={value} onChange={callback} /><br/>
    </>
  )
}

export default InputField