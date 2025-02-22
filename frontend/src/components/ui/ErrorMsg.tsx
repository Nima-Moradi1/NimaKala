import React from 'react'

const ErrorMsg = ({msg}) => {
  return (
    <p className="error text-center w-full p-3">
    <span className="mx-3">⚠️</span>
    <span>{msg}</span>
</p>
  )
}

export default ErrorMsg