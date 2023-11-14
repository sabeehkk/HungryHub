import React from 'react'
import SidebarItems from '../../Components/Admin/sidebarItems'
import Frame from '../../frame/frame'

function AdminFrame() {
  return (
   <Frame sidebarItem={SidebarItems}/>
  )
}

export default AdminFrame