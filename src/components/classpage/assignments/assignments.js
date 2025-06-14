//Assignments Component

"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import CreateAssignment from "./create-assignment";
import TableHeader from "../../class/table-header";
import SearchAssignments from "../../class/search";
import GradingModal from "./grading-modal";
import AssignmentTableRows from "./assignment-table-rows";
import { fetchSubmissionStatus } from "./uploading-assignment";

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
  const [modalType, setModalType] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);


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

    if (userId && classId) {
      fetchAssignments();
    }
  }, [classId, userId]);


  const openModal = (type, id) => {
    setModalType(type);
    setSelectedAssignmentId(id);
    setModalOpen(true);
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
        <CreateAssignment
          title={title}
          description={description}
          setDescription={setDescription}
          setFile={setFile}
          dueDate={dueDate}
          setDueDate={setDueDate}
          setUploading={setUploading}
          uploading={uploading}
        />
      )}

      <>
        <SearchAssignments searchQuery={searchQuery} setSearchQuery={setSearchQuery} heading={"Assignments"}/>

        {assignments.length === 0 ? (
          <p className="text-gray-500">No assignments yet.</p>
        ) : (
          <>
            <TableHeader headerTitles={headerTitles} columns={5} />

            <AssignmentTableRows
              assignments={assignments}
              filteredAssignments={filteredAssignments}
              userRole={userRole}
              userId={userId}
              actionMenuOpen={actionMenuOpen}
              setGradingAssignment={setGradingAssignment}
              openModal={openModal}
              gradingAssignment={gradingAssignment}
              toggleMobileMenu={toggleMobileMenu}
              setStudentFile={setStudentFile}
              setSubmittingAssignmentId={setSubmittingAssignmentId}
              router={router}
            />

          </>

        )}
      </>  

        {modalOpen && modalType === "edit" && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">Edit Assignment</h2>
              <button onClick={() => setModalOpen(false)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Close</button>
            </div>
          </div>
        )}

        {modalOpen && modalType === "delete" && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-full max-w-md">
              <h2 className="text-lg font-semibold">Are you sure you want to delete this assignment?</h2>
              <div className="mt-4 flex justify-end gap-4">
                <button onClick={() => setModalOpen(false)} className="bg-gray-400 px-4 py-2 rounded text-white">Cancel</button>
                <button
                  onClick={() => {
                    setModalOpen(false);
                  }}
                  className="bg-red-500 px-4 py-2 rounded text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {gradingAssignment && (
          <GradingModal
            classId={classId}
            assignment={gradingAssignment}
            setGradingAssignment={setGradingAssignment}
          />
        )}
              
    </div>
  );
};

export default Assignments;

