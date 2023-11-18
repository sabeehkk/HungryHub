import React from 'react'
import UserLogin from '../../Components/Restaurant/Login' ;
import LoginFrame from '../../Components/loginFrame';


function RestaurentLogin() {
  const imgUrl:string = 'https://thumbs.dreamstime.com/z/senior-couple-eating-salad-restaurant-table-isolated-white-background-senior-couple-eating-salad-restaurant-table-144580304.jpg?w=992'
  return (
    <LoginFrame SidePart={UserLogin} img={imgUrl}/>
  )
}

export default RestaurentLogin