import { db } from "../lib/db";
import bcrypt from "bcryptjs";
import { createTeacherProfile } from "./teacher";
import { createStudentProfile } from "./student";

// 1. Check if a user already exists by email
export const isUserExists = async (email) => {
  return await db.user.findUnique({ where: { email } });
};

// 2. Create a new user with hashed password and role-specific data
export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  userId,
  role,
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userId,
      role,
    },
  });

  if (role === "Teacher") {
    await createTeacherProfile(user.userId);
  }

  if (role === "Student") {
    await createStudentProfile(user.userId);
  }


  return user;
};

// 3. Validate user credentials for login
export const loginUser = async ({ email, password }) => {
  const user = await isUserExists(email);
  if (!user) return { error: "Invalid email or password" };

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return { error: "Invalid email or password" };

  return {
    user: {
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user.userId,
    },
  };
};

// 4. Get user by userId
export const getUserByUserId = async (userId) => {
  return await db.user.findUnique({
    where: { userId },
    include: {
      teacher: true,
      student: true,
    },
  });
};