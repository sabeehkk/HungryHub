import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  
  return (
   <>
     <img  src="https://png.pngtree.com/background/20230618/original/pngtree-illustrated-3d-render-of-food-and-order-button-on-background-for-picture-image_3755940.jpg" alt=""  className='w-full'/>
   <div>
   <Link to="/restaurent/logout" className="mt-3">Logout</Link>
   </div>
   </>
  )
}

export default Home