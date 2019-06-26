import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {
    const sum = course.parts.reduce((accumulator, part) => accumulator + part.exercises, 0)
    return (
        <div>
            <Header course={course.name} />
            <Content contents={course.parts} />
            <Total numOfExercises={sum} />
        </div>
    )
}

export default Course