"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import EditClass from "@/components/dashboard/edit-class";
import { EllipsisVertical } from "lucide-react";
import { saveAs } from "file-saver";
import ModalHeader from "@/components/homepage/modal/modal-header";
import { useRouter } from "next/navigation";


export default function ClassList() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [mobileMenuOpenId, setMobileMenuOpenId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.userId);
      setUserRole(user.role);
      if (user.role == "Teacher") {
        setActionMenuOpen(true);
      }
      else {
        setActionMenuOpen(false); 
      }
    }
  }, []);


  useEffect(() => {
    if (!userId) return;

    const fetchClasses = async () => {
      try {
        const res = await fetch(`/api/class/list?userId=${userId}`);
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setClasses(data.classes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [userId]);

  const openModal = (type, classId) => {
    setSelectedClassId(classId);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setCopied(false);
  };

  const handleDelete = async () => {
    if (!selectedClassId) return;
    try {
      await fetch(`/api/class/delete/${selectedClassId}`, { method: "DELETE" });
      setClasses(classes.filter(cls => cls.classId !== selectedClassId));
      closeModal();
    } catch (err) {
      alert("Failed to delete class.");
    }
  };

  const handleCopyCode = () => {
    const cls = classes.find(c => c.classId === selectedClassId);
    if (cls) {
      navigator.clipboard.writeText(cls.classCode);
      setCopied(true);
    }
  };

const handleExport = (classId) => {
  const cls = classes.find(c => c.classId === classId);
  if (!cls) return;

  const exportData = {
    Name: cls.name,
    CreatedAt: new Date(cls.createdAt).toLocaleString(),
    Students: cls.totalStudents,
    ClassCode: cls.classCode,
    Schedule: cls.schedule || "-",
    Description: cls.description || "-",
    LearningOutcomes: Array.isArray(cls.learningOutcomes)
      ? cls.learningOutcomes.join(", ")
      : typeof cls.learningOutcomes === "string"
      ? cls.learningOutcomes
      : "-"
  };

  const csv = Object.entries(exportData)
    .map(([key, val]) => `${key}, "${val}"`)
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  saveAs(blob, `${cls.name}_details.csv`);
};


  const toggleMobileMenu = (classId) => {
    setMobileMenuOpenId((prev) => (prev === classId ? null : classId));
  };

  if (loading) return <p>Loading classes...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!classes.length) return <p>No classes found for your account.</p>;

const headerTitles = userRole === "Teacher"
  ? ["Class Name", "Created At", "Students", "Class Code", "Schedule", "Actions"]
  : ["Class Name", "Created At", "Students", "Class Code", "Schedule"];


  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4">
      {/* Header */}
      <div className={`hidden md:grid ${userRole === "Teacher" ? "grid-cols-6" : "grid-cols-5"} gap-4`}>
        {headerTitles.map((title) => (
          <div
            key={title}
            className="bg-primary text-white font-semibold text-center py-2 px-3 rounded-lg shadow-sm"
          >
            {title}
          </div>
        ))}
      </div>

   
      {classes.map((cls) => (
        <div key={cls.classId} className="space-y-1">
          {/* Desktop */}
           <div className={`hidden md:grid ${userRole === "Teacher" ? "grid-cols-6" : "grid-cols-5"} gap-4 items-center`}>
            <div className="bg-secondary px-3 py-2 rounded-lg text-white text-center truncate hover:bg-primary cursor-pointer" onClick={() => router.push(`/class/${cls.classId}`)}>{cls.name}</div>
            <div className="bg-secondary px-3 py-2 rounded-lg text-white text-center truncate">
              {new Date(cls.createdAt).toLocaleDateString()}
            </div>
            <div className="bg-secondary px-3 py-2 rounded-lg text-white text-center truncate">{cls.totalStudents}</div>
            <div className="bg-secondary px-3 py-2 rounded-lg text-white text-center truncate">{cls.classCode}</div>
            <div className="bg-secondary px-3 py-2 rounded-lg text-white text-center truncate">
              {cls.schedule || "-"}
            </div>
       

            <div className="bg-white px-3 py-2 rounded-lg flex justify-center items-center gap-2">
              {actionMenuOpen && (
                <div className="bg-white px-3 py-2 rounded-lg flex justify-center items-center gap-2">
                  {[
                    { name: "edit", icon: "/Assets/edit.svg", alt: "Edit", width: 30, height: 30 },
                    { name: "delete", icon: "/Assets/delete.svg", alt: "Delete", width: 27, height: 27 },
                    { name: "share", icon: "/Assets/share.svg", alt: "Share", width: 25, height: 25 },
                    { name: "export", icon: "/Assets/download.svg", alt: "Export", width: 23, height: 23 },
                  ].map((action) => (
                    <button
                      key={action.name}
                      onClick={() => {
                        if (action.name === "export") handleExport(cls.classId);
                        else openModal(action.name, cls.classId);
                      }}
                    >
                      <Image
                        src={action.icon}
                        alt={action.alt}
                        width={action.width}
                        height={action.height}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          

          {/* Mobile */}
          <div className="md:hidden bg-secondary text-white rounded-lg p-4 space-y-1">
            <div onClick={() => router.push(`/class/${cls.classId}`)}><strong>Class Name:</strong> {cls.name}</div>
            <div><strong>Created:</strong> {new Date(cls.createdAt).toLocaleDateString()}</div>
            <div><strong>Students:</strong> {cls.totalStudents}</div>
            <div><strong>Code:</strong> {cls.classCode}</div>
            <div><strong>Schedule:</strong> {cls.schedule || "-"}</div>

            {userRole === "Teacher" && (
              <div className="relative mt-3 flex justify-end">
                <button onClick={() => toggleMobileMenu(cls.classId)}>
                  <EllipsisVertical className="w-6 h-6 text-white" />
                </button>

                {mobileMenuOpenId === cls.classId && (
                  <div className="absolute right-0 mt-2 bg-white rounded shadow-lg p-2 flex gap-3 z-10">
                    {[
                      { name: "edit", icon: "/Assets/edit.svg", alt: "Edit", width: 30, height: 30 },
                      { name: "delete", icon: "/Assets/delete.svg", alt: "Delete", width: 27, height: 27 },
                      { name: "share", icon: "/Assets/share.svg", alt: "Share", width: 25, height: 25 },
                      { name: "export", icon: "/Assets/download.svg", alt: "Export", width: 23, height: 23 },
                    ].map((action) => (
                      <button
                        key={action.name}
                        onClick={() => {
                          if (action.name === "export") handleExport(cls.classId);
                          else openModal(action.name, cls.classId);
                        }}
                      >
                        <Image
                          src={action.icon}
                          alt={action.alt}
                          width={action.width}
                          height={action.height}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>


          {/* Modals */}
          {activeModal === "edit" && selectedClassId === cls.classId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
              <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-3xl w-full">
                <EditClass onClose={closeModal} classId={cls.classId} />
              </div>
            </div>
          )}

          {activeModal === "delete" && selectedClassId === cls.classId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2  min-h-[44vh] max-h-[45vh] max-w-md w-full bg-white rounded shadow-lg">
            <div className="p-6 mt-10">
              <div className="space-y-4 text-center">
                <ModalHeader onClose={closeModal} />
                <p className="text-lg font-semibold">Are you sure you want to delete this class?</p>

                <div className="flex justify-center gap-4">
                  <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                  <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                </div>
              </div>
            </div>
          </div>
            </div>
        )}

          {activeModal === "share" && selectedClassId === cls.classId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2  min-h-[49vh] max-h-[50vh] max-w-md w-full bg-white rounded shadow-lg">
            <div className="p-6 mt-10">
              <div className="space-y-4 text-center">
                <ModalHeader onClose={closeModal} />
                <p className="text-lg font-semibold">Share the class code with others</p>

                <div className="flex ">
                  <input
                    readOnly
                    value={cls.classCode}
                    className="border px-3 py-2 w-full text-center rounded-r-none rounded"
                  />
                  <button
                    onClick={handleCopyCode}
                    className="bg-blue-600 text-white px-4 py-2 rounded-l-none rounded whitespace-nowrap"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>
            </div>
        )}

        </div>
      ))}
    </div>
  );
}
