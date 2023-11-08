import React from 'react'
import LOgin from '../../Components/Admin/adminLOgin'
import LoginFrame from '../../Components/loginFrame'

function AdminLOgin() {
  const imgUrl:string='https://media.istockphoto.com/id/1393379221/photo/financial-family-planning-and-budgeting-the-concept-of-money-management-for-a-little-person.webp?b=1&s=170667a&w=0&k=20&c=qcCQ70-XVvO6HfDPKU3NUXOVKKj-UqtL4obje07Ngrg='
  return (
   <LoginFrame SidePart={LOgin} img={imgUrl}/>
  )
}

export default AdminLOgin

