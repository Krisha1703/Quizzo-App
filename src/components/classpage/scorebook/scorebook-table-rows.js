// File: /components/classpage/scorebook/scorebook-table-rows.js
"use client";

const ScoreBookTableRows = ({ assignments = [], userRole, userId }) => {
  const formatScore = (val) =>
    typeof val === "number" ? val.toFixed(1) : "—";

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => {
        const {
          assignmentId,
          title,
          submittedAt,
          score,
          minScore,
          meanScore,
          maxScore,
          submissionStats, // new
        } = assignment;

        return (
          <div key={assignmentId}>
            {/* Desktop layout */}
            <div className={`hidden md:grid ${userRole == "Teacher" ? "grid-cols-5" : "grid-cols-6"}  gap-4 items-center text-center`}>
              <div className="bg-secondary text-white px-3 py-2 rounded-lg truncate">
                {title}
              </div>

              {userRole === "Teacher" ? (
                <>
                  <div className="text-white px-3 py-2 rounded-lg text-center w-full">
                    {submissionStats && (
                      <div className="flex gap-2">
                        <button className="bg-green-500 px-3 py-2 rounded-md w-1/3 text-md font-medium">
                          {submissionStats.onTime}
                        </button>
                        <button className="bg-yellow-500 px-3 py-2 rounded-md w-1/3 text-md font-medium">
                          {submissionStats.late}
                        </button>
                        <button className="bg-red-500 px-3 py-2 rounded-md w-1/3 text-md font-medium">
                          {submissionStats.notSubmitted}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="bg-secondary text-white px-3 py-2 rounded-lg">
                    {formatScore(minScore)}
                  </div>
                  <div className="bg-secondary text-white px-3 py-2 rounded-lg">
                    {formatScore(meanScore)}
                  </div>
                  <div className="bg-secondary text-white px-3 py-2 rounded-lg">
                    {formatScore(maxScore)}
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-secondary text-white px-3 py-2 rounded-lg">
                    {submittedAt ? "Submitted" : "Not Submitted"}
                  </div>
                  <div className="bg-secondary text-white px-3 py-2 rounded-lg">
                    {typeof score === "number" ? score : "—"}
                  </div>
                  <div className="bg-secondary text-white px-3 py-2 rounded-lg">
                    {formatScore(minScore)}
                  </div>
                  <div className="bg-secondary text-white px-3 py-2 rounded-lg">
                    {formatScore(meanScore)}
                  </div>
                  <div className="bg-secondary text-white px-3 py-2 rounded-lg">
                    {formatScore(maxScore)}
                  </div>
                </>
              )}
            </div>

            {/* Mobile layout */}
            <div className="md:hidden bg-secondary text-white rounded-lg p-4 space-y-2">
              <div>
                <strong>Assignment:</strong> {title}
              </div>

              {userRole === "Teacher" ? (
                <>
                  <div className="flex gap-2">
                    <button className="bg-green-500 px-3 py-2 rounded-md w-1/3 text-md font-medium">
                      {submissionStats?.onTime ?? 0}
                    </button>
                    <button className="bg-yellow-500 px-3 py-2 rounded-md w-1/3 text-md font-medium">
                      {submissionStats?.late ?? 0}
                    </button>
                    <button className="bg-red-500 px-3 py-2 rounded-md w-1/3 text-md font-medium">
                      {submissionStats?.notSubmitted ?? 0}
                    </button>
                  </div>
                  <div>
                    <strong>Min:</strong> {formatScore(minScore)}
                  </div>
                  <div>
                    <strong>Mean:</strong> {formatScore(meanScore)}
                  </div>
                  <div>
                    <strong>Max:</strong> {formatScore(maxScore)}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <strong>Submission Status:</strong>{" "}
                    {submittedAt ? "Submitted" : "Not Submitted"}
                  </div>
                  <div>
                    <strong>Score:</strong> {typeof score === "number" ? score : "—"}
                  </div>
                  <div>
                    <strong>Min:</strong> {formatScore(minScore)}
                  </div>
                  <div>
                    <strong>Mean:</strong> {formatScore(meanScore)}
                  </div>
                  <div>
                    <strong>Max:</strong> {formatScore(maxScore)}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScoreBookTableRows;
