// Assignment Grading Modal

import AssignmentGradingPage from "@/app/class/[classId]/assignments/[assignmentId]/page"

const GradingModal = ({classId, assignment, setGradingAssignment}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white w-full mx-5 max-h-[90vh] overflow-y-auto rounded-lg shadow-xl relative p-6">
    
        <AssignmentGradingPage
            classId={classId}
            assignmentId={assignment.assignmentId}
            onClose={() => setGradingAssignment(false)}
        />
        </div>
    </div>
  )
}

export default GradingModal
