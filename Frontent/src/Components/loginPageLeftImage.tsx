import React from 'react'

type image ={
    img:string
}

function loginPageLeftImage({img}:image) {
    return (
        <div className="flex-none w-1/2 hidden md:block rounded-lg">
          <img className='w-full h-full object-cover rounded-s-lg' src={img} alt="img" />
          
        </div>
      );
    }

export default loginPageLeftImage