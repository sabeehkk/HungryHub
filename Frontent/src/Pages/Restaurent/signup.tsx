import React from 'react' ;
import LoginFrame from '../../Components/loginFrame';
import Signup from '../../Components/Restaurant/Signup';

function RestaurentSignup() {
  const imgUrl:string='https://images.pexels.com/photos/1861785/pexels-photo-1861785.jpeg'

  return (
    <LoginFrame SidePart={Signup} img={imgUrl}/>

  )
}

export default RestaurentSignup

