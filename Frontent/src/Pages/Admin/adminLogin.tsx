import React from 'react'
import AdminLOgin from '../../Components/Admin/adminLOgin'
import LoginFrame from '../../Components/loginFrame'

function AdminLogin() {
    const imgUrl:string = 'https://png.pngtree.com/background/20231030/original/pngtree-3d-render-of-a-food-delivery-application-picture-image_5803615.jpg';
     
  return 
    return <LoginFrame SidePart={AdminLOgin} img={imgUrl}/>
  
}

export default AdminLogin