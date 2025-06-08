import React, { useState } from "react";
import ModalHeader from "./modal-header";
import ModalFooter from "./modal-footer";
import Button from "@/components/Navbar/button";
import { z } from "zod";
import MenuItem from "@/components/Navbar/menu-item";
import { LoginSchema } from "../../../../schema";
import { useRouter } from "next/navigation";

const Login = ({ onClose, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); 

    try {
      // Validate form data before sending to the backend
      LoginSchema.parse(formData);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Handle server-side validation and error messages
      if (response.ok) {
        setSuccessMessage("Login successful! Redirecting...");

         setTimeout(() => {
          const role = data.user.role.toLowerCase(); 
          localStorage.setItem("user", JSON.stringify(data.user));
          
          if (role === "teacher") {
            router.push("/classes/teacher");
          } else {
            router.push("/classes/student");
          }
        }, 1000);
      } else {
        setErrors({
          general: data.error?.message || "Something went wrong, please try again.",
        });
      }
    } catch (err) {
      // Handle Zod validation errors or unexpected errors
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: "An unexpected error occurred. Please try again later." });
      }
    }
  };

  return (
    <div className="w-5/6 mx-auto bg-white z-50">
      <ModalHeader onClose={onClose} />
      <div className="md:overflow-y-hidden overflow-y-auto md:max-h-screen max-h-[60vh]">
        <form className="flex flex-col gap-6 mt-20 mb-10" onSubmit={handleSubmit}>
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
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
          </div>

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
            />
            {errors.password && <div className="text-red-500">{errors.password}</div>}
          </div>

          {/* Display general error message if any */}
          {errors.general && <div className="text-red-500">{errors.general}</div>}
        </form>
      </div>

      {successMessage && (
        <div className="text-green-500 text-center font-semibold mb-4">
          {successMessage}
        </div>
      )}

      <div className="flex items-center gap-4 mb-20">
        <Button text="Login" type="submit" onClick={handleSubmit} />
        <MenuItem title="Sign Up" onClick={onSwitchToSignup} />
      </div>
      <ModalFooter />
    </div>
  );
};

export default Login;
