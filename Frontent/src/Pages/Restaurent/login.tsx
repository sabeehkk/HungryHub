import React from 'react'
import UserLogin from '../../Components/Restaurant/Login' ;
import LoginFrame from '../../Components/loginFrame';


function RestaurentLogin() {
  const imgUrl:string = 'https://png.pngtree.com/thumb_back/fw800/background/20230714/pngtree-3d-render-of-food-delivery-image_3857591.jpg'
  return (
    <LoginFrame SidePart={UserLogin} img={imgUrl}/>
  )
}

export default RestaurentLogin