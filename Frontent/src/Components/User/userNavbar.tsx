import React ,{useState}from 'react'
import {AiOutlineMenu,AiOutlineSearch ,AiOutlineClose} from 'react-icons/ai';
import {BsFillCartFill} from 'react-icons/bs'
import {TbTruckDelivery} from 'react-icons/tb'
import  {FaUserFriends,FaWallet} from 'react-icons/fa'
import {MdFavorite,MdHelp} from 'react-icons/md'
import { Link } from 'react-router-dom';

const UserNavbar=()=> {
  const [nav,setNav]=useState(false)
  return (
   <div className='max-w-[1640px] mx-auto
     flex justify-between items-center  p-4'>
            {/* {Left Side} */}
     <div className='flex items-center '>
        <div onClick={()=>setNav(!nav)} className='cusrsor-pointer'>
            <AiOutlineMenu size={30}/>
        </div>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
            Hungry <span className='font-bold'>Hub </span>
        </h1>
        <div className='hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]'>
            <p className='bg-black text-white rounded-full p-2'>Delivery</p>
            <p>Pickup</p>
        </div>
      </div>
      {/* {Search input} */}
       <div  className='bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]' >
        <AiOutlineSearch size={20}/>
        <input className='bg-transparent p-2 w-full focus:outline-none' type="text" placeholder='Search foo ds'/>
       </div>
       {/* {CartButton} */}
       <button className='bg-black text-white hidden md:flex items-center py-2 rounded-full'>
       <BsFillCartFill size={20} className='mr-2' /> Cart
       </button>
       {/* {Mobile Menu} */}
       {/* {Overlay} */}
       {nav ?<div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'>
           </div> : ''}

           <div className={nav ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300 ':'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300 '}>
  <AiOutlineClose onClick={() => setNav(!nav)} size={30} className='absolute right-4 top-4 cursor-pointer'/>
  <h2 className='text-2xl p-4'>Hungry <span className='font-bold'>Hub</span></h2>
  <nav>
    <ul className='flex flex-col p-4 text-gray-800'>
      <li className='text-xl py-4 flex gap-x-2 items-center'>
        <Link to="/employee/signup">
          <TbTruckDelivery size={25} className='mr-4' />
          Orders
        </Link>
      </li>
      <li className='text-xl py-4 flex items-center'>
        <Link to="/employee/login">
          <MdFavorite size={25} className='mr-4 flex'/>
          Favorites
        </Link>
      </li>
      <li className='text-xl py-4 flex items-center'>
        <FaWallet size={25} className='mr-4'/>
        Wallet
      </li>
      <li className='text-xl py-4 flex items-center'>
        <MdHelp size={25} className='mr-4'/>
        Help
      </li>
      <li className='text-xl py-4 flex items-center'>
        <FaUserFriends size={25} className='mr-4'/>
        Invite Friends
      </li>
    </ul>
  </nav>
</div>

           
                 {/* {Side drawer menu} */}
       

    </div>
  )
}

export default UserNavbar