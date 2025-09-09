import React, { useState } from "react";
import ModalHeader from "./modal-header";
import ModalFooter from "./modal-footer";
import Button from "@/components/navbar/button";


const JoinClass = ({ onClose }) => {
     const [joinCode, setJoinCode] = useState("");
     
const handleJoinClass = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("/api/class/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classCode: joinCode, studentId: user.userId }),
      });
      const result = await response.json();
      alert(result.message || result.error);
      setJoinCode("");
      closeModal();
    } catch (error) {
      alert("Failed to join class.");
    }
  };

  return (
    <div className="w-5/6 mx-auto bg-white z-50">
      <ModalHeader onClose={onClose} />
      <div className="md:overflow-y-hidden overflow-y-auto md:max-h-screen max-h-[80vh]">
        <form className="flex flex-col gap-6 mt-20 mb-10">
          <div className="flex flex-col md:mt-0 mt-10">
            <h1 className="mt-5 text-center font-semibold text-xl">Enter the class code to join the class</h1>
            <label className="text-black font-semibold mt-5">
              Class Code <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                placeholder="Enter Class Code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="border p-2 w-full my-4"
              />
          </div>
        </form>
      </div>

      <div className="flex items-center gap-4 mb-20">
        <Button text="Join" type="submit" onClick={handleJoinClass} />
      </div>

      <div className="md:hidden flex flex-col"></div>

      <ModalFooter />
    </div>
  );
};

export default JoinClass;
