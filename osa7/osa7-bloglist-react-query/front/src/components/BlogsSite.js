// BlogsSite is responsible for rendering the list of all blogs and their authors.
// It provides logged-in users with the functionality to add a new blog to the database using BlogForm-component.
import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
// components
import Togglable from './Togglable'
import BlogForm from './BlogForm'
// contexts
import LoggedInContext from '../loggedInContext'
import blogsContext from '../blogsContext'


const BlogsSite = () => {
  // useRef hook is used to create a reference called blogFormRef.
  // It gets attached to the Togglable component, which includes the form that's used to create new blogs.
  const blogFormRef = useRef()
  // Extract the user-object and blogs-array from the LoggedInContext/blogsContext using useContext hook.
  const [ user ] = useContext(LoggedInContext)
  const [ blogs ] = useContext(blogsContext)

  return(
    <div className="container">
      <h2>Blogs</h2>
      {user
        ? <Togglable buttonLabel='add a new blog' ref={blogFormRef}>
          <BlogForm blogFormRef={ blogFormRef }/>
        </Togglable>
        : <>Log in to add blogs</>
      }
      <br/>
      <Table striped>
        <tbody>
          <tr>
            <th>Blog</th>
            <th>Author</th>
          </tr>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>

    </div>
  )
}

export default BlogsSite