import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

export const useReset = (fields) => {
  const resetFields = () => {
      fields.forEach((field) => field.onChange( {target: { value: ''}}));
  }
 return {
  resetFields
 }
}