// Assignment Grading Helper Functions

export const updateStats = (updatedSubs, setStats) => {
  const scores = updatedSubs
    .filter((s) => typeof s.score === "number" && !isNaN(s.score))
    .map((s) => s.score);

  const min = scores.length > 0 ? Math.min(...scores) : 0;
  const max = scores.length > 0 ? Math.max(...scores) : 0;
  const mean = scores.length > 0
    ? scores.reduce((a, b) => a + b, 0) / scores.length
    : 0;

  setStats({ min, mean, max });
};

export const handleEditToggle = (studentId, currentScore, setEditedScores, setEditing) => {
  setEditing((prev) => ({ ...prev, [studentId]: true }));
  setEditedScores((prev) => ({ ...prev, [studentId]: currentScore ?? "" }));
};
