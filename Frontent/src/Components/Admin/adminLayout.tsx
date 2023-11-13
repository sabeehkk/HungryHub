// AdminLayout.js
import React from 'react';
import AdminSidebar from './AdminSidebar';
import Users from '../../Pages/Admin/usersList';

function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="h-screen flex-1 p-7">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
