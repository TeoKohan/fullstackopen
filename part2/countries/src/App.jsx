import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const CountryLine = ({ name }) => {
    return <div>{name}</div>
}

const CountryFull = ({ data }) => {
    const imgStyle = {
        maxWidth: 128
    }

    return (
        <>
            <h2>{data.name.common}</h2>
            <p>
                {`capital ${data.capital}`} <br></br>
                {`area ${data.area}`}
            </p>
            <h3>Languages</h3>
            <ul>
                {Object.entries(data.languages).map(([k, v]) => <li key={k}>{v}</li>)}
            </ul>
            <img src={data.flags.svg} style={imgStyle}></img>
        </>
    )
}

const CountryDisplay = ({ countryMatches }) => {
    const matchLength = countryMatches.length
    if (matchLength > 10) {
        return <div>too many matches.</div>
    }
    else if (matchLength > 1 && matchLength <= 10) {
        return (
            <>
                {countryMatches.map(country => <CountryLine key={country.cca2} name={country.name.common} />)}
            </>
        )
    }
    else if (matchLength === 1) {
        return <CountryFull data={countryMatches[0]} />
    }
    else {
        return <div>no matches.</div>
    }
}

const App = () => {
  
    const [countries, SetCountries] = useState([])
    const [filterString, setFilterString] = useState('')
    const countryMatches = countries.filter(country => country.name.common.toLowerCase().includes(filterString.toLowerCase()))

    useEffect(() => {
        countriesService
          .getAll()
          .then(countriesData => {SetCountries(countriesData)})
    }, [])

    const handleFilterStringChange = (e) => {
        setFilterString(e.target.value)
    }

    return (
        <>
            <div>find countries <input value={filterString} onChange={handleFilterStringChange}></input></div>
            <>
                <CountryDisplay countryMatches={countryMatches} />
            </>
        </>
    )
}

export default App
