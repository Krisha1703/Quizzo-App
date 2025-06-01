"use client";

import { useEffect, useState } from "react";

export default function ClassList() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

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

  if (loading) return <p>Loading classes...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!classes.length) return <p>No classes found for your account.</p>;

  return (
    <div className="space-y-4">
      {classes.map((cls) => (
        <div key={cls.classId} className="p-4 border rounded shadow">
          <h2 className="text-xl font-bold">{cls.name}</h2>
          <p className="text-sm text-gray-600">
            Code: {cls.classCode} | Teacher: {cls.teacher.name}
          </p>
          <p>{cls.description}</p>
          {cls.schedule && (
            <p className="text-sm mt-2">Schedule: {cls.schedule}</p>
          )}
          <p className="text-xs text-gray-500">
            Created At: {new Date(cls.createdAt).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">
            Students Joined: {cls.totalStudents}
          </p>
        </div>
      ))}
    </div>
  );
}
