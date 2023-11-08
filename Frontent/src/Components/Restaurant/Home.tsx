import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  
  return (
   <>
     <img  src="https://png.pngtree.com/thumb_back/fw800/background/20231016/pngtree-takeaway-food-containers-delivered-on-a-textured-gray-table-image_13629756.png" alt=""  className='w-full'/>
   <div>
   <Link to="/restaurent/logout" className="mt-3">Logout</Link>
   </div>
   </>
  
  )
}


export default Home