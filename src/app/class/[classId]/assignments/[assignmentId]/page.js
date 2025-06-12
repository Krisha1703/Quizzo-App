//Assignment Grading Page
"use client";

import { useEffect, useState } from "react";
import ModalHeader from "@/components/homepage/modal/modal-header";
import ModalFooter from "@/components/homepage/modal/modal-footer";
import TableHeader from "@/components/class/table-header";
import TableRows from "@/components/class/table-rows";

export default function AssignmentGradingPage({ classId, assignmentId, onClose }) {

  const [submissions, setSubmissions] = useState([]);
  const [editedScores, setEditedScores] = useState({});
  const [editing, setEditing] = useState({});
  const [stats, setStats] = useState({ min: 0, mean: 0, max: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/class/${classId}/assignments/${assignmentId}`);
        const data = await res.json();
        setSubmissions(data.submissions);
        setStats(data.stats);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [assignmentId]);

  const updateStats = (updatedSubs) => {
    const scores = updatedSubs
      .filter((s) => typeof s.score === "number" && !isNaN(s.score))
      .map((s) => s.score);

    const min = scores.length > 0 ? Math.min(...scores) : 0;
    const max = scores.length > 0 ? Math.max(...scores) : 0;
    const mean = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    setStats({ min, mean, max });
  };

  const handleEditToggle = (studentId, currentScore) => {
    setEditing((prev) => ({ ...prev, [studentId]: true }));
    setEditedScores((prev) => ({ ...prev, [studentId]: currentScore ?? "" }));
  };

  const handleSaveScore = async (studentId) => {
    const newScore = Number(editedScores[studentId]);
    setSaving(true);

    const res = await fetch(`/api/class/${classId}/assignments/${assignmentId}`, {
      method: "POST",
      body: JSON.stringify({ studentId, score: newScore }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const updatedSubs = submissions.map((s) =>
        s.studentId === studentId ? { ...s, score: newScore } : s
      );
      setSubmissions(updatedSubs);
      updateStats(updatedSubs);
      setEditing((prev) => ({ ...prev, [studentId]: false }));
    }

    setSaving(false);
  };

  const headerTitles = ["Student ID", "Student Name", "Submission Status", "File", "Score", "Action" ];

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading submissions...</p>;

  return (
    <div className="px-4 md:px-8">
      <ModalHeader onClose={onClose}/>
      <h2 className="md:text-2xl text-lg font-semibold mb-6 mt-20 text-primary">Assignment Submissions</h2>

       {/* Table Header */}
      <TableHeader headerTitles={headerTitles}/>

      {/* Table Rows */}
      <TableRows
        submissions={submissions}
        editing={editing}
        editedScores={editedScores}
        setEditedScores={setEditedScores}
        handleSaveScore={handleSaveScore}
        handleEditToggle={handleEditToggle}
        saving={saving}
      />

      {/* Score Summary */}
      <div className="mt-10 mb-10 bg-secondary text-white p-4 rounded-md shadow-md md:w-1/4">
        <h3 className="text-lg font-semibold mb-3">Score Summary</h3>
        <div className="flex gap-6">
          <p>
            <strong>Min:</strong> {stats.min}
          </p>
          <p>
            <strong>Mean:</strong> {stats.mean.toFixed(2)}
          </p>
          <p>
            <strong>Max:</strong> {stats.max}
          </p>
        </div>
      </div>

     
      <ModalFooter />

    </div>
  );
}
