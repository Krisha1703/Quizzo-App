"use server";

import { db } from "../../../../lib/db";
import bcrypt from "bcryptjs";
import { SignUpSchema } from "../../../../schema";

const generateId = (prefix) => `${prefix}${Date.now().toString().slice(-6)}`;

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400 });
    }

    const { recaptchaResponse, ...signupData } = body;

    // reCAPTCHA Validation
    if (!recaptchaResponse) {
      return new Response(JSON.stringify({ error: "reCAPTCHA token is required" }), { status: 400 });
    }

    // Verify reCAPTCHA token
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaResponse}`;

    const recaptchaVerifyResponse = await fetch(recaptchaVerifyUrl, { method: "POST" });
    const recaptchaVerifyData = await recaptchaVerifyResponse.json();

    if (!recaptchaVerifyData.success) {
      return new Response(JSON.stringify({ error: "reCAPTCHA verification failed" }), { status: 400 });
    }

    const parsedData = SignUpSchema.safeParse(signupData);
    if (!parsedData.success) {
      return new Response(JSON.stringify({ error: parsedData.error.errors || "Invalid input" }), { status: 400 });
    }

    const { firstName, lastName, email, password, role } = parsedData.data;

    const userId = generateId("U");
    
    // Check if the user already exists
    const existingUser = await db.user.findUnique({ where: { userId } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await db.user.create({
      data: { firstName, lastName, email, password: hashedPassword, userId, role },
    });

    // Create Teacher or Student record based on role
    if (role === "Teacher") {
      await db.teacher.create({
        data: { userId: newUser.userId, teacherId: generateId("T") },
      });
    }

    if (role === "Student") {
      await db.student.create({
        data: { userId: newUser.userId, studentId: generateId("S") },
      });
    }

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error.toString());
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
