//Assignment Creating Component for Teachers

import { handleTeacherUpload } from "./uploading-assignment"

const CreateAssignment = ({title, setTitle,setFile, description, setDescription, dueDate, setDueDate, uploading, setUploading}) => {
  return (
     <div className="space-y-4">
        <h2 className="text-xl font-bold">Create Assignment</h2>
        <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <input
            type="text"
            placeholder="Description"
            className="border p-2 w-full rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex w-full gap-2">
            <input
                type="date"
                className="border p-2 w-1/4 rounded"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button
                className="bg-primary text-white p-2 rounded"
                disabled={uploading}
                onClick={() =>
                handleTeacherUpload({
                    file,
                    title,
                    description,
                    dueDate,
                    setAssignments,
                    setDescription,
                    setUploading,
                    setDueDate,
                    setTitle,
                    setFile,
                    classId,
                    setUploading
                    })
                }
            >
            {uploading ? "Uploading..." : "Create Assignment"}
            </button>
        </div>
        
    </div>
  )
}

export default CreateAssignment