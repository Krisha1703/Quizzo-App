//Handle Student Assingment Submission

import { handleStudentSubmit } from "./uploading-assignment"

const StudentSubmission = ({assignment, setStudentFile, userId, submittingAssignmentId}) => {
  return (
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
  )
}

export default StudentSubmission