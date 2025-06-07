"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

const Resources = ({ userRole, existingResources = [] }) => {
  const { classId } = useParams();
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [resources, setResources] = useState(existingResources);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch(`/api/class/${classId}/resources`);
        const data = await res.json();
        if (res.ok) {
          setResources(data);
        } else {
          console.error("Failed to fetch:", data.error);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    if (!existingResources.length) {
      fetchResources();
    }
  }, [classId, existingResources.length]);

  const handleUpload = async () => {
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

  const headerTitles = ["Description", "Uploaded At", "Download"];

  const filteredResources = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return resources.filter((res) =>
      res.description.toLowerCase().includes(q)
    );
  }, [searchQuery, resources]);

  return (
    <div className="space-y-6">
      {userRole === "Teacher" && (
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
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Resource"}
          </button>
        </div>
      )}

      <div className="mt-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold text-primary">📚 Class Resources</h2>
          <input
            type="text"
            placeholder="Search by description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary bg-primary text-white placeholder-white"
          />
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-3 gap-4 mb-2">
          {headerTitles.map((title) => (
            <div
              key={title}
              className="bg-primary text-white font-semibold text-center py-2 px-3 rounded-lg shadow-sm"
            >
              {title}
            </div>
          ))}
        </div>

        {/* Table Rows */}
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="hidden md:grid grid-cols-3 gap-4 items-center"
          >
            <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
              {res.description}
            </div>
            <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
              {new Date(res.createdAt).toLocaleString()}
            </div>
            <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center">
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                download
              >
                Download
              </a>
            </div>
          </div>
        ))}

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-lg shadow p-4 space-y-1 border border-gray-200"
            >
              <p><span className="font-semibold">Description:</span> {res.description}</p>
              <p><span className="font-semibold">Uploaded:</span> {new Date(res.createdAt).toLocaleString()}</p>
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline font-semibold"
                download
              >
                Download
              </a>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredResources.length === 0 && (
          <p className="text-center text-gray-500">No matching resources found.</p>
        )}
      </div>
    </div>
  );
};

export default Resources;
