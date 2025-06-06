"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import clsx from "clsx";
import MenuItem from "@/components/Navbar/menu-item";

const ClassPage = () => {
  const { classId } = useParams();
  const className = `Class ${classId}`; 
  const [activeTab, setActiveTab] = useState("syllabus");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        return <div className="text-primary">📚 Syllabus content goes here</div>;
      case "quizzes":
        return <div className="text-primary">📝 Quizzes content goes here</div>;
      case "members":
        return <div className="text-primary">👥 Members list goes here</div>;
      case "resources":
        return <div className="text-primary">📁 Resources section</div>;
      case "assignments":
        return <div className="text-primary">🧾 Assignments overview</div>;
      case "scorebook":
        return <div className="text-primary">📊 Scorebook display</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative">

      <header className="bg-secondary text-white px-4 py-5 flex items-center justify-between relative shadow">
        {/* Hamburger Menu to open sidebar */}
        <button className="z-30" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

  
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
          {className}
        </h1>

   
        <div style={{ width: "24px" }} />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={clsx(
            "fixed top-0 left-0 h-full w-64 bg-primary text-white p-4 z-20 transform transition-transform duration-300 ease-in-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="space-y-8 mt-16">
            {tabs.map((tab) => (
              <div key={tab.key} onClick={() => {
                setActiveTab(tab.key);
                setSidebarOpen(false);
              }}>
                <MenuItem
                  title={tab.label}
                  active={activeTab === tab.key}
                  panel={true}
                />
              </div>
            ))}
          </nav>
        </aside>


        <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
      </div>


      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ClassPage;
