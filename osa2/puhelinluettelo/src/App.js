import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect (()=> {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  let generateMessage = (msg) =>{
    setNotificationMessage(msg)
    setTimeout(()=>{
     setNotificationMessage(null)
    }, 4000)
  } 

  let generateError = (msg => {
    setErrorMessage(msg)
    setTimeout(()=> {
      setErrorMessage(null)
    }, 4000)
  })
  
  const addPerson = (event) => { // tapahtuu, kun lomake lähetetään:
    event.preventDefault() //estää lomakkeen lähttämisen (ja sivun päivittymisen) ennen aikojaan
    const personObject = { // kentän tiedot talletetaan olioon
      name: newName,
      number: newNumber,
    }
     let isInList = (dict) => dict.name === personObject.name //ehto: onko personobject.name jo olemassa dict-listan name-osassa
     
     if(persons.some(isInList)){ // <-- Tarkistetaan some-metodilla, toteutuuko ehto
      const personUpdate = persons.find(n=>n.name===personObject.name) // etsitään ja tallennetaan muuttujaan päivitettävä henkilö
       if (personUpdate.number !== personObject.number && window.confirm(`${personUpdate.name} is already added to phonebook, replace the old number with a new one?`)){
        const changedPerson = { ...personUpdate, number: newNumber }
        personService.update(personUpdate.id, changedPerson)
          .then(returnedPerson => { // luodaan uusi persons-lista seuraavalla ehdolla ja asetetaan se uudeksi persons-arvoksi:
            setPersons(persons.map(person => person.id !== personUpdate.id ? person : returnedPerson)) 
            generateMessage(`${personObject.name}'s number updated.`)
          })
          .catch(error => {
            generateError(`Information of ${personObject.name} has already been removed from the server.`)
            setPersons(persons.filter(n=>n.name!==personObject.name))
          })
       } else {
        alert(`${newName} is already added to phonebook`)
       }
     } else {
       personService.create(personObject)
         .then(returnedPerson => {
           setPersons(persons.concat(returnedPerson))
           generateMessage(`Added ${personObject.name}`)
         })
     }
     setNewNumber('')
     setNewName('')
  }
 
   const handleName = (event) => {
     setNewName(event.target.value) 
   }
   const handleNumber = (event) => {
     setNewNumber(event.target.value)
   }
 
   const handleFilter = (event => {
     setFilter(event.target.value)
     setShowAll(false)
   })

   const personsToShow = showAll ? persons : persons.filter((
     person => person.name.toLowerCase().includes(filter.toLowerCase())
     )
   )

   const deletePerson = (person) => {
    if(window.confirm(`Delete ${person.name}?`)){
      personService.deletePerson(person.id)
      .then(()=>{setPersons(persons.filter(n=>n.id!==person.id))
        generateMessage(`${person.name} deleted.`)})
      .catch(error => {
        generateError(`Information of ${person.name} has already been removed from the server.`)
        setPersons(persons.filter(n=>n.name!==person.name))
      })
    }
   }

   return (
     <div>
       <Notification message = {errorMessage} type = {'error'}/>
       <Notification message={notificationMessage} type={'notify'}/>
       <h2>Phonebook</h2>
       <Filter filter={filter} handleFilter={handleFilter}/>
       <h3>Add a new</h3>
       <PersonForm add={addPerson} newName={newName} newNumber={newNumber} handleName={handleName} handleNumber={handleNumber}/>
       <h3>Numbers</h3>
       <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
     </div>
   )
}

export default App