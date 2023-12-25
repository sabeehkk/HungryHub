import React from 'react'

type image ={
    img:string
}

function loginPageLeftImage({img}:image) {
    return (
        <div className="flex-none hidden md:block rounded-lg">
          <img className='w-full h-full object-cover rounded-s-lg rounded-r-lg' src={img} alt="img" />
        </div>
      );
    }

export default loginPageLeftImage