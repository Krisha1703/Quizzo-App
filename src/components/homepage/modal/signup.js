import React, { useState } from "react";
import { motion } from "framer-motion";
import ModalHeader from "./modal-header";
import ModalFooter from "./modal-footer";
import Button from "@/components/navbar/button";
import { SignUpSchema } from "../../../../schema";
import { z } from "zod";
import MenuItem from "@/components/navbar/menu-item";
import Login from "./login";

const Signup = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Check if all required fields are filled
  const allFieldsFilled =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.role &&
    formData.password &&
    formData.confirmPassword;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); 

    const formattedData = {
      ...formData,
      role: formData.role.charAt(0).toUpperCase() + formData.role.slice(1),
    };

    try {
      SignUpSchema.parse(formattedData);

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Sign up successful! You can now log in to Quizzo.");
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
      <div className="md:overflow-y-hidden overflow-y-auto  md:max-h-screen max-h-[60vh] hide-scrollbar">
        <form className="md:grid flex flex-col md:grid-cols-2 gap-6 mt-20" onSubmit={handleSubmit}>
          {/* First Row: First Name and Last Name */}
          {[{ label: "First Name", name: "firstName" }, { label: "Last Name", name: "lastName" }].map(({ label, name }) => (
            <div key={name} className="flex flex-col md:mt-0 mt-10">
              <label className="text-black font-semibold">
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="bg-gray-100 rounded-md p-2 outline-none"
              />
              {errors[name] && <div className="text-red-500">{errors[name]}</div>}
            </div>
          ))}

          {/* Second Row: Email and Role */}
          {[{ label: "Email", name: "email", type: "email" }, { label: "Role", name: "role", type: "select" }].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label className="text-black font-semibold">
                {label} <span className="text-red-500">*</span>
              </label>
              {type === "select" ? (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md p-2 outline-none"
                >
                  <option value="">Select a Role</option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-md p-2 outline-none"
                />
              )}
              {errors[name] && <div className="text-red-500">{errors[name]}</div>}
            </div>
          ))}

          {/* Third Row: Password and Re-enter Password */}
          {[{ label: "Password", name: "password", type: "password" }, { label: "Re-enter Password", name: "confirmPassword", type: "password" }].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label className="text-black font-semibold">
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="bg-gray-100 rounded-md p-2 outline-none"
              />
              {errors[name] && <div className="text-red-500">{errors[name]}</div>}
            </div>
          ))}

          {/* Terms Acceptance */}
          <motion.label
            className="flex items-center space-x-2 col-span-2"
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
            />
            <span className="font-semibold">
              I agree to the Terms & Conditions and Privacy Policy
            </span>
          </motion.label>
          {errors.termsAccepted && <div className="text-red-500 col-span-2">{errors.termsAccepted}</div>}

          <div className="flex items-center gap-4 mb-20 -mt-10">
            <Button text="Sign Up" type="submit" onClick={handleSubmit} />
            <MenuItem
              title="Login"
              onClick={onSwitchToLogin}
            />
          </div>

        </form>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="text-green-500 text-center font-semibold mb-10">
          {successMessage}
        </div>
      )}
    
      <ModalFooter />
    </div>
  );
};

export default Signup;
