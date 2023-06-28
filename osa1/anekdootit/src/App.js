import { useState } from 'react'

const DisplayAnecdote = (props) => {
  const {heading, input, votes} = props
  if(!input){
    return (
      <p>No votes yet. Start voting anecdotes to see which one gets the most votes.</p>
    )
  } else {
    return (
      <>
        <h2>{heading}</h2>
        <p>{input}<br/>
        has {votes} votes
        </p>
        
      </>
    )
  }
}

const Button = (props) => {
  const {handleClick, text} = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const copy = [...points]
  const generateRandom = () => {
    let max = anecdotes.length
    const randInt = Math.floor(Math.random()*max)
    setSelected(randInt)
  }
  const countPoints = () => {
    copy[selected]+=1
    setPoints(copy)
  }
  const findAnecdote = () => {
    let variableWithMostVotes = null
    let MostVotes = 0

    for(let i=0; i<copy.length; i++){
      if(copy[i]>MostVotes ){
        MostVotes = copy[i]
        variableWithMostVotes = i
      }
    }
    return(
      variableWithMostVotes
    )
  }
  
  return (
    <div>
      <DisplayAnecdote heading="Anecdote of the day" input={anecdotes[selected]} votes={copy[selected]}/>
      <Button handleClick={countPoints} text="vote"/>
      <Button handleClick={generateRandom} text="next anecdote" analyze={false}/>
      <DisplayAnecdote heading="Anecdote with most votes" input={anecdotes[findAnecdote()]} votes={copy[findAnecdote()]}/>
      
    </div>
  )
}

export default App
