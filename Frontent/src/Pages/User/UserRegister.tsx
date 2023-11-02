import React from 'react'
import LoginFrame from '../../Components/loginFrame'
import Signup from '../../Components/User/UserREgister'

function UserRegister() {
  const imgUrl:string='https://png.pngtree.com/thumb_back/fw800/background/20231003/pngtree-d-rendering-of-tablet-pc-mockup-displaying-an-online-food-ordering-image_13562533.png'
  return (
    <LoginFrame SidePart={Signup} img={imgUrl}/>
  )
}

export default UserRegister
