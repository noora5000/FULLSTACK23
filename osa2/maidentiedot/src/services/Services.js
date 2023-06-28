
import axios from "axios"
const api_key = process.env.REACT_APP_API_KEY

const getCountryData = () => {
    return(
        axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
        .then(response => response.data)
    )
}

const getWeather = (capital) => {
    return(
        axios
         .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
         .then(response => response.data)
    )
}

export default { getCountryData, getWeather}