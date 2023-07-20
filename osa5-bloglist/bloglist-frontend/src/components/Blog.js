// Blog component renders an individual blog on the screen. Blog visibility can be toggled by a button.
// Accepts the following props:
//   - blog: the blog object containing title, auhtor, url, likes and user
//   - handleLike: Function to handle the like button click event
//   - user: Currently logged-in user object
//   - handleDelete: Function to handle the delete button click event

import { useState } from 'react'

const Blog = ( { blog, handleLike, user, handleDelete } ) => {
  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  // show compact form of blog or show all info. Set the value from the viewButton.
  const [showAll, setShowAll] = useState(false)

  if (!showAll) {
    return(
      <div className='blog' style={blogStyle}>
        { blog.title } { blog.author }<button className='viewButton' onClick={() => setShowAll(true)}>view</button>
      </div>
    )
  } else {
    // delete button is rendered conditionally. Logged in user can delete their own blogs.
    return (
      <div className='blogShowAll' style={blogStyle}>
        {blog.title} {blog.author} <button onClick={() => setShowAll(false)}>hide</button> <br/>
        {blog.url}<br/>
        likes {blog.likes} <button className='likeButton' onClick={() => handleLike(blog)}>like</button> <br/>
        {blog.user.name}
        {user.username === blog.user.username && (
          <button className='deleteButton' onClick={(event) => handleDelete(event, blog)}>delete</button>
        )}
      </div>
    )
  }

}
export default Blog