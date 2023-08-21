// User-component is responsible for rendering the list of blogs saved by one specific user
import { useParams } from "react-router-dom"
import { useContext } from 'react'
import UsersContext from "../usersContext"

const User = () => {
  // Extract the array of all users  from the UsersContext using useContext hook.
  const [ usersList ] = useContext(UsersContext)
  // get id of the wanted user from the route link url
  const { id } = useParams()
  // Find the info of the wanted user from the list of all users
  const userToFind = usersList.find(user => user.id === id)

  return(
    <div className="container">
      <h2>{userToFind.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userToFind.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User