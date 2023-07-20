// Notification-component renders temporary notifications that can include confirmation or error messages.
// Accepts the following props:
//   - message: A string variable that contains the notification message
//   - error: A boolean variable that defines the notification as an error or non-error

const Notification = ({ error, message }) => {
  const notificationStyle = {
    color: error ? 'red' : 'green',
    borderColor: error ? 'red' : 'green',
    fontSize: '15px',
    backgroundColor: 'lightgray',
    border: '2px solid',
    borderRadius: '5px',
    padding: '10px'
  }

  if (message === null) {
    return null
  }

  return (
    <div
      id='notification'
      style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification