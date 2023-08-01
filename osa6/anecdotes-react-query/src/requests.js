import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote =>
axios.post(baseUrl, newAnecdote).then(res => res.data)

export const updateAnecdote = anecdoteToUpdate =>{
console.log('id', `${baseUrl}/${anecdoteToUpdate.id}}`)
axios.put(`${baseUrl}/${anecdoteToUpdate.id}`, anecdoteToUpdate).then(res => res.data)}