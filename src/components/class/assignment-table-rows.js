// components/classpage/assignment-table-rows.js
import ActionMenu from "./action-menus";
import { EllipsisVertical } from "lucide-react";
import StudentSubmission from "../classpage/assignments/student-submission";
import { handleExport } from "./helper-functions";

const AssignmentTableRows = ({
  assignments,
  filteredAssignments,
  userRole,
  userId,
  actionMenuOpen,
  setGradingAssignment,
  openModal,
  toggleMobileMenu,
  setStudentFile,
  setSubmittingAssignmentId,
  router
}) => {
  return (
    <>
      {/* Desktop View */}
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

          <div className="text-white px-3 py-2 rounded-lg text-center w-full">
            {userRole === "Teacher" && assignment.submissionStats && (
              <div className="flex gap-2">
                <button className="bg-green-500 px-3 py-2 rounded-md w-1/3 text-md font-medium">
                  {assignment?.submissionStats?.onTime}
                </button>
                <button className="bg-yellow-500 rounded-md w-1/3 text-md font-medium">
                  {assignment?.submissionStats?.late}
                </button>
                <button className="bg-red-500 rounded-md w-1/3 text-md font-medium">
                  {assignment?.submissionStats?.notSubmitted}
                </button>
              </div>
            )}
          </div>

          <ActionMenu
            isOpen={actionMenuOpen}
            actions={[
              {
                name: "edit",
                icon: "/Assets/edit.svg",
                alt: "Edit",
                width: 30,
                height: 30,
                onClick: () => openModal("edit", assignment.assignmentId),
              },
              {
                name: "delete",
                icon: "/Assets/delete.svg",
                alt: "Delete",
                width: 30,
                height: 30,
                onClick: () => openModal("delete", assignment.assignmentId),
              },
              {
                name: "grade",
                icon: "/Assets/grade.svg",
                alt: "Grade",
                width: 30,
                height: 30,
                onClick: () => setGradingAssignment(assignment),
              },
              {
                name: "export",
                icon: "/Assets/download.svg",
                alt: "Export",
                width: 25,
                height: 25,
                onClick: () => handleExport(null, assignment.assignmentId, [], assignments),
              },
            ]}
          />
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
              </div>
            )}

            {userRole === "Student" && (
              <StudentSubmission
                assignment={assignment}
                setStudentFile={setStudentFile}
                userId={userId}
                setSubmittingAssignmentId={setSubmittingAssignmentId}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AssignmentTableRows;
