import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from 'react-query'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [anecdote, dispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      dispatch({ type: 'show', payload:`too short an anecdote. Required length is 5 or more characters.` })
      setTimeout(() => {
        dispatch({type: 'show', payload: ''})
      }, 5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote', content)
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({ type: 'show', payload:`created a new anecdote ${content}` })
    setTimeout(() => {
      dispatch({type: 'show', payload: ''})
    }, 5000)

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
