// anecdoteReducer holds the initial state of the anecdotes App and the anecdoteSlice-function for altering the state of the anecdotes. 
// The function utilizes Redux and contains both the reducer and action creators.
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// The redux slice for handling anecdotes.
// parameters:
//  - name: prefix that will be used in type-values of actions, for example: 
//    createAnecdote-action gets type-value anecdotes/voteAnecdote etc.
//  - initialState: defines the preliminary state of reducer
//  - reducers: defines reducers as objects, that have functions defined inside them.
//    these functions handle the state changes caused by a certain action.
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // Reducer for voting on an anecdote. Increases the vote count of the selected anecdote.
    vote(state, action){
      // action.payload is the parameter given to the action creator call.
      const id = action.payload.id
      const changedAnecdote = action.payload

      return state.map(anecdote =>
      anecdote.id !== id ? anecdote : changedAnecdote)
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    // Reducer for setting the anecdotes
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

// Anekdoottien alkutilan määrittely tietokannasta Redux Thunk-kirjaston avulla:
export const initializeAnecdotes = () => {
  return async dispatch => {
    // operaatio hakee ensin palvelimelta kaikki anekdootit:
    const anecdotes = await anecdoteService.getAll()
    // seuraavaksi dispatchataan setAnecdotes (anekdootit storeen lisäävä action)
    dispatch(setAnecdotes(anecdotes))
  }
}

// Anekdoottien lisääminen sovelluksen tietokantaan Redux Thunk-kirjaston avulla:
export const addAnecdote = content => {
  return async dispatch => {
    // luodaan uusi anekdootti
    const newAnecdote = await anecdoteService.createNew(content)
    // dispatchataan appendAnecdote (anekdootin tietokantaan lisäävä action)
    dispatch(appendAnecdote(newAnecdote))
  }
}

// Muutetun anekdootin päivittäminen sovelluksen tietokantaan Redux Thunk-kirjaston avulla:
export const voteAnecdote = anecdote => {
  return async dispatch => {
    const newObject = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const updatedAnecdote = await anecdoteService.voteAnecdote(newObject)
    dispatch(vote(updatedAnecdote))
  }

}

export default anecdoteSlice.reducer