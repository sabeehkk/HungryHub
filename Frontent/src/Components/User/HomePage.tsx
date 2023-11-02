import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Restaurant Name</h1>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Menu
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Reservations
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-16 bg-cover bg-center relative" style={{ backgroundImage: "url('/restaurant-image.jpg')" }}>
        <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
        <div className="container mx-auto relative z-10 text-center text-white">
          <h2 className="text-4xl font-semibold">Welcome to Our Restaurant</h2>
          <Link to="/logout">Logout</Link>
          <p className="mt-4 text-lg">Savor the flavors of our delicious dishes.</p>
          <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-6 rounded-full inline-block">
            View Menu
          </a>
        </div>
      </header>

      {/* Menu Section */}
      <section className="container mx-auto py-8">
        <h3 className="text-3xl font-semibold text-gray-800 text-center mb-6">Our Menu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-4 rounded shadow-lg">
            <h4 className="text-xl font-semibold text-gray-800">Appetizers</h4>
            <p className="mt-4 text-gray-600">Delightful starters to kick off your meal.</p>
          </div>
          <div className="bg-white p-4 rounded shadow-lg">
            <h4 className="text-xl font-semibold text-gray-800">Main Courses</h4>
            <p className="mt-4 text-gray-600">Satisfying main dishes that will leave you craving for more.</p>
          </div>
          <div className="bg-white p-4 rounded shadow-lg">
            <h4 className="text-xl font-semibold text-gray-800">Desserts</h4>
            <p className="mt-4 text-gray-600">Indulge in our sweet and delectable desserts.</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-blue-500 text-white py-8">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-semibold">Contact Us</h3>
          <p className="mt-4 text-lg">For reservations or inquiries, please call us at (123) 456-7890</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 py-4 text-center text-white">
        <p>&copy; {new Date().getFullYear()} Restaurant Name. All rights reserved.</p>
      </footer>
    </div>
    
  )
}

export default HomePage