import React from 'react'
// import LoginFrame from '../../Components'
import UserLogin from '../../Components/User/UserLogin'
import LoginFrame from '../../Components/loginFrame'

function Login() {
    const imgUrl:string = 'https://restaurant-hub.deliveroo.net/static/images/chart_illustration.svg'
  return (
    <LoginFrame SidePart={UserLogin} img={imgUrl}/>
  )
}

export default Login