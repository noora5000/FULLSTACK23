// The main app component.
// Main app is responsible for managing the state and rendering the app user interface.
// It includes the functionalities for user login/authentification, adding new blogs,
// displaying a list of blogs and interacting with individual blog posts.
//
// Components used within the App component:
// - Togglable: A component that provides toggling functionality to show or hide content.
// - LoginForm: A form for user login.
// - BlogForm: A form for creating new blog posts.
// - Blog: A component for rendering individual blog posts.
// - LoggedIn: A component displaying information about the logged-in user.
// - Notification: A component for displaying notifications or error messages.

import { useState, useEffect, useRef } from 'react'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import LoggedIn from './components/LoggedinView'
import Notification from './components/Notifications'
import blogService from './services/blogs'
import loginService from './services/login'

// Main app of blog app.
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const [user, setUser] = useState(null)
  // useRef hook is used to create a reference called blogFormRef.
  // It gets attached to the Togglable component, which includes the form that's used to create new blogs.
  const blogFormRef = useRef()
  // assisting variable to help update the page after alterations.
  const [renderAgain, setRenderAgain] = useState(null)

  // useEffect-hook fetches the blogs from the backen when renderAgain-variable's state is updated.
  useEffect(() => {
    fetchBlogs()
  }, [renderAgain])

  const fetchBlogs = async() => {
    try {
      // fetch blogs from backend using blogService.getAll-function
      const response = await blogService.getAll()
      // sort retrieved blogs according to the number of likes
      const sortedResponse = response.sort((a, b) => { return(b.likes - a.likes)})
      // update the state of blogs-array
      setBlogs(sortedResponse)

    } catch(error){
      setMessage('Error fetching data.')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 4000)
    }
  }
  // useEffect-hook retrieves the info of logged in user from the browser,
  // sets the user-variable state and calls blogService-setToken-function
  // when page is loaded/reloaded
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Passed as a parameter to loginForm and executed when user submits login-credentials.
  // Sends login credentials to loginService.login-function and saves the response to the temporary userTemp-variable.
  const handleLogin = async (username, password) => {
    try {
      // when login is successful, frontend receives the token from the backend and saves it to the userTemp.token
      const userTemp = await loginService.login({
        username, password,
      })
      // Save logged-in user to browser's local storage in JSON form
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userTemp))
      // user.token gets passed to the blogService.setToken-function.
      blogService.setToken(userTemp.token)
      setUser(userTemp)
    } catch (exception) {
      setMessage('wrong username or password')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 4000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }
  // Passed as a parameter to blogForm. Calls the function inside blogService that saves the blog to the database.
  const handeBlogAddition = async (formData) => {
    try{
      // replace the possible '' -values in blog objects with null
      const blogCorrect = Object.keys(formData).reduce((acc, key) => {
        if (formData[key] === '') {
          acc[key] = null
        } else {
          acc[key] = formData[key]
        }
        return acc
      }, {})

      // Hide blogForm (form used for saving new blogs) when submitting a new blog
      blogFormRef.current.toggleVisibility()

      // save the new blog to the backend inside blogService.crete-function.
      // Update renderAgain state at the same time.
      setRenderAgain(await blogService.create(blogCorrect))

      setMessage(`a new blog ${blogCorrect.title} by ${blogCorrect.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 4000)

    } catch(error){
      setMessage('Bad request (400), please make sure you added the title and the url')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 4000)
    }
  }
  // Passed as a parameter to Blog. Calls the function inside blogService that updates the existing blog inside the database.
  const handleLike = async (blog) => {
    try{
      // create an updated blog-object that gets sent to the database with update-request.
      const updatedBlog = {
        ...blog,
        'likes': blog.likes+1
      }
      // make a request to the database inside blogService.update-function. Update renderAgain at the same time.
      setRenderAgain(await blogService.update(blog.id, updatedBlog))

    } catch(error){
      setMessage('Error updating the like counter')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 4000)
    }
  }


  // Passed as a parameter to Blog. Calls the function inside blogService that deletes the existing blog inside the database.
  const handleDelete = async (event, blog) => {
    event.preventDefault()
    try{
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
        // delete blog inside blogService.deleteById
        await blogService.deleteById(blog.id)

        // update renderAgain-state
        setRenderAgain(await blogService.getAll())
        setMessage(`Blog ${blog.title} by ${blog.author} removed`)
        setError(false)
        setTimeout(() => {
          setMessage(null)
          setError(false)
        }, 4000)
      }
    } catch(error){
      setMessage('Error-removing blog failed')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 4000)
    }
  }

  return (
    <div>
      <Notification message={ message } error={ error } />
      {!user &&
        <Togglable buttonLabel='login'>
          <LoginForm handleLogin={handleLogin}/>
        </Togglable>}
      {user &&
        <div>
          <h2>blogs</h2>
          <LoggedIn user={ user } handleLogout={ handleLogout }/>
          <Togglable buttonLabel='add a new blog' ref={blogFormRef}>
            <BlogForm handleBlogAddition={ handeBlogAddition }/>
          </Togglable>

          {blogs.map(blog =>
            <Blog key={ blog.id } blog={ blog } handleLike={ handleLike } user={ user } handleDelete={ handleDelete }/>
          )}


        </div>
      }
    </div>
  )
}

export default App