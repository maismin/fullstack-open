import React from 'react'
import Course from './Course'

const Courses = ({ courses }) => {
    const courseComponents = courses.map(course => <Course course={course} key={course.id}/>)
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courseComponents}
        </div>
    )    
}

export default Courses