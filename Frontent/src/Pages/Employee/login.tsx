import React from 'react'

import LoginFrame from '../../Components/loginFrame'
import Login from '../../Components/Employee/employeeLogin';

function EmployeeLogin (){
    const imgUrl :string = 'https://as2.ftcdn.net/v2/jpg/03/70/69/85/1000_F_370698540_6fcNip06uPXd3Ry1c1MOCQOSFZQHTtgP.jpg';
     return (
        <LoginFrame SidePart={Login} img={imgUrl}/>
     )
}

export default EmployeeLogin