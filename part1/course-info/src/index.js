import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            {props.part.name} {props.part.exercises}
        </div>
    )
}

const Content = (props) => {
    const parts = props.parts.map(part => <Part part={part} key={part.name} />)
    return (
        <div>
            {parts}
        </div>
    )
}

const Total = (props) => {
    const sum = props.parts.reduce((accumulator, part) => accumulator + part.exercises, 0)
    return (
        <div>
            <p>Number of exercises {sum}</p>
        </div>

    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))