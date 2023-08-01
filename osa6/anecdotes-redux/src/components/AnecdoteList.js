import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
// Storeen talletettuihin anekdootteihin komponentti pääsee käsiksi 
// React Redux ‑kirjaston useSelector-hookin kautta
//
// useDispatch-hook tarjoaa mille tahansa React-komponentille pääsyn
// tiedostossa index.js määritellyn Redux-storen dispatch-funktioon, 
// jonka avulla komponentti pääsee tekemään muutoksia Redux-storen tilaan.

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if( state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })


  const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }
  return(
    <div className='anecdoteList'>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList