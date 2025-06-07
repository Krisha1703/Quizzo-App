"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ModalHeader from "@/components/homepage/modal/modal-header";
import ModalFooter from "@/components/homepage/modal/modal-footer";
import Button from "@/components/Navbar/button";
import { CreateClassSchema } from "../../../schema";
import { z } from "zod";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const CreateClass = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    learningOutcomes: [],
    schedule: [],
    teacherName: "", 
  });

  const [newOutcome, setNewOutcome] = useState("");
  const [newSchedule, setNewSchedule] = useState({
  day: '',
  startTime: '',
  endTime: ''
});

  const [classCode, setClassCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const firstName = parsedUser.firstName || "";
        const lastName = parsedUser.lastName || "";
        const teacherName = firstName + " " + lastName; 
        setFormData((prev) => ({ ...prev, teacherName }));
        setUser(parsedUser);
      }
    }
  }, []);

  const allFieldsFilled = formData.name && formData.description && formData.teacherName;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOutcome = () => {
    if (newOutcome.trim()) {
      setFormData((prev) => ({
        ...prev,
        learningOutcomes: [...prev.learningOutcomes, newOutcome.trim()],
      }));
      setNewOutcome("");
    }
  };

  const handleAddSchedule = () => {
  const { day, startTime, endTime } = newSchedule;

  if (!day || !startTime || !endTime) return;

  const formatTime = (time) =>
    new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(new Date(`1970-01-01T${time}`));

  const formatted = `${day} ${formatTime(startTime)} - ${formatTime(endTime)}`;
  setFormData((prev) => ({
    ...prev,
    schedule: [...prev.schedule, formatted]
  }));

  setNewSchedule({ day: '', startTime: '', endTime: '' });
};


  const handleSubmit = async (e) => {
    console.log("Submitting form with data:", formData);
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const submitData = {
      name: formData.name,
      description: formData.description,
      learningOutcomes: formData.learningOutcomes.join(", "),
      schedule: formData.schedule.join(", "),
      teacherName: formData.teacherName,
    };

    console.log("Submited form data:", submitData);

    try {
      CreateClassSchema.parse(submitData);

      const response = await fetch("/api/class/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();
      console.log("data: ", data);

      if (response.ok) {
        setSuccessMessage("Class created successfully!");
        setClassCode(data.classCode || "");
        setFormData({
          name: "",
          description: "",
          learningOutcomes: [],
          schedule: [],
          teacherName: formData.teacherName,
        });
      } else {
        setErrors(data.error || {});
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: "Something went wrong!" });
      }
    }
  };

  return (
    <div className="w-5/6 mx-auto bg-white z-50">
      <ModalHeader onClose={onClose} />
      <div className="overflow-y-auto min-h-[70vh] max-h-[90vh] p-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-20">
          {/* Class Name */}
          <div>
            <label className="font-semibold">
              Class Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-gray-100 rounded-md p-2 mt-1 outline-none"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          {/* Teacher Name - readOnly */}
          <div>
            <label className="font-semibold">
              Teacher<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="teacherName"
              value={formData.teacherName}
              readOnly
              className="w-full bg-gray-100 rounded-md p-2 mt-1 outline-none text-gray-500 cursor-not-allowed"
            />
            {errors.teacherName && <p className="text-red-500">{errors.teacherName}</p>}
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="font-semibold">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-gray-100 rounded-md p-2 mt-1 outline-none"
            />
          </div>

          {/* Learning Outcomes */}
          <div>
            <label className="font-semibold">Learning Outcomes</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value)}
                placeholder="Enter outcome"
                className="w-full bg-gray-100 rounded-md p-2 outline-none"
              />
              <button type="button" onClick={handleAddOutcome} className="bg-blue-500 text-white px-3 rounded">
                Add
              </button>
            </div>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
              {formData.learningOutcomes.map((outcome, index) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          </div>

         {/* Schedule */}
          <div>
            <label className="font-semibold">Class Schedule</label>
            <div className="flex gap-2 mt-1 flex-wrap">
              <select
                value={newSchedule.day}
                onChange={(e) => setNewSchedule((prev) => ({ ...prev, day: e.target.value }))}
                className="bg-gray-100 rounded-md p-2 w-full sm:w-1/3"
              >
                <option value="">Select Day</option>
                {weekdays.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              <input
                type="time"
                value={newSchedule.startTime}
                onChange={(e) => setNewSchedule((prev) => ({ ...prev, startTime: e.target.value }))}
                className="bg-gray-100 rounded-md p-2 w-full sm:w-1/3"
              />

              <input
                type="time"
                value={newSchedule.endTime}
                onChange={(e) => setNewSchedule((prev) => ({ ...prev, endTime: e.target.value }))}
                className="bg-gray-100 rounded-md p-2 w-full sm:w-1/3"
              />

              <button
                type="button"
                onClick={handleAddSchedule}
                className="bg-blue-500 text-white px-3 py-2 rounded mt-2 sm:mt-0"
              >
                Add
              </button>
            </div>

            <ul className="mt-2 text-sm text-gray-700">
              {formData.schedule.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>


          {/* Submit Button */}
          <div className="col-span-2 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: allFieldsFilled ? 1 : 0, y: allFieldsFilled ? 0 : 10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Button text="Create Class" type="submit" />
            </motion.div>
            {errors.general && <p className="text-red-500 mt-2">{errors.general}</p>}
            {successMessage && (
              <p className="text-green-600 font-semibold mb-20">
                {successMessage} <br />
                <span className="text-sm">
                  Class ID: <span className="font-mono">{classCode}</span>
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
      <ModalFooter />
    </div>
  );
};

export default CreateClass;
