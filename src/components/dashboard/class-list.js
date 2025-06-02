"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import EditClass from "@/components/dashboard/edit-class"; 

export default function ClassList() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const menuRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserId(user.userId);
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchClasses = async () => {
      try {
        const res = await fetch(`/api/class/list?userId=${userId}`);
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to load");
        }

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const openEditModal = () => setActiveModal("edit");
  const closeModal = () => setActiveModal(null);

  const handleEdit = () => {
    openEditModal();
  };

   const handleExport = (classId) => {
    alert(`Exporting class ${classId} details...`);
  };

   const handleShare = (classId) => {
    alert(`Share class ${classId} with others...`);
  };

  const handleDelete = (classId) => {
    if (confirm("Are you sure you want to delete this class?")) {
      alert(`Delete class ${classId}`);
    }
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
    <div className="max-w-7xl mx-auto p-4 space-y-2">
      {/* Header Row */}
      <div className="grid grid-cols-6 gap-4">
        {headerTitles.map((title) => (
          <div
            key={title}
            className="bg-primary text-white font-semibold text-center py-2 px-3 rounded-lg shadow-sm"
          >
            {title}
          </div>
        ))}
      </div>

      {/* Data Rows */}
      {classes.map((cls) => (
        <div key={cls.classId} className="grid grid-cols-6 gap-4 items-center">
          <div className="bg-secondary px-3 py-2 rounded-lg text-white font-medium truncate text-center">
            {cls.name}
          </div>
          <div className="bg-secondary px-3 py-2 rounded-lg text-white font-medium truncate text-center">
            {new Date(cls.createdAt).toLocaleDateString()}
          </div>
          <div className="bg-secondary px-3 py-2 rounded-lg text-white font-medium truncate text-center">
            {cls.totalStudents}
          </div>
          <div className="bg-secondary px-3 py-2 rounded-lg text-white font-medium truncate text-center">
            {cls.classCode}
          </div>
          <div className="bg-secondary px-3 py-2 rounded-lg text-white font-medium truncate text-center">
            {cls.schedule || "-"}
          </div>

          {/* Actions Column */}
          <div className="relative">
            {/* Actions Column with Icons */}
            <div className="bg-white px-3 py-2 rounded-lg flex justify-center items-center gap-2">
              <button onClick={openEditModal} className="hover:scale-105 transition-transform">
                <Image src="/Assets/edit.svg" alt="Edit" width={30} height={30}/>
              </button>
              {activeModal === "edit" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
                  <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-3xl w-full">
                    <EditClass
                      onClose={closeModal}
                      classId={cls.classId}
                    />
                  </div>
                </div>
              )}

              <button onClick={() => handleDelete(cls.classId)} className="hover:scale-105 transition-transform">
                <Image src="/Assets/delete.svg" alt="Delete" width={27} height={27} />
              </button>
              <button onClick={() => handleShare(cls.classId)} className="hover:scale-105 transition-transform">
                <Image src="/Assets/share.svg" alt="Share" width={25} height={25} />
              </button>
              <button onClick={() => handleExport(cls.classId)} className="hover:scale-105 transition-transform">
                <Image src="/Assets/download.svg" alt="Download" width={23} height={23} />
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
