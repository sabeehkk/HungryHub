import React from 'react'
import LoginFrame from '../../Components/loginFrame'
import Signup from '../../Components/Employee/employeeSignup'
function EmployeeSignup() {
  const imgUrl:string='https://img.freepik.com/free-vector/delivery-service-with-masks-concept_23-2148497067.jpg?size=626&ext=jpg&ga=GA1.1.427980817.1697777673&semt=ais'
  return (
   <LoginFrame SidePart={Signup} img={imgUrl}/>
  )
}

export default EmployeeSignup

