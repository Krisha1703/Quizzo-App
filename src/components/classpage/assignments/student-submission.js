// Handle Student Assignment Submission
import { handleStudentSubmit } from "./uploading-assignment";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const StudentSubmission = ({ assignment, setStudentFile, userId, submittingAssignmentId}) => {

    const renderStatusIcon = () => {
        switch (assignment.submissionStatus) {
        case "On Time":
            return <CheckCircle className="text-green-500 w-5 h-5" />;
        case "Late":
            return <AlertTriangle className="text-yellow-500 w-5 h-5" />;
        default:
            return <XCircle className="text-red-500 w-5 h-5" />;
        }
    };

  return (
    <div className="space-y-2">
      {assignment.submissionStatus === "Not Submitted" ? (
        <div className="flex items-center gap-x-2 flex-nowrap">
          <input
            type="file"
            onChange={(e) => setStudentFile(e.target.files[0])}
            className="appearance-none w-[8vw]"
          />
          <button
            onClick={() =>
              handleStudentSubmit(assignment.assignmentId, userId)
            }
            className="bg-secondary text-white px-3 py-1 rounded whitespace-nowrap"
            disabled={submittingAssignmentId === assignment.assignmentId}
          >
            {submittingAssignmentId === assignment.assignmentId
              ? "Submitting..."
              : "Submit Assignment"}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-x-2 flex-nowrap">
            
            <span className="bg-primary text-white rounded px-3 py-1 text-nowrap flex justify-center items-center gap-1">Submitted
                {renderStatusIcon()}
            </span>
          
          <a
            href={assignment.submissionFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-white rounded px-3 py-1 hover:bg-primary whitespace-nowrap"
          >
            View Submission
          </a>
          
        </div>
      )}
    </div>
  );
};

export default StudentSubmission;
