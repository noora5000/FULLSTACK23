// LoggedIn-component renders the name of the logged-in user and a log out-button
// Accepts the following props:
//   - user: Currently logged-in user object
//   - handleLogout: Functtion to hande the log out button click event

const LoggedIn = ({ user, handleLogout }) => (
  <div>
    {user.name} logged in <button onClick={() => handleLogout()}>Log out</button>
  </div>
)

export default LoggedIn