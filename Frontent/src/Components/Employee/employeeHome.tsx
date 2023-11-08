import React from 'react'
import { Link } from 'react-router-dom'
function employeeHome() {
  return (
    <>
    
    <img src="https://img.freepik.com/free-photo/food-delivery-boy-delivering-food-scooter_1303-27695.jpg?t=st=1699251418~exp=1699252018~hmac=22056e725ff33968abb393eb0977249132596dc84ecc5843bc5f92e2e436b057" alt="" className='w-full' />
   <Link to="/employee/logout" className="mt-3">Logout</Link>
    </>
   
    
  )
}

export default employeeHome