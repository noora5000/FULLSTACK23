// Notification-component renders temporary notifications based on user activity.
import { useContext } from 'react'
import NotificationContext from "../notificationContext";
import { Alert } from 'react-bootstrap'

const Notification = () => {
  // Extract the notification object from the NotificationContext using useContext hook.
  // The notification object contains the notification-message informing the user
  // about a successful interaction with the app or an error.
  // eslint-disable-next-line no-unused-vars
  const [notification, dispatchNotification] = useContext(NotificationContext);

  if (notification !== '') {
    return(
      <Alert id="notification" style={{ marginBottom: 0, borderRadius: 0 }}>
        {notification}
      </Alert>
    )
  } else {
    return null
  }
};

export default Notification;
