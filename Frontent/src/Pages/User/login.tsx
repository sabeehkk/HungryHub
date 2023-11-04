import React from 'react'
// import LoginFrame from '../../Components'
import UserLogin from '../../Components/User/UserLogin'
import LoginFrame from '../../Components/loginFrame'

function Login() {
    const imgUrl:string = 'https://media-cdn.grubhub.com/image/upload/f_auto,fl_lossy,q_auto,c_crop,g_north_west,h_1400,w_1500/v1656688653/homepage/DfxwD.png '
  return (
    <LoginFrame SidePart={UserLogin} img={imgUrl}/>
  )
}

export default Login