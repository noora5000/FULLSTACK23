const Form = ({value, handleChange}) => {
    const displayFormStyle = {
      fontFamily: 'Times New Roman',
      marginLeft: '10px',
      marginTop: '10px'
    }
    return(
      <form style={displayFormStyle}>
        find countries <input value={value} onChange={handleChange} />
      </form>
    )
  }
  const Display =({error, countryData, matchingCountries, handleClick, weather}) => {
    const displayCountryStyle = {
      fontFamily: 'Times New Roman',
      marginLeft: '10px'
    }
    const displayMatchingCountriesStyle = {
      fontFamily: 'Times New Roman',
      marginLeft: '10px',
      listStyleType: 'none'
    }
    const country = countryData[0]
    const capital = countryData[1]
    const area = countryData[2]
    const languages = countryData[3]
    const flags = countryData[4]

    // If country is defined -> form a country info card:
    if(country && languages && flags){
      const languagesComposed = languages.map((language, index) =>(
        <li key={index}>{language}</li>
      ))
      return(
        <div style={displayCountryStyle}>
          <h2>{country}</h2>
          <p>capital {capital}<br/>
            area {area}
          </p>
          <h3>languages:</h3>
          <ul>
            {languagesComposed}
          </ul>
          <img src={flags[1]} alt={flags[2]} height="200" style={{border:'1px solid black'}}></img>
          <h2>Weather in {capital}</h2>
          <p>temperature {weather[0]} Celsius</p>
          <img src={weather[1]} alt={weather[2]}/>
          <p>wind {weather[3]} m/s</p>
        </div>
      )
    // if country is not defined -> show error message or list all the matching countries
    } else { 
      if (error){
        return (
          <div style={displayMatchingCountriesStyle}>
          {error}
        </div>
        )
      } 
      else {
        const keys = Object.keys(matchingCountries)
        const mappedArray = keys.map(key => (
            <li key={key} >
              {matchingCountries[key]} <Button id={key} handleClick={handleClick}/>
            </li>
        ))

        return (
          <div style={displayMatchingCountriesStyle}>
            {mappedArray}
          </div>
          )
      }
    }
  }
  const Button = ({id, handleClick}) => {
    return (
      <button onClick={()=>handleClick(id)}>Show</button>
    )
  }

  export default {
    Form, Display
  }