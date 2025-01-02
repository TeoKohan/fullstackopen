import Content from './Content.jsx';
import Header from './Header.jsx'  
import Part from './Part.jsx'  

const Course = ({ course }) => {
    console.log(course.id);
    
    return (
        <div key={course.id}>
            <Header text={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}
  
export default Course