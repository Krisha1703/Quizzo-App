//Assignment Grading Page
"use client";

import { useEffect, useState } from "react";
import ModalHeader from "@/components/homepage/modal/modal-header";
import ModalFooter from "@/components/homepage/modal/modal-footer";
import TableHeader from "@/components/class/table-header";
import TableRows from "@/components/class/submission-table-rows";
import {updateStats, handleEditToggle} from "@/components/classpage/assignments/grading-helpers"
import ScoreSummary from "@/components/classpage/assignments/score-summary";

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
      updateStats(updatedSubs, setStats);
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
      <TableHeader headerTitles={headerTitles} columns={6}/>

      {/* Table Rows */}
      <TableRows
        submissions={submissions}
        editing={editing}
        editedScores={editedScores}
        setEditedScores={setEditedScores}
        handleSaveScore={handleSaveScore}
        handleEditToggle={(studentId, currentScore) =>
          handleEditToggle(studentId, currentScore, setEditedScores, setEditing)
        }
        saving={saving}
      />

      {/* Score Summary */}
      <ScoreSummary stats={stats}/>
     
      <ModalFooter />

    </div>
  );
}
