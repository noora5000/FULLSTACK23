// LoginForm component renders login form for users
import { useState } from "react";
import storageService from "../services/storage";
import { useMutation } from 'react-query'
import { useContext } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
// services
import loginService from "../services/login";
// contexts
import NotificationContext from "../notificationContext";

const LoginForm = () => {
  // useState to manage login form input data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Extract the notification reducer from the NotificationContext using useContext hook.
  // The dispatchNotification contains a dispatch function to update the state of the notification
  // eslint-disable-next-line no-unused-vars
  const [notification, dispatchNotification] = useContext(NotificationContext);
  // Mutation for saving the user trying to log in to the window.localStorage
  const saveUserMutation = useMutation(storageService.saveUser, {
    onSuccess: () => {
      window.location.reload()
    }
  })
  // Functionalitites for handling the data changes occurring in the input fields
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  // Functionality for handling form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      // send request to api/login inside loginService and save the response to a variable
      const userTemp = await loginService.login({ username, password })
      // pass the response to the save-mutation
      saveUserMutation.mutate(userTemp)
    } catch(error){
      dispatchNotification({ type: 'show', payload: 'wrong username or password' })
      setTimeout(() => {
        dispatchNotification({ type: 'show', payload: '' })
      }, 5000)
    } finally{
      // empty the input fields
      setUsername("");
      setPassword("");
    }
  };


  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="formUsername">

              <Form.Control
                type="text"
                name="username"
                value={username}
                placeholder="username"
                onChange={handleUsernameChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formPassword">

              <Form.Control
                type="password"
                value={password}
                placeholder="password"
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" id="login-button" type="submit">
          login
            </Button>
          </Col>
        </Row>

      </Form>
    </div>
  );

};

export default LoginForm;
