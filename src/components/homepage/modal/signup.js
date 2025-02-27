import React, { useState } from "react";
import { motion } from "framer-motion";
import ModalHeader from "./modal-header";
import ModalFooter from "./modal-footer";
import Button from "@/components/Navbar/button";

const Signup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Check if all required fields are filled
  const allFieldsFilled =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.role &&
    formData.password &&
    formData.confirmPassword;

  return (
    <div className="w-5/6 mx-auto bg-white z-50">
      {/* Fixed Header */}
      <ModalHeader onClose={onClose} />

      {/* Scrollable Content Area */}
      <div className="md:overflow-y-hidden overflow-y-auto md:max-h-screen max-h-[60vh]">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 mb-10">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-black font-semibold">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-gray-100 rounded-md p-2 outline-none"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-black font-semibold">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-gray-100 rounded-md p-2 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-black font-semibold">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-100 rounded-md p-2 outline-none"
              required
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="text-black font-semibold">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="bg-gray-100 rounded-md p-2 outline-none"
              required
            >
              <option value="">Select a Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-black font-semibold">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-100 rounded-md p-2 outline-none"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-black font-semibold">
              Re-enter Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-gray-100 rounded-md p-2 outline-none"
              required
            />
          </div>
        </form>
      </div>

      {/* Terms & Signup Button */}
      <div className="flex md:flex-row flex-col justify-between md:mt-0 -mt-10 mb-20">
        {/* Framer Motion Animated Terms Checkbox */}
        <motion.label
          className="flex items-center space-x-2 md:my-0 my-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: allFieldsFilled ? 1 : 0, y: allFieldsFilled ? 0 : 10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="accent-primary"
            disabled={!allFieldsFilled}
          />
          <span className="font-semibold">
            I agree to the Terms & Conditions and Privacy Policy
          </span>
        </motion.label>

        <Button text="Sign Up" type={"submit"} />
      </div>

      {/* Fixed Footer */}
      <ModalFooter />
    </div>
  );
};

export default Signup;
