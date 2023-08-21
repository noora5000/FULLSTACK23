// The main app component.
// Main app is responsible for rendering the app user interface.
// It includes the functionalities for user login/authentification, adding new blogs,
// displaying a list of blogs and interacting with individual blog posts.

import { useReducer } from 'react'
import { useQuery } from 'react-query'

// components
import Navigation from './components/Navigation'
import Notification from './components/Notifications'
import BlogsSite from './components/BlogsSite' // Render list of blogs
import BlogSite from './components/BlogSite' // Render information of one blog
import Users from './components/Users' // Render list of all users
import User from './components/User' // Render information of one user

// services
import storageService from './services/storage'
import userService from './services/users'
import blogService from './services/blogs'

// Reducer for passing the functionality to alter notification state to subcomponents
import notificationReducer from './reducers/notificationReducer'

// contexts for passing the notification-state, blogs-state, logged in user-state and users-state for subcomponents
import NotificationContext from './notificationContext'
import BlogsContext from './blogsContext'
import LoggedInContext from './loggedInContext'
import UsersContext from './usersContext'

// React Routerin tarjoama reititys:
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

// Main app of blog app.
const App = () => {
  // useReducer to manage notification state throughout the app
  // Returns the current notification state and a dispatch function to update it
  const [ notification, notificationDispatch ] = useReducer(notificationReducer, '')
  // Fetch blogs and app users from the database using the react-query library.
  const blogResult = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false
  })
  const userResult = useQuery('users', userService.getAll, {
    refetchOnWindowFocus: false
  })
  if ( blogResult.isLoading || userResult.isLoading ) {
    return <div>loading data...</div>
  }
  const blogs = blogResult.data
  const usersList = userResult.data

  // Fetch logged in user from window
  const user = storageService.loadUser()

  // App title styling
  const appTitle = {
    fontSize: 36,
    padding: 10,
    backgroundColor: "lightgray",
    borderBottomRightRadius: 28,
    borderBottomLeftRadius: 28,
    textAlign: "center",
    marginBottom: 20
  }

  return (
    <NotificationContext.Provider value ={[ notification, notificationDispatch ]}>
      <BlogsContext.Provider value ={[ blogs ]}>
        <UsersContext.Provider value ={[ usersList ]}>
          <LoggedInContext.Provider value ={[ user ]}>
            <Router>
              <div className="container">
                <Navigation/>
                <Notification/>
                <h2 style={appTitle}>Blog app</h2>
              </div>
              <Routes>
                <Route path="/blogs/:blogId" element={<BlogSite/>} />
                <Route path="/" element={<BlogsSite/>} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User/>} />
              </Routes>
            </Router>
          </LoggedInContext.Provider>
        </UsersContext.Provider>
      </BlogsContext.Provider>
    </NotificationContext.Provider>
  )
}

export default App