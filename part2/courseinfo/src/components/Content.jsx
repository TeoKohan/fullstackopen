import Part from "./Part"

const Content = ({ parts }) => {
    return (
        <>
            {parts.map((x) => <Part key={x.id} name={x.name} exercises={x.exercises}/>) }
        </>
    )
}
  
export default Content