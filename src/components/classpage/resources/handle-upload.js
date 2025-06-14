// Handle Resource Files Uploading for Teachers

export const handleResourcesUpload = async ({file, description, setDescription, setUploading, setFile, classId, setResources}) => {
    if (!file || !description) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);

    const res = await fetch(`/api/class/${classId}/resources`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setResources((prev) => [...prev, data]);
      setFile(null);
      setDescription("");
    } else {
      alert(data.error || "Upload failed");
    }
    setUploading(false);
};