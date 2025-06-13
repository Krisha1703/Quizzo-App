// Submission Table Rows Component

const TableRows = ({ submissions = [], editing, editedScores, setEditedScores, handleSaveScore, handleEditToggle, saving }) => {
  return (
    <div className="space-y-4">
      {submissions.map((s) => {
        const isEditing = editing[s.studentId] ?? false;
        const scoreInput = (
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
        );

        const statusLabel = s.submittedAt ? (
          s.isLate ? (
            <span className="bg-yellow-500 font-semibold px-4 py-1 rounded-lg">Late</span>
          ) : (
            <span className="bg-green-500 font-semibold px-4 py-1 rounded-lg">On Time</span>
          )
        ) : (
          <span className="bg-red-500 font-semibold px-4 py-1 rounded-lg">Not Submitted</span>
        );

        const fileLink = s.fileUrl ? (
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
        );

        const actionButton = isEditing ? (
          <button
            onClick={() => handleSaveScore(s.studentId)}
            className="bg-green-600 text-white text-sm px-3 py-1 rounded"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        ) : (
          <button
            onClick={() => handleEditToggle(s.studentId, s.score)}
            className="bg-primary text-white text-sm px-4 py-1 rounded"
          >
            Edit
          </button>
        );

        return (
          <div key={s.submissionId}>
            {/* 💻 Desktop layout */}
            <div className="hidden md:grid grid-cols-6 gap-3 items-center">
              <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">{s.studentId}</div>
              <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">{s.studentName}</div>
              <div className="text-white px-3 py-2 rounded-lg text-center">{statusLabel}</div>
              <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">{fileLink}</div>
              <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
                {isEditing ? scoreInput : <span>{typeof s.score === "number" ? s.score : "—"}</span>}
              </div>
              <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">{actionButton}</div>
            </div>

            {/* 📱 Mobile layout */}
            <div className="md:hidden bg-secondary text-white rounded-lg p-4 space-y-1">
              <div><strong>Student ID:</strong> {s.studentId}</div>
              <div><strong>Student Name:</strong> {s.studentName}</div>
              <div><strong>Status:</strong> {statusLabel}</div>
              <div><strong>File:</strong> {fileLink}</div>
              <div>
                {isEditing ? (
                  scoreInput
                ) : (
                  <span><strong>Score: </strong>{typeof s.score === "number" ? s.score : "—"}</span>
                )}
              </div>
              <div>{actionButton}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
