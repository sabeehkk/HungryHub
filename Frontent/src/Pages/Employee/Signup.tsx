import React from 'react'
import LoginFrame from '../../Components/loginFrame'
import Signup from '../../Components/Employee/employeeSignup'
function EmployeeSignup() {
  const imgUrl:string='https://img.freepik.com/free-vector/delivery-staff-ride-motorcycles-shopping-concept_1150-34879.jpg?w=826&t=st=1699383958~exp=1699384558~hmac=476ae1a04ffec5693c4b87fad2423d44a7e15a646b209b326c2ebe9831bb3ea6'
  return (
   <LoginFrame SidePart={Signup} img={imgUrl}/>
  )
}

export default EmployeeSignup

