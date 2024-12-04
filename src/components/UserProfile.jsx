import React from 'react'
import { Link } from 'react-router-dom'

const UserProfile = () => {
  return (
    <div>
      <h1>User profile</h1>
      <Link to={`/`}>Back to home</Link>
    </div>
  )
}

export default UserProfile