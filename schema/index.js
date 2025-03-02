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
    recaptchaResponse: z.string().min(1, "reCAPTCHA verification is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
