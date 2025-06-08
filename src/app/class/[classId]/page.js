"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import clsx from "clsx";
import MenuItem from "@/components/Navbar/menu-item";
import Syllabus from "@/components/classpage/syllabus";
import ModalFooter from "@/components/homepage/modal/modal-footer";
import Image from "next/image";
import Members from "@/components/classpage/members";
import Resources from "@/components/classpage/resources";
import Assignments from "@/components/classpage/assignments";

const ClassPage = () => {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [activeTab, setActiveTab] = useState("syllabus");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUserRole(user.role);
          setUserId(user.userId);
        }
      }
    }, []);

    console.log("User Role:", userRole);
  console.log("User ID:", userId);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const res = await fetch(`/api/class/${classId}`);
        const data = await res.json();
        if (res.ok) {
          setClassData(data);
        } else {
          console.error("Failed to fetch class:", data.message || res.status);
        }
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    if (classId) fetchClassData();
  }, [classId]);

  const tabs = [
    { key: "syllabus", label: "Syllabus" },
    { key: "quizzes", label: "Quizzes" },
    { key: "members", label: "Members" },
    { key: "resources", label: "Resources" },
    { key: "assignments", label: "Assignments" },
    { key: "scorebook", label: "Scorebook" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "syllabus":
        return (
          <Syllabus
            description={classData?.description || ""}
            learningOutcomes={classData?.learningOutcomes?.split(", ") || []}
            schedules={classData?.schedule?.split(", ") || []}
          />
        );
      case "quizzes":
        return <div className="text-primary">📝 Quizzes content goes here</div>;
      case "members":
        return (
          <Members 
            teacher={{
              fullName: `${classData.teacher?.user?.firstName} ${classData.teacher?.user?.lastName}`,
              email: classData.teacher?.user?.email,
              role: classData.teacher?.user?.role,
              customId: classData.teacher?.teacherId,
            }}
            students={classData.students?.map((student) => ({
              fullName: `${student.user?.firstName} ${student.user?.lastName}`,
              email: student.user?.email,
              role: student.user?.role,
              customId: student.studentId,
            })) || []}
          />
        );

     case "resources":
      return (
        <Resources
          userRole={userRole}
          existingResources={classData.resource || []}
        />
      );

      case "assignments":
        return (
          <Assignments
            userRole={userRole}
            classId={classId}
            userId={userId}
          />
        );
      case "scorebook":
        return <div className="text-primary">📊 Scorebook display</div>;
      default:
        return null;
    }
  };

  if (!classData) {
    return <div className="text-center p-6">Loading class data...</div>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col relative">
      <header className="bg-secondary text-white px-4 py-3 flex items-center justify-between relative shadow">
        <button className="z-30" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Image
            src={sidebarOpen ? "/Assets/close.webp" : "/Assets/menu.svg"}
            alt={sidebarOpen ? "Close" : "Menu"}
            width={sidebarOpen ? 30 : 50}
            height={sidebarOpen ? 30 : 50}
          />
        </button>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
          {classData.name || `Class ${classId}`}
        </h1>

        <div style={{ width: "24px" }} />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className={clsx("fixed top-0 left-0 h-full w-64 bg-primary text-white p-4 z-20 transform transition-transform duration-300 ease-in-out", sidebarOpen ? "translate-x-0" : "-translate-x-full")}>
          <nav className="space-y-8 mt-16">
            {tabs.map((tab) => (
              <div key={tab.key} onClick={() => {
                setActiveTab(tab.key);
                setSidebarOpen(false);
              }}>
                <MenuItem title={tab.label} active={activeTab === tab.key} panel={true} />
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-10" onClick={() => setSidebarOpen(false)} />
      )}
      <ModalFooter />
    </div>
  );
};

export default ClassPage;
