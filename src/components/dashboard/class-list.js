"use client";

import { useEffect, useState } from "react";

export default function ClassList() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch("/api/class/list");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to load");

        setClasses(data.classes);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchClasses();
  }, []);

  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!classes.length) return <p>Loading or no classes found.</p>;

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
