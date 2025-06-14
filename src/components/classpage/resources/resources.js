//Resources Component

"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import AddResources from "./add-resource";
import SearchResources from "@/components/class/search";
import ResourceTableRow from "./resource-table-rows";
import TableHeader from "@/components/class/table-header";

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

  

  const headerTitles = ["Description", "Uploaded At", "Download"];

  const filteredResources = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return resources.filter((res) =>
      res.description.toLowerCase().includes(q)
    );
  }, [searchQuery, resources]);

  return (
    <div className="space-y-6 p-2 md:w-5/6 w-full mx-auto">
      {userRole === "Teacher" && (
        <AddResources 
          setFile={setFile}
          description={description}
          setDescription={setDescription}
          uploading={uploading}
          setUploading={setUploading}
        />
      )}

      <div className="mt-6 space-y-4">
        <SearchResources searchQuery={searchQuery} setSearchQuery={setSearchQuery} heading={"Resources"}/>

        {/* Table Header */}
        <TableHeader headerTitles={headerTitles} columns={3} />

        {/* Table Rows */}
        <ResourceTableRow filteredResources={filteredResources}/>

        {/* No results */}
        {filteredResources.length === 0 && (
          <p className="text-center text-gray-500">No matching resources found.</p>
        )}
      </div>

    </div>
  );
};

export default Resources;
