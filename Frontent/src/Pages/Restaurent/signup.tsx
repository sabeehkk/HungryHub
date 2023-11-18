import React from 'react' ;
import LoginFrame from '../../Components/loginFrame';
import Signup from '../../Components/Restaurant/Signup';

function RestaurentSignup() {
  const imgUrl:string='https://thumbs.dreamstime.com/z/senior-couple-eating-salad-restaurant-table-isolated-white-background-senior-couple-eating-salad-restaurant-table-144580304.jpg?w=992'

  return (
    <LoginFrame SidePart={Signup} img={imgUrl}/>

  )
}

export default RestaurentSignup

