"use client";
import React from 'react';
import Navbar from '@/components/dashboard/navbar';
import ClassList from '@/components/dashboard/class-list';
import SidePopup from '@/components/dashboard/side-popup';

const TeacherDashboard = () => {
   

  return (
    <div>
        <Navbar />
        <ClassList />
        <SidePopup />
    </div>
  )
}

export default TeacherDashboard