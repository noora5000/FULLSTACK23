// Togglable component renders content that can be toggled visibility by clicking a button.
// Accepts the following props:
//   - buttonLabel: The label for text for the toggle button
//   - children: The content to be toggled
//   - ref: Used to access the internal toggleVisibility function from parent

import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
// Function creating the togglable-component has been wrapped inside a forwardRef function call.
// By doing this, the component has access to the ref(/reference)-parameter given to it
// by the parent element that calls this function externally.
const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // With the use of the useImperativeHandle hook,
  // the component exposes its internal function toggleVisibility to be called externally.
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  // in this case props.children equals LoginForm.js
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})
Togglable.displayName = 'Togglable'
Togglable.propTypes={
  buttonLabel: PropTypes.string.isRequired
}
export default Togglable