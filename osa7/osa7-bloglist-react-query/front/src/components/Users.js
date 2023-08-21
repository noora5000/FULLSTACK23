// Users-component is responsible for rendering the list of all app users and the number of blogs they have saved.
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import UsersContext from '../usersContext'
import { Table } from 'react-bootstrap'

const Users = () => {
  // Extract the array of all app users from the UsersContext using useContext hook.
  const [ usersList ] = useContext(UsersContext)

  return(
    <div className="container">
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th>User</th>
            <th>Blogs saved to database</th>
          </tr>
          {usersList.map(user =>
            <tr key={user.username}>
              <td>
                <Link style={{ "padding": 5 }} to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                { user.blogs.length }
              </td>
            </tr>)}
        </tbody>
      </Table>

    </div>
  )
}
export default Users
