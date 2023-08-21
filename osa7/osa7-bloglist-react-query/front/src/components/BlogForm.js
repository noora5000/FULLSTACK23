// BlogForm component renders a form that allows logged-in app users to add new blogs.
import { useState } from "react";
import { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import NotificationContext from "../notificationContext";
import blogService from "../services/blogs";
import { Form, Button } from "react-bootstrap"

const BlogForm = ({ blogFormRef }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
    likes: null,
    userId: null,
  });
  // Extract the notification reducer from the NotificationContext using useContext hook.
  // The dispatchNotification contains a dispatch function to update the state of the notification
  // eslint-disable-next-line no-unused-vars
  const [notification, dispatchNotification] = useContext(NotificationContext);

  // queryClient is used for updating the page after blog addition
  const queryClient = useQueryClient()

  // Create an updated object using the current input data from the form, and then update the formData with it.
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      // spread syntax to create a new object with the updated value.
      ...prevFormData,
      [name]: value,
    }));
  };

  // A mutation to create a new blog. Mutation is triggered on submit.
  const newBlogMutation = useMutation(blogService.create, {
    // Invalidate the 'blogs' query in the queryClient's cache.
    // This re-renders the page, hence making the new blog visible without manually refreshing the page.
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
    onError: (error) => {
      // Show an error notification.
      dispatchNotification({ type: 'show', payload: `${ error.message }. Make sure you added the title and url.` })
      setTimeout(() => {
        dispatchNotification({ type: 'show', payload: '' })
      }, 5000)
    }
  })
  // On submit:
  const handleBlogAddition = async (formData) => {
    // Hide blog form:
    blogFormRef.current.toggleVisibility()
    // Create a new blog to the database with useMutation from react-query
    newBlogMutation.mutate(formData)
    // Generate a notification message
    dispatchNotification({ type: 'show', payload: `Created new blog '${formData.title}'` })
    setTimeout(() => {
      dispatchNotification({ type: 'show', payload: '' })
    }, 5000)

  }

  return (
    <div className="blogDiv">
      <h2>Create a new blog</h2>
      <Form onSubmit={(event) => {
        event.preventDefault();
        handleBlogAddition(formData);
        setFormData({
          title: "",
          author: "",
          url: "",
          likes: null,
          userId: null,
        });
      }}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="url"
            type="text"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
          />
          <Button variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};


export default BlogForm;