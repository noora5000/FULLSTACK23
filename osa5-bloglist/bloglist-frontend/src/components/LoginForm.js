// LoginForm component renders login form for users
// Accepts the following prop: handleLogin: Function to handle login form submission
import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id='username'
            value={username}
            name="username"
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          password
          <input
            id='password'
            value={password}
            name="password"
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}


export default LoginForm