import { useState, useEffect } from 'react'
import API from './services/Services'
import Components from './components/Components'

const App = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const [matchingCountries, setMatchingCountires] = useState({})
  const [countryNames, setNames] = useState([])
  const [countryData, setCountryData] = useState([])
  const [weather, setWeather] = useState([])


  useEffect(() => {
    if(value!==''){
      setError(null)
      setNames([])
      setCountryData([])
      setWeather([])
      // fetch list of countries from country-api:
      API
      .getCountryData()
      .then(ctries => {
        // filter countries that correspond to the input 'value' and save data to a list of objects
        const limitedCountries = ctries.filter((ctry => ctry.name.common.toLowerCase().includes(value.toLowerCase())))
        setMatchingCountires(limitedCountries)
        // Collect a list of country names for display.
        let nameList = [] 
        for(let i = 0; i<limitedCountries.length; i++){
          nameList.push(limitedCountries[i].name.common)
        }
        // if no countries on list: set error.
        if(nameList.length===0){ 
          setError('No matches.')
        // set list to the countryNames-array, if list.len is max. 10
        } else if(nameList.length < 11){
          setNames(nameList)
        // if list.len is greater than 10, set error.
        } else if (nameList.length > 11){
          setError("Too many matches, specify another filter")
        }
      })
    } else {
      setError(null)
    }

  }, [value])

  // functionality to distract data from a country-object to a data-array.
  const saveCountryData = (ctry) => {
    const languageKeys = Object.keys(ctry.languages)
    const mappedLanguageArray = languageKeys.map(key => `${ctry.languages[key]}\n`)

    const flagKeys = Object.keys(ctry.flags)
    const mappedFlagArray = flagKeys.map(key => `${ctry.flags[key]}\n`)
    const data = [ctry.name.common, ctry.capital[0], ctry.area, mappedLanguageArray, mappedFlagArray]
    return(data)
  }
  // functionality to fetch weather data from weather-api and place it to the weather-array
  const composeWeather = (countryCapital) => {
    API
      .getWeather(countryCapital)
      .then(weatherData => {
        const temp = Math.round((-(273.15-weatherData.main.temp))*100)/100
        const iconLink = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        const iconAlt = weatherData.weather[0].description
        setWeather(weather.concat([temp, iconLink, iconAlt, weatherData.wind.speed]))
      })
  }
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleClick = (id) =>{
    setValue(countryNames[id])
  }
  // if there is only one country that matches the input value, set country and weather data in a different function
  if (matchingCountries.length === 1){
    const data = saveCountryData(matchingCountries[0])
    setCountryData(data)
    composeWeather(data[1])
    setMatchingCountires({})
    setNames([])
  } 

  return (
    <div>
      <Components.Form value={value} handleChange={handleChange}/>
      <Components.Display error={error} countryData={countryData} matchingCountries={countryNames} handleClick={handleClick} weather={weather}/>
    </div>
  )
  
}
export default App

//<Components.Display error = {error} countryData = {countryData} matchingCountries={matchingCountries} handleClick={handleClick} weather={weather}/>


// import { useState, useEffect } from 'react'
// import API from './services/Services'
// import Components from './components/Components'
// 
// const App = () => {
//   const [value, setValue] = useState('')
//   const [error, setError] = useState(null)
//   const [matchingCountries, setMatchingCountires] = useState([])
//   const [countryData, setCountryData] = useState([])
//   const [weather, setWeather] = useState([])
// 
// 
//   useEffect(() => {
//   // skip if input value is empty
//     if(value!==''){
//       setError(null)
//       setCountryData([])
//       setWeather([])
//       // get list of all countries. Find and list the ones matching the input value
//       API
//         .getCountryData()
//         .then(ctries => {
//           const limitedCountries = ctries.filter((ctry => ctry.name.common.toLowerCase().includes(value.toLowerCase())))
//       // if there is only one country left in the list of countries corresponding the keyword, save data to variables:
//           if (limitedCountries.length === 1){
//             saveCountryData(limitedCountries[0])
//       // if there is more than 10 countries in the list, set error
//           } else if (limitedCountries.length > 10) {
//             setError("Too many matches, specify another filter")
//           }
//       // otherwise list all the names of the countries that correspond to the keyword
//           else if (limitedCountries.length > 1){
//             setMatchingCountires(limitedCountries.map((ctry) =>(
//                 ctry.name.common
//               )))
//           } 
//       // if there are no countries that match the keyword, set error
//           else {
//             setError("No matches")
//           }
//         })
//     }
//   // if value has not been defined, empty variables:
//     else {
//       setMatchingCountires([])
//       setCountryData([])
//       setError(null)
//     }
//   }, [value])
//   
// 
//   const saveCountryData = (ctry) => {
//       const languageKeys = Object.keys(ctry.languages)
//       const mappedLanguageArray = languageKeys.map(key => `${ctry.languages[key]}\n`)
// 
//       const flagKeys = Object.keys(ctry.flags)
//       const mappedFlagArray = flagKeys.map(key => `${ctry.flags[key]}\n`)
// 
//       setCountryData([ctry.name.common, ctry.capital[0], ctry.area, mappedLanguageArray, mappedFlagArray])
//       composeWeather(ctry.capital[0])
//   }
// 
//   const composeWeather = (countryCapital) => {
//     API
//       .getWeather(countryCapital)
//       .then(weatherData => {
//         const temp = Math.round((-(273.15-weatherData.main.temp))*100)/100
//         const iconLink = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
//         const iconAlt = weatherData.weather[0].description
//         setWeather(weather.concat([temp, iconLink, iconAlt, weatherData.wind.speed]))
//       })
//   }
// 
//   const handleChange = (event) => {
//     setValue(event.target.value)
//   }
// 
//   const handleClick = (id) =>{
//     setValue(matchingCountries[id])
//   }
// 
//   return (
//     <div>
//       <Components.Form value={value} handleChange={handleChange}/>
//       <Components.Display error = {error} countryData = {countryData} matchingCountries={matchingCountries} handleClick={handleClick} weather={weather}/>
//     </div>
//   )
// }
// export default App
