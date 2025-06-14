//Student Class Dashboard

import Navbar from '@/components/class/navbar';
import ClassList from '@/components/class/class-list';
import SidePopup from '@/components/class/side-popup';

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