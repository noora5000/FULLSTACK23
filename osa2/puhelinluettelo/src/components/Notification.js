const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
    if(type === 'notify'){
        return (
            <div className="notificationMessage">
              {message}
            </div>
          )
    } else if (type === 'error'){
        return(
            <div className="errorMessage">
            {message}
          </div>
        )
    }


  }
  export default Notification