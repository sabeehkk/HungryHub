import React from 'react'

function Navbar() {
  return (

    <nav className="bg-gradient-to-r from-red-400 to-yellow-500 py-4">
    <div className="container mx-auto flex items-center justify-between">
      <a href="/" className="text-3xl font-bold text-white">Hungry Hub</a>
      <ul className="flex space-x-6">
        <li><a href="#" className="text-white hover:text-yellow-200">Home</a></li>
        <li><a href="#" className="text-white hover:text-yellow-200">Menu</a></li>
        <li><a href="#" className="text-white hover:text-yellow-200">About Us</a></li>
        <li><a href="/logout" className="text-white hover:text-yellow-200">Logout</a></li>
      </ul>
    </div>
  </nav>
      )
}

export default Navbar