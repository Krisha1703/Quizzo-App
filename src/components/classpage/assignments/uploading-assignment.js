//Assingment Submitting and Uploading Helper Functions

export const handleTeacherUpload = async ({file, description, dueDate, setAssignments, setDescription, setUploading, setDueDate, setTitle, setFile, classId, title}) => {
    if (!file || !description || !dueDate) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("dueDate", dueDate);
    formData.append("title", title);

    const res = await fetch(`/api/class/${classId}/assignments`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setAssignments((prev) => [data, ...prev]);
      setDescription("");
      setFile(null);
      setDueDate("");
      setTitle("");
    } else {
      alert(data.error);
    }

    setUploading(false);
  };


 export const handleStudentSubmit = async (assignmentId, userId, studentFile,setSubmittingAssignmentId, setStudentFile) => {
      if (!studentFile) return;
      setSubmittingAssignmentId(assignmentId);
  
      const formData = new FormData();
      formData.append("file", studentFile);
      formData.append("userId", userId);
      console.log("Submitting assignment:", assignmentId, "for user:", userId);
  
      const res = await fetch(`/api/class/${classId}/assignments/${assignmentId}/submit`, {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("Submitted!");
        setStudentFile(null);
      } else {
        alert(data.error || "Submission failed");
      }
  
      setSubmittingAssignmentId(null);
    };


 export const fetchSubmissionStatus = async (assignmentId) => {
   const statsRes = await fetch(
     `/api/class/${classId}/assignments/${assignmentId}/submit`
   );
   const statsData = await statsRes.json();
 
   if (statsRes.ok && statsData) {
     const counts = {
       onTime: statsData.onTime || 0,
       late: statsData.late || 0,
       notSubmitted: statsData.notSubmitted || 0,
     };
 
     return counts;
   }
 
   return {
     onTime: 0,
     late: 0,
     notSubmitted: 0,
   };
 };
