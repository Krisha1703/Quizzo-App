//Handle Export

import { saveAs } from "file-saver";

export const handleExport = (classId, assignmentId, classes = [], assignments = []) => {
  if (!classId && !assignmentId) return;

  let exportData = {};
  let fileName = "export";

  if (classId) {
    const cls = classes.find(c => c.classId === classId);
    if (!cls) return;

    exportData = {
      Name: cls.name,
      CreatedAt: new Date(cls.createdAt).toLocaleString(),
      Students: cls.totalStudents,
      ClassCode: cls.classCode,
      Schedule: cls.schedule || "-",
      Description: cls.description || "-",
      LearningOutcomes: Array.isArray(cls.learningOutcomes)
        ? cls.learningOutcomes.join(", ")
        : typeof cls.learningOutcomes === "string"
        ? cls.learningOutcomes
        : "-"
    };

    fileName = `${cls.name}_class_details.csv`;
  } 
  
  if (assignmentId) {
    const asg = assignments.find(a => a.assignmentId === assignmentId);
    if (!asg) return;

    exportData = {
      Title: asg.title,
      Description: asg.description || "-",
      CreatedAt: new Date(asg.createdAt).toLocaleString(),
      DueDate: new Date(asg.dueDate).toLocaleString(),
      OnTimeSubmissions: asg.submissionStats?.onTime ?? "-",
      LateSubmissions: asg.submissionStats?.late ?? "-",
      NotSubmitted: asg.submissionStats?.notSubmitted ?? "-"
    };

    fileName = `${asg.title}_assignment_details.csv`;
  }

  const csv = Object.entries(exportData)
    .map(([key, val]) => `${key}, "${val}"`)
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  saveAs(blob, fileName);
};
