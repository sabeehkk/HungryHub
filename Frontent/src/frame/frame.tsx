import React from 'react'
import { Outlet } from 'react-router-dom';
import SidebarFrame from '../frame/sidebarFrame';

const Frame=({sidebarItem}) =>{

  return (

      <div className='flex'>
        <SidebarFrame Items={sidebarItem}/>    
            <div className="flex-1 flex flex-col">
             <Outlet/>
        </div>
      </div>
  ) 
}

export default Frame