// BlogSite is responsible for rendering the information of one blog.
// It shows the information of the blog and offers functionalities for adding likes (can be done by anyone) and
// comments (logged-in users only) to the blog.
// The user who has added the blog to the database can also remove it by clicking the delete-button.
import { useQueryClient, useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState, useContext } from "react"
import { Button } from "react-bootstrap"
// services
import blogService from "../services/blogs"
// contexts
import LoggedInContext from "../loggedInContext"
import blogsContext from "../blogsContext"
import NotificationContext from "../notificationContext"
import UsersContext from "../usersContext"

const BlogSite = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { blogId } = useParams()
  // Extract the user-, blogs- and users-objects from the LoggedInContext using useContext hook.
  // The user object contains information about the logged-in user.
  const [ user ] = useContext(LoggedInContext)
  // The blogs-array contains the array of the blog objects
  const [ blogs ] = useContext(blogsContext)
  // The usersList-array contains the array of all app users.
  const [ usersList ] = useContext(UsersContext)
  // Extract the notification reducer from the NotificationContext using useContext hook.
  // The dispatchNotification contains a dispatch function to update the state of the notification
  // eslint-disable-next-line no-unused-vars
  const [ notification, dispatchNotification ] = useContext(NotificationContext)

  const currentBlog = blogs.find(blog => blog.id === blogId)
  // Fetch and save the comments of the current blog to the comments-array.
  // Define as list elements for clearer display.
  const comments = currentBlog.comments.map(comment => <li key={comment._id}>{comment.commentText}</li>)

  // Includes the comment added by the currently logged in user through the comment submission form.
  const [commentText, setCommentText] = useState('');

  // Mutation for updating (like or comment) the blog
  const updateBlogMutation = useMutation(blogService.like, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
    onError: (error) => {
      console.log(`like-function failed: ${error.message}`)
    }
  })
  // Mutation for deleting the blog
  const deleteBlogMutation = useMutation(blogService.deleteById, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
    onError: (error) => {
      console.log(`delete-function failed: ${error.message}`)
    }
  })
  // Functionality for liking the blog
  const handleLike = async () => {
    // create a new updated object and pass it as a parameter for the update-mutation.
    updateBlogMutation.mutate({ ...currentBlog, likes: currentBlog.likes + 1 })
    // set a notification
    dispatchNotification({ type: 'show', payload: `Liked blog ${currentBlog.title} by ${currentBlog.author}.` })
    setTimeout(() => {
      dispatchNotification({ type: 'show', payload: '' })
    }, 5000)

  }
  // Functionality for deleting the blog
  const handleDelete = async (event) => {
    event.preventDefault()
    if(window.confirm(`Remove blog ${currentBlog.title} by ${currentBlog.author}?`)){
      // set a notification
      dispatchNotification({ type: 'show', payload: `Blog ${currentBlog.title} by ${currentBlog.author} removed` })
      setTimeout(() => {
        dispatchNotification({ type: 'show', payload: '' })
      }, 5000)
      // remove the blog by id using mutation
      deleteBlogMutation.mutate(currentBlog.id)
      // navigate to the front page
      navigate('/')
    }
  }
  // Functionality for adding a comment to the blog
  const handleComment = (event) => {
    event.preventDefault();
    if (user) {
      const userId = usersList.find(u => u.username === user.username).id
      // create a new updated object and pass it as a parameter for the update-mutation
      updateBlogMutation.mutate({ ...currentBlog, comments: currentBlog.comments.concat(
        {
          "commentText": commentText,
          "user": userId
        })
      })
      // set notification
      dispatchNotification({ type: 'show', payload: `Added comment to ${currentBlog.title} by ${currentBlog.author}` })
      setTimeout(() => {
        dispatchNotification({ type: 'show', payload: '' })
      }, 5000)
    }
    //Clear the input field after submitting
    setCommentText('');
  };


  return(
    <div className="container">
      <h2>{currentBlog.title} {currentBlog.author}</h2>
      <a href={currentBlog.url}>{currentBlog.url}</a><br/>
      {currentBlog.likes} likes <Button className="likeButton" onClick={() => handleLike()}>like</Button><br/>
      added by { currentBlog.user.name }<br/>
      {comments !== []
        ? <div>
          <h3>comments</h3>
          <ul>{comments}</ul>
        </div>
        : <h3>No comments added.</h3>
      }
      {user
        ?  <div>
          <form onSubmit={handleComment}>
            <div>
              <input
                type="text"
                name="comment"
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)} />
              <button id="comment-button" type="submit">Add comment</button>
            </div>
          </form>
          {user.username === currentBlog.user.username && (
            <Button
              className="deleteButton"
              onClick={(event) => handleDelete(event)}>
                   delete
            </Button>
          )}
        </div>
        : <></>
      }
    </div>
  )
}

export default BlogSite