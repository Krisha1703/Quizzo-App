// Display List of Classes Available to Teachers or Students

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserData from "../../../hooks/use-user-data";
import TableHeader from "./table-header";
import ClassTableRows from "./class-table-rows";


export default function ClassList() {
  const {userId, userRole} = useUserData();

  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [mobileMenuOpenId, setMobileMenuOpenId] = useState(null);
  const [copied, setCopied] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const router = useRouter();


 useEffect(() => {
    if (userRole === "Teacher") {
      setActionMenuOpen(true);
    } else {
      setActionMenuOpen(false);
    }
  }, [userRole]);
  
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
      {userRole === "Teacher" && (
        <TableHeader headerTitles={headerTitles} columns={6}/>
      )}

      {userRole === "Student" && (
        <TableHeader headerTitles={headerTitles} columns={5}/>
      )}

      {/* Table Rows */}
      <ClassTableRows
        classes={classes}
        userRole={userRole}
        actionMenuOpen={actionMenuOpen}
        activeModal={activeModal}
        selectedClassId={selectedClassId}
        mobileMenuOpenId={mobileMenuOpenId}
        copied={copied}
        openModal={openModal}
        closeModal={closeModal}
        handleDelete={handleDelete}
        handleCopyCode={handleCopyCode}
        toggleMobileMenu={toggleMobileMenu}
      />
     
    </div>
  );
}
