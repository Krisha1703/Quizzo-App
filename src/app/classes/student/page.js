import React from 'react'
import Navbar from '@/components/dashboard/navbar';
import ClassList from '@/components/dashboard/class-list';
import SidePopup from '@/components/dashboard/side-popup';

const StudentDashboard = () => {
  return (
    <div>
        <Navbar />
        <ClassList />
        <SidePopup />
    </div>
  )
}

export default StudentDashboard