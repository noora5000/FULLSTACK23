import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    notificationChange(state, action) {
      return (action.payload)
    }
  }
})

export const setNotification = (message, timeout) => {
  return dispatch => {
    dispatch(notificationChange(message))
    setTimeout(() => {
      dispatch(notificationChange(''))
    }, timeout*1000);
  }
}

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer