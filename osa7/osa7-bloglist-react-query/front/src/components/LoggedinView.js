// LoggedIn-component renders the name of the logged-in user and a log out-button
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { Button } from 'react-bootstrap';
// services
import storageService from '../services/storage';
// contexts
import LoggedInContext from '../loggedInContext'

const LoggedIn = () => {
  const navigate = useNavigate()
  // Extract the user-object  from the LoggedInContext using useContext hook.
  const [ user ] = useContext(LoggedInContext)
  // Mutation for clearing the logged in user from the window.localStore
  const clearUserMutation = useMutation(storageService.removeUser, {
    onSuccess: () => {
      window.location.reload()
    }
  })
  // Functionality for logging out the current user
  const handleLogout = async () => {
    clearUserMutation.mutate()
    // navigate to the front page
    navigate('/')
  }

  return (
    <div>
      {user.name} logged in{" "}
      <Button onClick={() => handleLogout()}>Log out</Button>
    </div>
  );
};

export default LoggedIn;
