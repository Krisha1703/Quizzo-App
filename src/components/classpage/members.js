"use client";

import React, { useState, useMemo } from "react";

const Members = ({ teacher, students }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const headerTitles = ["Member Name", "Role", "Email", "User ID"];


  const allMembers = useMemo(() => [
    { ...teacher },
    ...students,
  ], [teacher, students]);

  // Filtered results
  const filteredMembers = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return allMembers.filter(
      (member) =>
        member.fullName?.toLowerCase().includes(q) ||
        member.email?.toLowerCase().includes(q) ||
        member.customId?.toLowerCase().includes(q)
    );
  }, [searchQuery, allMembers]);

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-primary">👥 Class Members</h2>
        <input
          type="text"
          placeholder="Search members by name, email, or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary bg-primary text-white placeholder-white"
        />
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-4 gap-4 mb-2">
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
      {filteredMembers.map((member, index) => (
        <div key={index} className="hidden md:grid grid-cols-4 gap-4 items-center">
          <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
            {member.fullName}
          </div>
          <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
            {member.role}
          </div>
          <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
            {member.email}
          </div>
          <div className="bg-secondary text-white px-3 py-2 rounded-lg text-center truncate">
            {member.customId}
          </div>
        </div>
      ))}

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {filteredMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 space-y-1 border border-gray-200">
            <p><span className="font-semibold">Name:</span> {member.fullName}</p>
            <p><span className="font-semibold">Role:</span> {member.role}</p>
            <p><span className="font-semibold">Email:</span> {member.email}</p>
            <p><span className="font-semibold">User ID:</span> {member.customId}</p>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredMembers.length === 0 && (
        <p className="text-center text-gray-500">No members found.</p>
      )}
    </div>
  );
};

export default Members;
