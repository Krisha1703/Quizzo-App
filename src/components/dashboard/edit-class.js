"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ModalHeader from "@/components/homepage/modal/modal-header";
import ModalFooter from "@/components/homepage/modal/modal-footer";
import Image from "next/image";
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
    <div className="w-full  mx-auto bg-white z-50 p-4">
      <ModalHeader onClose={onClose} />
      <div className="overflow-y-auto md:min-h-[80vh] md:max-h-[90vh] h-[60vh] py-4 hide-scrollbar">
        <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 mt-10">
  {/* Class Name + Teacher + Description in flex */}
  <div className="md:flex md:gap-4">
    {/* Class Name + Teacher */}
    <div className="flex flex-col flex-1 gap-4">
      {/* Class Name */}
      <div>
        <label className="block text-sm font-bold">Class Name <span className="text-red-500">*</span></label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full mt-1 p-2 border border-gray-300 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Teacher Name */}
      <div>
        <label className="block text-sm font-bold">Teacher <span className="text-red-500">*</span></label>
        <input
          type="text"
          name="teacherName"
          value={formData.teacherName}
          readOnly
          className="w-full mt-1 p-2 border border-gray-200 bg-gray-100 rounded cursor-not-allowed"
        />
      </div>
    </div>

    {/* Description */}
    <div className="flex-1 mt-4 md:mt-0">
      <label className="block text-sm font-bold">Description <span className="text-red-500">*</span></label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        rows={4}
        className="w-full mt-1 p-2 border border-gray-300 rounded"
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
    </div>
  </div>

  {/* Learning Outcomes */}
  <div className="md:col-span-2">
    <label className="block text-sm font-bold">Learning Outcomes <span className="text-red-500">*</span></label>
    <div className="flex flex-row gap-2 my-2">
      <input
        type="text"
        value={newOutcome}
        onChange={(e) => setNewOutcome(e.target.value)}
        className="w-5/6 md:w-full p-2 border border-gray-300 rounded"
        placeholder="Add outcome"
      />
      <button
        type="button"
        onClick={handleAddOutcome}
        className="bg-primary text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
    <ul className="list-disc ml-5 space-y-2">
      {formData.learningOutcomes.map((item, idx) => (
        <li key={idx} className="flex flex-row items-center gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const updated = [...formData.learningOutcomes];
              updated[idx] = e.target.value;
              setFormData((prev) => ({ ...prev, learningOutcomes: updated }));
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button
            type="button"
            onClick={() => {
              const updated = formData.learningOutcomes.filter((_, i) => i !== idx);
              setFormData((prev) => ({ ...prev, learningOutcomes: updated }));
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hidden md:block"
          >
            Delete
          </button>

          <Image src={"/Assets/delete.svg"} width={25} height={25} alt="delete" className="md:hidden"/>
        </li>
      ))}
    </ul>
  </div>

  {/* Schedule */}
  <div className="md:col-span-2">
    <label className="block text-sm font-bold">Schedule <span className="text-red-500">*</span></label>
    <div className="flex flex-col sm:flex-row gap-2 mb-2 ">
      <select
        value={newSchedule.day}
        onChange={(e) => setNewSchedule((prev) => ({ ...prev, day: e.target.value }))}
        className="border p-2 rounded md:w-2/3"
      >
        <option value="">Day</option>
        {weekdays.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      
      <div className="flex flex-row gap-2 md:w-full">
        <input
          type="text"
          placeholder="Time (e.g. 10:00 AM)"
          value={newSchedule.time}
          onChange={(e) => setNewSchedule((prev) => ({ ...prev, time: e.target.value }))}
          className="p-2 w-5/6 md:w-full border border-gray-300 rounded"
        />
        <button
          type="button"
          onClick={handleAddSchedule}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
    <ul className="list-disc ml-5 space-y-2">
      {formData.schedule.map((item, idx) => (
        <li key={idx} className="flex flex-row items-start sm:items-center gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const updated = [...formData.schedule];
              updated[idx] = e.target.value;
              setFormData((prev) => ({ ...prev, schedule: updated }));
            }}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => {
              const updated = formData.learningOutcomes.filter((_, i) => i !== idx);
              setFormData((prev) => ({ ...prev, learningOutcomes: updated }));
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hidden md:block"
          >
            Delete
          </button>

          <Image src={"/Assets/delete.svg"} width={25} height={25} alt="delete" className="md:hidden"/>
        </li>
      ))}
    </ul>
  </div>

  {/* Save Button and Feedback */}
  <div className="flex mt-4">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: allFieldsFilled ? 1 : 0, y: allFieldsFilled ? 0 : 10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Button text="Save Changes" type="submit" />
    </motion.div>
    {errors.general && <p className="text-red-500 mt-2">{errors.general}</p>}
    {successMessage && <p className="text-green-600 font-semibold my-3 mx-5">{successMessage}</p>}
  </div>
</form>

      </div>
      <ModalFooter />
    </div>
  );
};

export default EditClass;
