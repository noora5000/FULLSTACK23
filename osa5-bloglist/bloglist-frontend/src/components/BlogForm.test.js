import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm/>', () => {
  test('updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const handleBlogAddition = jest.fn()

    render(<BlogForm handleBlogAddition={handleBlogAddition} />)

    const input = screen.getByPlaceholderText('write title here')
    const sendButton = screen.getByText('create')

    userEvent.type(input, 'testing a form...')

    await waitFor(() => {
      expect(input.value).toBe('testing a form...')
    })

    await user.click(sendButton)
    await waitFor(() => {
      expect(handleBlogAddition).toHaveBeenCalledTimes(1)
      expect(handleBlogAddition.mock.calls[0][0].title).toBe('testing a form...')
    })


  })
})

