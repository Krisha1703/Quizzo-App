"use client";

import { useEffect, useState } from "react";
import ModalHeader from "@/components/homepage/modal/modal-header";
import ModalFooter from "@/components/homepage/modal/modal-footer";
import Modal from "@/components/quiz/result-modal";

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
        <div className="hidden md:grid grid-cols-6 gap-3 my-2">
          {headerTitles.map((title) => (
            <div
              key={title}
              className="bg-primary text-white font-semibold text-center py-2 px-3 rounded-lg shadow-sm"
            >
              {title}
            </div>
          ))}
        </div>

      <div className="space-y-4">
        {submissions.map((s) => {
          const isEditing = editing[s.studentId] ?? false;

          return (
            <div
              key={s.submissionId}
              className="hidden md:grid grid-cols-6 gap-3 items-center"
            >
              <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">{s.studentId}</div>
              <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">{s.studentName}</div>
              <div className=" text-white px-3 py-2 rounded-lg items-center text-center">
                {s.submittedAt
                  ? s.isLate
                    ? <span className="bg-yellow-500 font-semibold px-4 py-1 rounded-lg">Late</span>
                    : <span className="bg-green-500 font-semibold px-4 py-1 rounded-lg">On Time</span>
                  : <span className="bg-red-500 font-semibold px-4 py-1 rounded-lg">Not Submitted</span>}
              </div>
              <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
                {s.fileUrl ? (
                  <a
                    href={s.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-200"
                  >
                    View File
                  </a>
                ) : (
                  "—"
                )}
              </div>
              <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
                {isEditing ? (
                  <input
                    type="number"
                    min={0}
                    max={100}
                    className="text-black bg-white text-center px-2 py-1 rounded w-1/3"
                    value={editedScores[s.studentId] ?? ""}
                    onChange={(e) =>
                      setEditedScores((prev) => ({
                        ...prev,
                        [s.studentId]: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <span>{typeof s.score === "number" ? s.score : "—"}</span>
                )}
              </div>
              <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
                {(isEditing ? (
                    <button
                      onClick={() => handleSaveScore(s.studentId)}
                      className="bg-green-600  text-white text-sm px-3 py-1 rounded"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditToggle(s.studentId, s.score)}
                      className="bg-primary  text-white text-sm px-4 py-1 rounded"
                    >
                      Edit
                    </button>
                  ))}
              </div>
            </div>
          );
        })}
      </div>

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

      <div className="md:hidden space-y-4">
          {submissions.map((s) => {
          const isEditing = editing[s.studentId] ?? false;

          return (
            <div
              key={s.submissionId}
              className="bg-secondary text-white rounded-lg p-4 space-y-1 relative"
            >
              <div>
                <strong>Student ID:</strong> {s.studentId}
              </div>

              <div>
                <strong>Student Name:</strong> {s.studentName}
              </div>

              <div>
                <strong>Status: </strong> 
                {s.submittedAt
                  ? s.isLate
                    ? <span className="bg-yellow-500 font-semibold px-4 py-1 rounded-lg">Late</span>
                    : <span className="bg-green-500 font-semibold px-4 py-1 rounded-lg">On Time</span>
                  : <span className="bg-red-500 font-semibold px-4 py-1 rounded-lg">Not Submitted</span>
                }
              </div>

            <div className="flex justify-between ">
              <div>
                {s.fileUrl ? (
                  <a
                    href={s.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-200"
                  >
                    View File
                  </a>
                ) : (
                  "—"
                )}
            </div>

            
              <div >
                {isEditing ? (
                  <input
                    type="number"
                    min={0}
                    max={100}
                    className="text-black bg-white text-center px-2 py-1 rounded w-1/3"
                    value={editedScores[s.studentId] ?? ""}
                    onChange={(e) =>
                      setEditedScores((prev) => ({
                        ...prev,
                        [s.studentId]: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <span><strong>Score: </strong>{typeof s.score === "number" ? s.score : "—"}</span>
                )}
              </div>
              <div>
                {(isEditing ? (
                    <button
                      onClick={() => handleSaveScore(s.studentId)}
                      className="bg-green-600  text-white text-sm px-3 py-1 rounded"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditToggle(s.studentId, s.score)}
                      className="bg-primary  text-white text-sm px-4 py-1 rounded"
                    >
                      Edit
                    </button>
                  ))}
              </div>
              </div>
            </div>
            );
        })}

      <ModalFooter />
    </div>

    </div>
  );
}
