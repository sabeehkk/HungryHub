import React from 'react'
import { Link } from 'react-router-dom'

function adminHome() {
  return (
   <div className="container mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Panel</h1>
    <p className="text-gray-700">This is the home page of the admin panel. You can manage users, settings, and other administrative tasks from here.</p>

</div>
  )
}

export default adminHome