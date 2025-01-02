import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>
const Button = ({callback, text}) => <button onClick={callback}>{text}</button>
const Statistic = ({value, text}) => <><td>{text}</td><td>{value}</td></>

const Statistics = ({good, neutral, bad}) => {
    if (good + neutral + bad === 0) {
        return <p>No feedback given</p>
    } else {
        return <table>
            <tbody>
                <tr>
                <Statistic value={good} text='good' />
                </tr>
                <tr>
                <Statistic value={neutral} text='neutral' />
                </tr>
                <tr>
                <Statistic value={bad} text='bad' />
                </tr>
                <tr>
                <Statistic value={good+neutral+bad} text='all' />
                </tr>
                <tr>
                <Statistic value={(good-bad)/(good+neutral+bad)} text='average' />
                </tr>
                <tr>
                <Statistic value={
                    `${good/(good+neutral+bad)*100} %`
                } text='positive' />
                </tr>
            </tbody>
        </table>
    }
}
const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    

    return (
        <div>
            <Header text='give feedback' />
            <Button callback={() => setGood(good+1)} text='good' />
            <Button callback={() => setNeutral(neutral+1)} text='neutral' />
            <Button callback={() => setBad(bad+1)} text='bad' />
            <Header text='statistics' />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App