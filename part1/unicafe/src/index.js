import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({ value }) => <div><h1><b>{value}</b></h1></div>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ text, value }) => <div>{text} {value}</div>

const Statistics = ({ good, neutral, bad }) => {
    const sum = good + neutral + bad
    const average = (good - bad) / sum
    const positive = (good / sum) * 100

    if (sum === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }

    return (
        <div>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='all' value={sum} />
            <Statistic text='average' value={average} />
            <Statistic text='positive' value={positive + ' %'} />
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => setGood(good + 1)
    const handleNeutral = () => setNeutral(neutral + 1)
    const handleBad = () => setBad(bad + 1)

    return (
        <div>
            <Display value='give feedback' />
            <Button handleClick={handleGood} text='good' />
            <Button handleClick={handleNeutral} text='neutral' />
            <Button handleClick={handleBad} text='bad' />
            <Display value='statistics' />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))