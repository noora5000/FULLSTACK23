const Persons = ({personsToShow, deletePerson}) => {
    return(
      <ul>
      {personsToShow
        .map(person => 
          <Person key={person.name} person={person} del={deletePerson}/>
          )
      }
    </ul>
    )
  }
  
  const Person = ({person, del}) => {
    if(person.name){
      return (
        <li>{person.name} {person.number}<button onClick={()=>del(person)}>Delete</button></li>
      )
    }
  }
  
export default Persons
//const Persons = ({personsToShow}) => {
//  return(
//    <ul>
//    {personsToShow.map(person => 
//        <Person key={person.name} person={person}/>
//      )}
//  </ul>
//  )
//}
//
//const Person = ({person}) => {
//  if(person.name){
//    return (
//      <li>{person.name} {person.number}</li>
//    )
//  }
//}
//
//export default Persons