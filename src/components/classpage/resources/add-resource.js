// Adding Resources to Class for Teachers

import { handleResourcesUpload } from "./handle-upload"

const AddResources = ({setFile, description, setDescription, uploading, setUploading}) => {
  return (
    <div className="space-y-4">
          <h2 className="text-xl font-bold text-primary">📤 Upload New Resource</h2>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full p-2 border rounded"
          />
          <button
            className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={() =>
              handleResourcesUpload({
                  file,
                  description,
                  setResources,
                  setDescription,
                  setUploading,
                  setFile,
                  setUploading
              })}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Resource"}
          </button>
        </div>
  )
}

export default AddResources