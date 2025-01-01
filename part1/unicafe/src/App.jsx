import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>
const Button = ({callback, text}) => <button onClick={callback}>{text}</button>
const Stat   = ({value, text}) => <div>{text} {value}</div>

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
            <Stat value={good} text='good' />
            <Stat value={neutral} text='neutral' />
            <Stat value={bad} text='bad' />
        </div>
    )
}

export default App