// BlogForm component renders blog addition form for users
// Accepts the following prop: handleBlogAddition: Function to handle blog form submission

import { useState } from 'react'
const BlogForm = ({ handleBlogAddition }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: '',
    likes: null,
    userId: null
  })

  // updates the formData state by creating a new object with the updated value.
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      // spread syntax to create a new object with the updated value.
      ...prevFormData,
      [name]: value
    }))
  }

  return (
    <div className='blogDiv'>
      <h2>Create a new blog</h2>
      <form onSubmit={(event) => {
        event.preventDefault()
        handleBlogAddition(formData)
        setFormData({
          'title':'',
          'author':'',
          'url':'',
          'likes': null,
          'userId': null
        })}}>
        <div>
          title:
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder='write title here'
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder='write author here'
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder='write url here'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm