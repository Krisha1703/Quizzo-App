// Members Component

import { useState, useMemo } from "react";
import SearchMembers from "@/components/class/search";
import TableHeader from "@/components/class/table-header";

const Members = ({ teacher, students }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const headerTitles = ["Member Name", "Role", "Email", "User ID"];

  const allMembers = useMemo(() => [
    { ...teacher },
    ...students,
  ], [teacher, students]);

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
    <div className="space-y-6 p-2 md:w-5/6 w-full mx-auto">
      <SearchMembers searchQuery={searchQuery} setSearchQuery={setSearchQuery} heading={"Members"} />

      {/* Table Header */}
      <TableHeader headerTitles={headerTitles} columns={4}/>

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
          <div key={index} className="bg-secondary rounded-lg shadow p-4 space-y-1 border text-white">
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
