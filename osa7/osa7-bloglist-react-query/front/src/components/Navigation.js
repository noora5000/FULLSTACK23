// Navigation-component renders the links to the blogs-page and the users-page,
// and the information of the logged in user + the log out-button (if the user has logged in) or
// the login-form (if the user hasn't logged in)
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
// Components
import LoggedIn from './LoggedinView'
import LoginForm from './LoginForm'
// Contexts
import LoggedInContext from '../loggedInContext'
// Styling of the navigation bar
const Navigation = () => {
  const naviLink = {
    color: "white",
    textDecoration: "none",
    padding: 5,
    display: "flex",
    alignItems: "center"
  }
  // Extract the logged-in user object from the LoggedInContext using useContext hook.
  // The user object contains information about the currently logged-in user.
  const [ user ] = useContext(LoggedInContext)

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link href="#" as="span">
            <Link style={naviLink} to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={naviLink} to="/users">Users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user
              ? <em><LoggedIn /></em>
              : <LoginForm />
            }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation