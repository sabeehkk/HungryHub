import React from 'react'
import LoginPageLeftImage from './loginPageLeftImage'

type LoginFrameProps = {
    SidePart:React.FC;
    img:string;
}

function LoginFrame({SidePart,img}:LoginFrameProps) {
  return (
    <div className='flex'>
      {/* <div className='w-1/2 m-l' > */}
      <div className="w-1/2 ml-32 mt-36">

      <LoginPageLeftImage img={img}/>
      </div>
      <div className='w-1/2'>
      <SidePart/>
      </div>
    </div>
  )
}

export default LoginFrame