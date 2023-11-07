import React from 'react'

import LoginFrame from '../../Components/loginFrame'
import Login from '../../Components/Employee/employeeLogin';

function EmployeeLogin (){
    const imgUrl :string = 'https://png.pngtree.com/thumb_back/fw800/background/20230714/pngtree-3d-render-of-delicious-food-delivery-image_3857593.jpg';
     return (
        <LoginFrame SidePart={Login} img={imgUrl}/>
     )
}

export default EmployeeLogin