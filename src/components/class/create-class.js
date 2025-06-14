// Create Class Component for Teachers

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ModalHeader from "@/components/homepage/modal/modal-header";
import ModalFooter from "@/components/homepage/modal/modal-footer";
import Button from "@/components/Navbar/button";
import InputField from "./input-field";
import DynamicListInput from "./list-input-field";
import { handleInputChange, handleAddOutcome, handleAddSchedule, handleSubmit } from "./helper-functions";
import useUserData from "../../../hooks/use-user-data";
import { z } from "zod";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const CreateClass = ({ onClose }) => {
  const { firstName, lastName } = useUserData();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    learningOutcomes: [],
    schedule: [],
    teacherName: "",
  });

  const [newOutcome, setNewOutcome] = useState("");
  const [newSchedule, setNewSchedule] = useState({ day: "", time: "" });

  const [classCode, setClassCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (firstName && lastName) {
      setFormData((prev) => ({
        ...prev,
        teacherName: `${firstName} ${lastName}`,
      }));
    }
  }, [firstName, lastName]);

  const allFieldsFilled = formData.name && formData.description && formData.teacherName;

  return (
    <div className="w-full mx-auto bg-white z-50 p-4">
      <ModalHeader onClose={onClose} />
      <div className="overflow-y-auto md:min-h-[80vh] md:max-h-[90vh] h-[60vh] py-4 hide-scrollbar">
        <form onSubmit={(e) => handleSubmit({ e, setErrors, setSuccessMessage, formData, setFormData, setNewOutcome, setNewSchedule })} className="grid grid-cols-1 gap-4 mt-10">

          <div className="md:flex md:gap-4">
            <div className="flex flex-col flex-1 gap-4">
              {/* Class Name */}
              <InputField
                fieldname="name"
                label="Class Name"
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                handleInputChange={handleInputChange}
                type="text"
              />

              {/* Teacher Name */}
              <InputField
                fieldname="teacherName"
                label="Teacher"
                formData={formData}
                readOnly={true}
                type="text"
              />
            </div>

            {/* Description */}
            <InputField
              fieldname="description"
              label="Description"
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              handleInputChange={handleInputChange}
              type="textarea"
            />
          </div>

          {/* Learning Outcomes */}
          <DynamicListInput
            title="Learning Outcomes"
            placeholder="Add outcome"
            values={formData.learningOutcomes}
            newValue={newOutcome}
            setNewValue={setNewOutcome}
            onAdd={() => handleAddOutcome({ newOutcome, setFormData, setNewOutcome })}
            onChange={(e, idx) => {
              const updated = [...formData.learningOutcomes];
              updated[idx] = e.target.value;
              setFormData((prev) => ({ ...prev, learningOutcomes: updated }));
            }}
            onDelete={(idx) => {
              const updated = formData.learningOutcomes.filter((_, i) => i !== idx);
              setFormData((prev) => ({ ...prev, learningOutcomes: updated }));
            }}
            error={errors.learningOutcomes}
          />

          {/* Schedule */}
         <DynamicListInput
            title="Schedule"
            values={formData.schedule}
            onAdd={() =>
              handleAddSchedule({
                newSchedule: { day: newSchedule.day, time: newSchedule.time },
                setNewSchedule,
                setFormData,
              })
            }

            onChange={(e, idx) => {
              const updated = [...formData.schedule];
              updated[idx] = e.target.value;
              setFormData((prev) => ({ ...prev, schedule: updated }));
            }}
            onDelete={(idx) => {
              const updated = formData.schedule.filter((_, i) => i !== idx);
              setFormData((prev) => ({ ...prev, schedule: updated }));
            }}
            error={errors.schedule}
            dualInputMode={true}
            dayValue={newSchedule.day}
            setDayValue={(val) => setNewSchedule((prev) => ({ ...prev, day: val }))}
            timeValue={newSchedule.time}
            setTimeValue={(val) => setNewSchedule((prev) => ({ ...prev, time: val }))}
            dayOptions={weekdays}
          />

          {/* Save Button and Feedback */}
          <div className="flex mt-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: allFieldsFilled ? 1 : 0, y: allFieldsFilled ? 0 : 10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Button text="Create Class" type="submit" />
            </motion.div>
          </div>

          {errors.general && <p className="text-red-500 mt-2">{errors.general}</p>}
          {successMessage && (
            <p className="text-green-600 font-semibold my-3">
              {successMessage}
              {classCode && (
                <span className="text-sm block mt-1">
                  Class ID: <span className="font-mono">{classCode}</span>
                </span>
              )}
            </p>
          )}
        </form>
      </div>
      <ModalFooter />
    </div>
  );
};

export default CreateClass;
