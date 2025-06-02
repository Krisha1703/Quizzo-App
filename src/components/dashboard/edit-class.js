"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ModalHeader from "@/components/homepage/modal/modal-header";
import ModalFooter from "@/components/homepage/modal/modal-footer";
import Button from "@/components/Navbar/button";
import { CreateClassSchema } from "../../../schema";
import { z } from "zod";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const EditClass = ({ classId, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    learningOutcomes: [],
    schedule: [],
    teacherName: "",
  });

  const [newOutcome, setNewOutcome] = useState("");
  const [newSchedule, setNewSchedule] = useState({ day: "", time: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const res = await fetch(`/api/class/${classId}/edit`);
        const data = await res.json();

        if (res.ok) {
          setFormData({
            name: data.name || "",
            description: data.description || "",
            learningOutcomes: data.learningOutcomes?.split(", ") || [],
            schedule: data.schedule?.split(", ") || [],
            teacherName: data.teacherName || "",
          });
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Failed to fetch class data", error);
      }
    };

    fetchClassData();
  }, [classId]);

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
    if (newSchedule.day && newSchedule.time) {
      setFormData((prev) => ({
        ...prev,
        schedule: [...prev.schedule, `${newSchedule.day}: ${newSchedule.time}`],
      }));
      setNewSchedule({ day: "", time: "" });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const updatedData = {
      name: formData.name,
      description: formData.description,
      learningOutcomes: formData.learningOutcomes.join(", "),
      schedule: formData.schedule.join(", "),
      teacherName: formData.teacherName,
    };

    try {
      CreateClassSchema.parse(updatedData);

      const response = await fetch(`/api/class/${classId}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage("Class updated successfully!");
      } else {
        setErrors(result.error || {});
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

  const allFieldsFilled = formData.name && formData.description && formData.teacherName;

  return (
    <div className="w-5/6 mx-auto bg-white z-50">
      <ModalHeader onClose={onClose} />
      <div className="overflow-y-auto min-h-[70vh] max-h-[90vh] p-4">
        <form onSubmit={handleSave} className="grid grid-cols-2 gap-6 mt-20">

          {/* Class Name */}
          <div className="col-span-2">
            <label className="block text-sm font-medium">Class Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Learning Outcomes */}
          <div className="col-span-2">
            <label className="block text-sm font-medium">Learning Outcomes</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded"
                placeholder="Add outcome"
              />
              <button type="button" onClick={handleAddOutcome} className="bg-blue-500 text-white px-3 rounded">
                Add
              </button>
            </div>
            <ul className="list-disc ml-5">
              {formData.learningOutcomes.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Schedule */}
          <div className="col-span-2">
            <label className="block text-sm font-medium">Schedule</label>
            <div className="flex gap-2 mb-2">
              <select
                value={newSchedule.day}
                onChange={(e) => setNewSchedule((prev) => ({ ...prev, day: e.target.value }))}
                className="border p-2 rounded"
              >
                <option value="">Day</option>
                {weekdays.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Time (e.g. 10:00 AM)"
                value={newSchedule.time}
                onChange={(e) => setNewSchedule((prev) => ({ ...prev, time: e.target.value }))}
                className="flex-grow p-2 border border-gray-300 rounded"
              />
              <button type="button" onClick={handleAddSchedule} className="bg-blue-500 text-white px-3 rounded">
                Add
              </button>
            </div>
            <ul className="list-disc ml-5">
              {formData.schedule.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Teacher Name (Read-only) */}
          <div className="col-span-2">
            <label className="block text-sm font-medium">Teacher</label>
            <input
              type="text"
              name="teacherName"
              value={formData.teacherName}
              readOnly
              className="w-full mt-1 p-2 border border-gray-200 bg-gray-100 rounded cursor-not-allowed"
            />
          </div>

          {/* Save Button and Feedback */}
          <div className="col-span-2 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: allFieldsFilled ? 1 : 0, y: allFieldsFilled ? 0 : 10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Button text="Save Changes" type="submit" />
            </motion.div>
            {errors.general && <p className="text-red-500 mt-2">{errors.general}</p>}
            {successMessage && <p className="text-green-600 font-semibold mb-20">{successMessage}</p>}
          </div>
        </form>
      </div>
      <ModalFooter />
    </div>
  );
};

export default EditClass;
