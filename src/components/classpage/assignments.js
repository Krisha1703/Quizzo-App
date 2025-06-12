"use client";

import { useState, useEffect, useMemo } from "react";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AssignmentGradingPage from "@/app/class/[classId]/assignments/[assignmentId]/page";

const Assignments = ({ userRole, classId, userId}) => {
  const router = useRouter();
  const [assignments, setAssignments] = useState([]);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [mobileMenuOpenId, setMobileMenuOpenId] = useState(null);
  const [submittingAssignmentId, setSubmittingAssignmentId] = useState(null);
  const [studentFile, setStudentFile] = useState(null);
  const [title, setTitle] = useState("");
  const [submitted, setSubmitted] = useState(false);
   const [actionMenuOpen, setActionMenuOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const [gradingAssignment, setGradingAssignment] = useState(null);

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
    setActionMenuOpen(true);
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

    const toggleMobileMenu = (assignmentId) => {
    setMobileMenuOpenId((prev) => (prev === assignmentId ? null : assignmentId));
  };

    const headerTitles = userRole === "Teacher"
  ? ["Assignment", "Created At", "Due At", "Submissions", "Actions" ]
  : ["Assignment", "Description", "Created At", "Due At", "Submissions" ];

   const filteredAssignments = useMemo(() => {
      const q = searchQuery.toLowerCase();
      return assignments.filter((assignment) =>
        assignment.title.toLowerCase().includes(q)
      );
    }, [searchQuery, assignments]);

  return (
    <div className="space-y-8 p-2 md:w-5/6 w-full mx-auto">
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
          <div className="flex w-full gap-2">
          <input
            type="date"
            className="border p-2 w-1/4 rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button
            className="bg-primary text-white p-2 rounded"
            disabled={uploading}
            onClick={handleTeacherUpload}
          >
            {uploading ? "Uploading..." : "Create Assignment"}
          </button>
          </div>
        </div>
      )}

      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold">Assignments</h2>
          <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary bg-primary text-white placeholder-white"
            />
        </div>
        {assignments.length === 0 ? (
          <p className="text-gray-500">No assignments yet.</p>
        ) : (
          <div className="space-y-4">
            {/* Table Header */}
        <div className="hidden md:grid grid-cols-5 gap-4 my-2">
          {headerTitles.map((title) => (
            <div
              key={title}
              className="bg-primary text-white font-semibold text-center py-2 px-3 rounded-lg shadow-sm"
            >
              {title}
            </div>
          ))}
        </div>

        {/* Table Rows */}
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.assignmentId}
            className="hidden md:grid grid-cols-5 gap-4 items-center"
          >
            <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
              {assignment.title}
            </div>
            {!actionMenuOpen && (
              <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
              {assignment.description}
              </div>
             )}
             
            <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
              {new Date(assignment.createdAt).toLocaleString()}
            </div>
            <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
              {new Date(assignment.dueDate).toLocaleString()}
            </div>

            <div className=" text-white px-3 py-2 rounded-lg text-center w-full">
              {/* Only for teachers: show submission stats */}
              {userRole === "Teacher" && assignment.submissionStats && (
                <div className="flex gap-2 ">
                  <button className="bg-green-500 px-3 py-2 rounded-md w-1/3 text-md font-medium">
                    {assignment?.submissionStats?.onTime}
                  </button>
                  <button className="bg-yellow-500  rounded-md w-1/3 text-md font-medium">
                    {assignment?.submissionStats?.late}
                  </button>
                  <button className="bg-red-500  rounded-md w-1/3 text-md font-medium">
                    {assignment?.submissionStats?.notSubmitted}
                  </button>
                </div>
              )}

            </div>

            <div className="bg-white px-3 py-2 rounded-lg flex justify-center items-center gap-2">
                {actionMenuOpen && (
                  <div className="bg-white px-3 py-2 rounded-lg flex justify-center items-center gap-2">
                    {[
                      { name: "edit", icon: "/Assets/edit.svg", alt: "Edit", width: 35, height: 35 },
                      { name: "delete", icon: "/Assets/delete.svg", alt: "Delete", width: 30, height: 30 },
                      { name: "grade", icon: "/Assets/grade.svg", alt: "Grade", width: 30, height: 30 },
                      { name: "export", icon: "/Assets/download.svg", alt: "Export", width: 25, height: 25 },
                    ].map((action) => (
                      <button
                        key={action.name}
                        onClick={() => {
                          if (action.name === "export") handleExport(cls.classId);
                          else if (action.name === "grade") setGradingAssignment(true);
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

               {/* Grading Modal */}
              {gradingAssignment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white w-full mx-5 max-h-[90vh] overflow-y-auto rounded-lg shadow-xl relative p-6">
                
                    <AssignmentGradingPage
                      classId={classId}
                      assignmentId={assignment.assignmentId}
                      onClose={() => setGradingAssignment(false)}
                    />
                  </div>
                </div>
              )}
          </div>
        ))}

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment.assignmentId}
              className="bg-secondary text-white rounded-lg p-4 space-y-1 relative"
            >
              <div onClick={() => router.push(`/assignment/${assignment.assignmentId}`)}>
                <strong>Title:</strong> {assignment.title}
              </div>
          
              <div>
                <strong>Description:</strong> {assignment.description}
              </div>
              
              <div>
                <strong>Created:</strong> {new Date(assignment.createdAt).toLocaleString()}
              </div>
              <div>
                <strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleString()}
              </div>

              {userRole === "Teacher" && assignment.submissionStats && (
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-green-600 p-2 mt-2 rounded-md text-center text-sm font-medium flex flex-col items-center">
                    <span>{assignment?.submissionStats?.onTime}</span>
                  </div>
                  <div className="bg-yellow-600 p-2 mt-2 rounded-md text-center text-sm font-medium flex flex-col items-center">
                    <span>{assignment?.submissionStats?.late}</span>
                  </div>
                  <div className="bg-red-600 p-2 mt-2 rounded-md text-center text-sm font-medium flex flex-col items-center">
                    <span>{assignment?.submissionStats?.notSubmitted}</span>
                  </div>
                </div>
              )}

              {userRole === "Teacher" && ( 
                <div className="relative mt-3 flex justify-end">
                  <button onClick={() => toggleMobileMenu(assignment.assignmentId)}>
                    <EllipsisVertical className="w-6 h-6 text-white" />
                  </button>

                  {mobileMenuOpenId === assignment.assignmentId && (
                    <div className="absolute right-0 mt-2 bg-white rounded shadow-lg p-2 flex gap-3 z-10">
                      {[
                        { name: "edit", icon: "/Assets/edit.svg", alt: "Edit", width: 30, height: 30 },
                        { name: "delete", icon: "/Assets/delete.svg", alt: "Delete", width: 27, height: 27 },
                        { name: "grade", icon: "/Assets/grade.svg", alt: "Grade", width: 30, height: 30 },
                        { name: "export", icon: "/Assets/download.svg", alt: "Export", width: 23, height: 23 },
                      ].map((action) => (
                        <button
                          key={action.name}
                          onClick={() => {
                            if (action.name === "export") handleExport(assignment.assignmentId);
                            else if (action.name === "grade") setGradingAssignment(true);
                            else openModal(action.name, assignment.assignmentId);
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

               {/* Grading Modal */}
              {gradingAssignment && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white w-full mx-5 max-h-[90vh] overflow-y-auto rounded-lg shadow-xl relative p-6 ">
                
                    <AssignmentGradingPage
                      classId={classId}
                      assignmentId={assignment.assignmentId}
                      onClose={() => setGradingAssignment(false)}
                    />
                  </div>
                </div>
              )}

              
              {userRole === "Student" && (
                <div className="mt-2 space-y-2">
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
        </div>
        )}
        </div>  
        
              
    </div>
  );
};

export default Assignments;
