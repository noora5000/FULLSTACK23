import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import NotificationContext from './NotificationContext'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  return action.payload
}

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    console.log('vote', { ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({type: 'show', payload: `voted ${anecdote.content}`})
    setTimeout(() => {
      notificationDispatch({type: 'show', payload: ''})
    }, 5000)
  }

  // axiosin metodikutsu on kääritty useQuery-funktion avulla luoduksi kyselyksi.
  // Funktiokutsun parametri 'anecdotes' toimii avaimena määriteltyyn kyselyyn, eli anekdoottilistaan.
  // paluuarvo on olio, joka kertoo kyselyn tilan
  const result = useQuery('anecdotes', getAnecdotes, { retry: false })
  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  
  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={async () => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
