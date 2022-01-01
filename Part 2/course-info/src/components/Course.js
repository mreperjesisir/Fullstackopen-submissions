import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  const Total = ({ course }) => {

    const courseParts = course.parts.map(item => item.exercises)
    const reducer = (previousValue, currentValue) => previousValue + currentValue

    console.log()
    return(
      <strong>Total exercises {courseParts.reduce(reducer)}</strong>
    ) 
  }
  
  const Part = ( {name, exercises} ) => {
    return (
      <p>
         {name} {exercises}
      </p>    
    )
  }

  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(item => 
      <Part key={item.id} name={item.name} exercises={item.exercises} />)}
      </div>
    )
  }

const Course = ({ course }) =>{
    return(
      <>
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
      </>
    )
}
export default Course