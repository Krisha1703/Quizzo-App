import { z } from 'zod';

export const SignUpSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["Student", "Teacher"]),
    termsAccepted: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions"
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const CreateClassSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  description: z.string().optional(),
  learningOutcomes: z.string().optional(),
  schedule: z.string().optional(),
  teacherName: z.string().min(1, "Teacher name is required"),
  classCode: z.string().min(4).max(10).optional(),
});
