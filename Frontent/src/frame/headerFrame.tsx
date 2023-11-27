import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

function Header({Iteams}) {
    const [sideButton, setSideButton] = useState(false);
    return (
      <div className="h-16 top-0 sticky z-10 bg- shadow-lg shadow-gray-200 mb-5 ">
          <div className='md:hidden block fixed top-2 left-2'>
          <AiOutlineMenu
            size={30}
            onClick={() => setSideButton(!sideButton)}
          />
        </div>
        {sideButton &&  <div className='bg-gray-700 md:hidden block mt-16'><Iteams/></div>}
        <div id='profile-pic' className='fixed top-2 right-2'>
          <img
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            alt="profile pic"
            className='w-10 h-10 rounded-full'
          />
        </div>
      </div>
    )
  }

  export default Header;