"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import EditClass from "@/components/dashboard/edit-class";
import { EllipsisVertical } from "lucide-react";

export default function ClassList() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [mobileMenuOpenId, setMobileMenuOpenId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.userId);
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

  const openEditModal = () => setActiveModal("edit");
  const closeModal = () => setActiveModal(null);

  const handleEdit = () => openEditModal();
  const handleExport = (classId) => alert(`Exporting class ${classId}...`);
  const handleShare = (classId) => alert(`Sharing class ${classId}...`);
  const handleDelete = (classId) => {
    if (confirm("Are you sure you want to delete this class?")) {
      alert(`Deleting class ${classId}`);
    }
  };

  const toggleMobileMenu = (classId) => {
    setMobileMenuOpenId((prev) => (prev === classId ? null : classId));
  };

  if (loading) return <p>Loading classes...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!classes.length) return <p>No classes found for your account.</p>;

  const headerTitles = [
    "Class Name",
    "Created At",
    "Students",
    "Class Code",
    "Schedule",
    "Actions",
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-6 gap-4">
        {headerTitles.map((title) => (
          <div
            key={title}
            className="bg-primary text-white font-semibold text-center py-2 px-3 rounded-lg shadow-sm"
          >
            {title}
          </div>
        ))}
      </div>

      {/* Rows */}
      {classes.map((cls) => (
        <div key={cls.classId} className="space-y-1">
          {/* Desktop Row */}
          <div className="hidden md:grid grid-cols-6 gap-4 items-center">
            <div className="bg-secondary px-3 py-2 rounded-lg text-white text-center truncate">{cls.name}</div>
            <div className="bg-secondary px-3 py-2 rounded-lg text-white text-center truncate">
              {new Date(cls.createdAt).toLocaleDateString()}
            </div>
            <div className="bg-secondary px-3 py-2 rounded-lg text-white text-center truncate">{cls.totalStudents}</div>
            <div className="bg-secondary px-3 py-2 rounded-lg text-white text-center truncate">{cls.classCode}</div>
            <div className="bg-secondary px-3 py-2 rounded-lg text-white text-center truncate">
              {cls.schedule || "-"}
            </div>
            <div className="relative">
              <div className="bg-white px-3 py-2 rounded-lg flex justify-center items-center gap-2">
                <button onClick={openEditModal}>
                  <Image src="/Assets/edit.svg" alt="Edit" width={30} height={30} />
                </button>
                <button onClick={() => handleDelete(cls.classId)}>
                  <Image src="/Assets/delete.svg" alt="Delete" width={27} height={27} />
                </button>
                <button onClick={() => handleShare(cls.classId)}>
                  <Image src="/Assets/share.svg" alt="Share" width={25} height={25} />
                </button>
                <button onClick={() => handleExport(cls.classId)}>
                  <Image src="/Assets/download.svg" alt="Export" width={23} height={23} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Card */}
          <div className="md:hidden bg-secondary text-white rounded-lg p-4">
            <div><strong>Class Name:</strong> {cls.name}</div>
            <div><strong>Created:</strong> {new Date(cls.createdAt).toLocaleDateString()}</div>
            <div><strong>Students:</strong> {cls.totalStudents}</div>
            <div><strong>Code:</strong> {cls.classCode}</div>
            <div><strong>Schedule:</strong> {cls.schedule || "-"}</div>

            {/* Mobile Action Menu */}
            <div className="relative mt-3 flex justify-end">
              <button onClick={() => toggleMobileMenu(cls.classId)}>
                <EllipsisVertical className="w-6 h-6 text-white" />
              </button>

              {mobileMenuOpenId === cls.classId && (
                <div className="absolute right-0 m-5 bg-white rounded shadow-lg p-2 flex flex-col gap-3 z-10">
                  <button onClick={openEditModal}>
                    <Image src="/Assets/edit.svg" alt="Edit" width={24} height={24} />
                  </button>
                  <button onClick={() => handleDelete(cls.classId)}>
                    <Image src="/Assets/delete.svg" alt="Delete" width={24} height={24} />
                  </button>
                  <button onClick={() => handleShare(cls.classId)}>
                    <Image src="/Assets/share.svg" alt="Share" width={24} height={24} />
                  </button>
                  <button onClick={() => handleExport(cls.classId)}>
                    <Image src="/Assets/download.svg" alt="Export" width={24} height={24} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Modal */}
          {activeModal === "edit" && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
              <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-3xl w-full">
                <EditClass onClose={closeModal} classId={cls.classId} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
