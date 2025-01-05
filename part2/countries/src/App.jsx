import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'

const imgStyle = {
    maxWidth: 128
}

const weatherApiStyle = {
    maxWidth: 64,
    border: 0
}

const CountryWeather = ({ country, temperatureData, windData, iconData}) => {

    return (
        <>
            <h3>{`Weather in ${country.capital}`}</h3>
            <p>
                {`temperature ${temperatureData} Celsius`} <br/>
                <img src={iconData}/> <br/>
                {`wind ${windData} km/h`} 
            </p>
            <div>
                <a href="https://www.weatherapi.com/" title="Free Weather API">
                    <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" style={weatherApiStyle} />
                </a>
            </div>
        </>
    )
}

const CountryFull = ({ country, temperatureData, windData, iconData }) => {

    return (
        <>
            <h2>{country.name.common}</h2>
            <p>
                {`capital ${country.capital}`} <br/>
                {`area ${country.area}`}
            </p>
            <h3>Languages</h3>
            <ul>
                {Object.entries(country.languages).map(([k, v]) => <li key={k}>{v}</li>)}
            </ul>
            <img src={country.flags.svg} style={imgStyle}></img>
            <CountryWeather country={country} temperatureData={temperatureData} windData={windData} iconData={iconData} />
        </>
    )
}

const CountryLine = ({ name, showHandler }) => {
    return (
        <>
            <div>{name} <button onClick={showHandler}>show</button></div>
        </>
    )
}

const CountryDisplay = ({ countryMatches, setFilterString, temperatureData, windData, iconData }) => {
    const matchLength = countryMatches.length
    if (matchLength > 10) {
        return <div>too many matches.</div>
    }
    else if (matchLength > 1 && matchLength <= 10) {
        return (
            <>
                {countryMatches.map(country => <CountryLine key={country.cca2} name={country.name.common} showHandler={() => setFilterString(country.name.common)} />)}
            </>
        )
    }
    else if (matchLength === 1) {
        return <CountryFull country={countryMatches[0]} temperatureData={temperatureData} windData={windData} iconData={iconData} />
    }
    else {
        return <div>no matches.</div>
    }
}

const App = () => {
  
    const [countries, SetCountries] = useState([])
    const [filterString, setFilterString] = useState('')
    const countryMatches = countries.filter(country => country.name.common.toLowerCase().includes(filterString.toLowerCase()))

    const [temperatureData, setTemperatureData] = useState(null)
    const [windData, setWindData] = useState(null)
    const [iconData, setIconData] = useState(null)

    useEffect(() => {
        countriesService
          .getAll()
          .then(countriesData => {SetCountries(countriesData)})
    }, [])

    useEffect(() => {
        if (countryMatches.length === 1) {
            weatherService
                .getCurrentWeather(`${countryMatches[0].latlng[0]},${countryMatches[0].latlng[1]}`)
                .then(currentWeather => {
                    setTemperatureData(currentWeather.temp_c)
                    setWindData(currentWeather.wind_kph)
                    setIconData(currentWeather.condition.icon)
                })
        }
    }, [countryMatches])

    const handleFilterStringChange = (e) => {
        setFilterString(e.target.value)
    }

    return (
        <>
            <div>find countries <input value={filterString} onChange={handleFilterStringChange}></input></div>
            <>
                <CountryDisplay countryMatches={countryMatches} setFilterString={setFilterString} temperatureData={temperatureData} windData={windData} iconData={iconData} />
            </>
        </>
    )
}

export default App
