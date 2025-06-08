"use client";

import { useState, useEffect } from "react";

const Assignments = ({ userRole, classId, userId }) => {
  const [assignments, setAssignments] = useState([]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submittingAssignmentId, setSubmittingAssignmentId] = useState(null);
  const [studentFile, setStudentFile] = useState(null);
  const [title, setTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);

 useEffect(() => {
  const fetchAssignments = async () => {
  const res = await fetch(`/api/class/${classId}/assignments?userId=${userId}`);
  const data = await res.json();

  if (!res.ok) return alert("Failed to load assignments");

  if (userRole === "Teacher") {
    const assignmentsWithStats = await Promise.all(
      data.map(async (assignment) => {
        const stats = await fetchSubmissionStatus(assignment.assignmentId);
        return {
          ...assignment,
          submissionStats: stats,
        };
      })
    );
    setAssignments(assignmentsWithStats);
  } else {

    setAssignments(data);
    const hasSubmitted = data.some(
      (assignment) => assignment.submissionStatus !== "Not Submitted"
    );
    setSubmitted(hasSubmitted);
  }
};


  const fetchSubmissionStatus = async (assignmentId) => {
  const statsRes = await fetch(
    `/api/class/${classId}/assignments/${assignmentId}/submit`
  );
  const statsData = await statsRes.json();

  if (statsRes.ok && statsData) {
    const counts = {
      onTime: statsData.onTime || 0,
      late: statsData.late || 0,
      notSubmitted: statsData.notSubmitted || 0,
    };

    return counts;
  }

  return {
    onTime: 0,
    late: 0,
    notSubmitted: 0,
  };
};



  if (userId && classId) {
    fetchAssignments();
  }
}, [classId, userId]);


  const handleTeacherUpload = async () => {
    if (!file || !description || !dueDate) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("dueDate", dueDate);
    formData.append("title", title);

    const res = await fetch(`/api/class/${classId}/assignments`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setAssignments((prev) => [data, ...prev]);
      setDescription("");
      setFile(null);
      setDueDate("");
      setTitle("");
    } else {
      alert(data.error);
    }

    setUploading(false);
  };

  const handleStudentSubmit = async (assignmentId, userId) => {
    if (!studentFile) return;
    setSubmittingAssignmentId(assignmentId);

    const formData = new FormData();
    formData.append("file", studentFile);
    formData.append("userId", userId);
    console.log("Submitting assignment:", assignmentId, "for user:", userId);

    const res = await fetch(`/api/class/${classId}/assignments/${assignmentId}/submit`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert("Submitted!");
      setStudentFile(null);
    } else {
      alert(data.error || "Submission failed");
    }

    setSubmittingAssignmentId(null);
  };

  return (
    <div className="space-y-8">
      {userRole === "Teacher" && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Create Assignment</h2>
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 w-full rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 w-full rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            disabled={uploading}
            onClick={handleTeacherUpload}
          >
            {uploading ? "Uploading..." : "Create Assignment"}
          </button>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold">Assignments</h2>
        {assignments.length === 0 ? (
          <p className="text-gray-500">No assignments yet.</p>
        ) : (
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div
                key={assignment.assignmentId}
                className="p-4 border rounded shadow-sm space-y-2"
              >
                <p className="font-semibold">{assignment.description}</p>
                <p className="text-sm">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                <a
                  href={assignment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Download Assignment
                </a>

                {/* Only for teachers: show submission stats */}
    {userRole === "Teacher" && assignment.submissionStats && (
      <div className="flex gap-2 mt-2">
        <button className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          ✅ On Time: {assignment?.submissionStats?.onTime}
        </button>
        <button className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
          🕒 Late: {assignment?.submissionStats?.late}
        </button>
        <button className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
          ❌ Not Submitted: {assignment?.submissionStats?.notSubmitted}
        </button>
      </div>
    )}

                {userRole === "Student" && (
  <div className="mt-2 space-y-2">
    <p className="text-sm text-gray-600">
      Status:{" "}
      <span
        className={`font-semibold ${
          assignment.submissionStatus === "Not Submitted"
            ? "text-red-500"
            : assignment.submissionStatus === "Late"
            ? "text-yellow-500"
            : "text-green-600"
        }`}
      >
        {assignment.submissionStatus}
      </span>
    </p>

    {assignment.submissionStatus === "Not Submitted" ? (
      <>
        <input
          type="file"
          onChange={(e) => setStudentFile(e.target.files[0])}
        />
        <button
          onClick={() =>
            handleStudentSubmit(assignment.assignmentId, userId)
          }
          className="bg-secondary text-white px-3 py-1 rounded"
          disabled={submittingAssignmentId === assignment.assignmentId}
        >
          {submittingAssignmentId === assignment.assignmentId
            ? "Submitting..."
            : "Submit Assignment"}
        </button>
      </>
    ) : (
      <button
        className="bg-primary text-white px-3 py-1 rounded cursor-default"
        disabled
      >
        Submitted
      </button>
    )}
  </div>
)}

              </div>
            
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;
