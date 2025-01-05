import axios from 'axios'
const baseUrl = 'http://api.weatherapi.com/v1'

const getCurrentWeather = (country) => {
    const api_key = import.meta.env.VITE_WEATHER_KEY
    console.log('request for', country)
    return axios
        .request(`${baseUrl}/current.json?key=${api_key}&q=${country}`)
        .then(response => response.data.current)
}

export default {getCurrentWeather}