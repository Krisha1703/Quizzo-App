"use client";
import React from 'react';
import Navbar from '@/components/dashboard/navbar';
import ClassList from '@/components/dashboard/class-list';

const TeacherDashboard = () => {
   

  return (
    <div>
        <Navbar />
        <ClassList />
    </div>
  )
}

export default TeacherDashboard