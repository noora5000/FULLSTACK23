import { useState } from 'react'

const Button = (props) => {
  const {handleClick, text} = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const StatisticLine = props =>{
  return (
    <>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </>
  )
}

const Statistics = props => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const total = props.total
  const average = total/(good+neutral+bad)
  const positive = (good/(good+neutral+bad))*100 + " %"
  
  if ((good+bad+neutral) !== 0){
    return(
      <>
        <table>
          <tbody>
            <tr><StatisticLine text="good" value={good}/></tr>
            <tr><StatisticLine text="neutral" value={neutral}/></tr>
            <tr><StatisticLine text="bad" value={bad}/></tr>
            <tr><StatisticLine text="all" value={good + neutral + bad}/></tr>
            <tr><StatisticLine text="average" value={average}/></tr>
            <tr><StatisticLine text="positive" value={positive}/></tr>
          </tbody>
        </table>
      </>
    )
  } else {
    return(
      <p>No feedback given</p>
    )
  }
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () =>{
    const updatedGood = good + 1
    const updatedTotal = total+1
    setGood(updatedGood)
    setTotal(updatedTotal)
  }
  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }
  const handleBad = () => {
    const updatedBad = bad + 1
    const updatedTotal = total-1
    setBad(updatedBad)
    setTotal(updatedTotal)
  }
  

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={handleGood} text="Good"/>
      <Button handleClick={handleNeutral} text="Neutral"/>
      <Button handleClick={handleBad} text="Bad"/>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}


export default App
