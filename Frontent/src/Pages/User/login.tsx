import React from 'react'
// import LoginFrame from '../../Components'
import UserLogin from '../../Components/User/UserLogin'
import LoginFrame from '../../Components/loginFrame'

function Login() {
    const imgUrl:string = 'https://smallbiztrends.com/ezoimgfmt/media.smallbiztrends.com/2023/03/Most-Profitable-Types-of-Restaurants-850x476.png?ezimgfmt=rs:840x470/rscb12/ng:webp/ngcb12'
  return (
    <LoginFrame SidePart={UserLogin} img={imgUrl}/>
  )
}

export default Login