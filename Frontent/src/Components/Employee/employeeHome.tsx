import React from 'react'

function employeeHome() {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-semibold mb-4">Welcome, Employee Name</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-200 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Employee Details</h2>
          <p>Employee ID: 12345</p>
          <p>Email: employee@example.com</p>
          <p>Department: HR</p>
        </div>
        <div className="p-4 bg-green-200 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Tasks</h2>
          <ul>
            <li>Task 1</li>
            <li>Task 2</li>
            <li>Task 3</li>
          </ul>
        </div>
      </div>
      <img src="https://img.freepik.com/free-photo/food-delivery-boy-delivering-food-scooter_1303-27695.jpg?t=st=1699251418~exp=1699252018~hmac=22056e725ff33968abb393eb0977249132596dc84ecc5843bc5f92e2e436b057" alt="" />
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Employee Actions</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
          Edit Profile
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">
          Logout
        </button>
      </div>
    </div>
  </div>
  )
}

export default employeeHome