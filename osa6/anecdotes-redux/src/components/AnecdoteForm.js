import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
// useDispatch-hook tarjoaa mille tahansa React-komponentille pääsyn
// tiedostossa index.js määritellyn Redux-storen dispatch-funktioon, 
// jonka avulla komponentti pääsee tekemään muutoksia Redux-storen tilaan.

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAdd = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
    dispatch(setNotification(`Created new anecdote '${content}'`, 5))
  }
  
  return(
    <div className='AnecdoteForm'>
        <h2>create new</h2>
        <form onSubmit={handleAdd}>
          <div><input name='anecdote'/></div>
          <button type='submit'>create</button>
        </form>
    </div>
  )
}
export default AnecdoteForm