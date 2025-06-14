// Helper Functions

import { saveAs } from "file-saver";
import { CreateClassSchema } from "../../../schema";
import { z } from "zod";
import { time } from "framer-motion";

// 1. Handling Export for Class and Assignment Details
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

// 2. Handling Class Create and Edit Form
export const handleInputChange = ({e, setFormData}) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

export const handleAddOutcome = ({newOutcome, setFormData, setNewOutcome}) => {
  if (newOutcome.trim()) {
    setFormData((prev) => ({
      ...prev,
      learningOutcomes: [...prev.learningOutcomes, newOutcome.trim()],
    }));
    setNewOutcome("");
  }
};

export const handleAddSchedule = ({newSchedule, setFormData, setNewSchedule}) => {
  if (newSchedule.day && newSchedule.time) {
    setFormData((prev) => ({
      ...prev,
      schedule: [...prev.schedule, `${newSchedule.day}: ${newSchedule.time}`],
    }));
    setNewSchedule({ day: "", time: "" });
  }
};

export const handleSave = async ({e, setErrors, setSuccessMessage, formData, classId}) => {
  e.preventDefault();
  setErrors({});
  setSuccessMessage("");

  const updatedData = {
    name: formData.name,
    description: formData.description,
    learningOutcomes: formData.learningOutcomes.join(", "),
    schedule: formData.schedule.join(", "),
    teacherName: formData.teacherName,
  };

  try {
    CreateClassSchema.parse(updatedData);

    const response = await fetch(`/api/class/${classId}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const result = await response.json();
    if (response.ok) {
      setSuccessMessage("Class updated successfully!");
    } else {
      setErrors(result.error || {});
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      const fieldErrors = {};
      err.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({ general: "Something went wrong!" });
    }
  }
};

export const handleSubmit = async ({e, setErrors, setSuccessMessage, formData, setFormData, setNewOutcome, setNewSchedule}) => {
  e.preventDefault();
  setErrors({});
  setSuccessMessage("");

  const submitData = {
    name: formData.name,
    description: formData.description,
    learningOutcomes: formData.learningOutcomes.join(", "),
    schedule: formData.schedule.join(", "),
    teacherName: formData.teacherName,
  };

  try {
    CreateClassSchema.parse(submitData);

    const response = await fetch("/api/class/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submitData),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccessMessage("Class created successfully!");
      setClassCode(data.classCode || "");
      setFormData({
        name: "",
        description: "",
        learningOutcomes: [],
        schedule: [],
        teacherName: `${firstName} ${lastName}`,
      });
      setNewOutcome("");
      setNewSchedule({ day: "", time: "" });
    } else {
      setErrors(data.error || {});
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      const fieldErrors = {};
      err.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({ general: "Something went wrong!" });
    }
  }
};
