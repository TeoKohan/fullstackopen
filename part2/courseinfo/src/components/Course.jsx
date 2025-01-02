import Content from './Content.jsx';
import Header from './Header.jsx'  
import Part from './Part.jsx'  
import Total from './Total.jsx'  

const Course = ({ course }) => {

    return (
        <div key={course.id}>
            <Header text={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}
  
export default Course