import React from 'react'
import LoginPageLeftImage from './loginPageLeftImage'

type LoginFrameProps = {
    SidePart:React.FC;
    img:string;
}

function LoginFrame({SidePart,img}:LoginFrameProps) {
  return (
    <div>
        <LoginPageLeftImage img={img}/>
        <SidePart/>
    </div>
  )
}

export default LoginFrame