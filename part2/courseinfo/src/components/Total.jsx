const Total = ({ parts }) => {
    const total = parts.reduce((r, x) => r + x.exercises, 0)
    return <h4>total of {total} exercises</h4>
}
  
export default Total