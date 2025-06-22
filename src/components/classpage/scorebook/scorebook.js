// File: /components/classpage/scorebook/scorebook.js
"use client";

import { useEffect, useState, useMemo } from "react";
import SearchAssignments from "@/components/class/search";
import TableHeader from "@/components/class/table-header";
import ScoreBookTableRows from "./scorebook-table-rows";

const ScoreBook = ({ userId, userRole, classId }) => {
  const [assignments, setAssignments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!userId || !classId) return;

    const fetchScorebookData = async () => {
      try {
        const res = await fetch(`/api/class/${classId}/scorebook?userId=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch scorebook data");
        const data = await res.json();
        setAssignments(data);
      } catch (error) {
        console.error(error);
        alert("Could not load assignments");
      }
    };

    fetchScorebookData();
  }, [userId, classId]);

  const headerTitles =
    userRole === "Teacher"
      ? ["Assignment", "Submissions", "Min", "Mean", "Max"]
      : ["Assignment", "Submission", "Score", "Min", "Mean", "Max"];

  const filteredAssignments = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return assignments.filter((assignment) =>
      assignment.title.toLowerCase().includes(q)
    );
  }, [assignments, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4">
      <SearchAssignments
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        heading="Assignments"
      />

      <TableHeader headerTitles={headerTitles} columns={headerTitles.length} />

      <ScoreBookTableRows
        assignments={filteredAssignments}
        userRole={userRole}
        userId={userId}
      />
    </div>
  );
};

export default ScoreBook;
