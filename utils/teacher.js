import { db } from "../lib/db";
import { generateId } from "./generateIds";

// 1. Create teacher profile for userId
export const createTeacherProfile = async (userId) => {
  return await db.teacher.create({
    data: { userId, teacherId: generateId("T") },
  });
};

// 2. Find teacher user by full name
export const getTeacherByName = async (fullName) => {
  const [firstName, ...rest] = fullName.split(" ");
  const lastName = rest.join(" ");

  return await db.user.findFirst({
    where: { firstName, lastName, role: "Teacher" },
    include: { teacher: true },
  });
};

// 3. Find teacher by userId
export const getTeacherByUserId = async (userId) => {
  return await db.teacher.findUnique({
    where: { userId },
    include: { user: true },
  });
};

// 4. Get teacher by teacherId
export const getTeacherByTeacherId = async (teacherId) => {
  return await db.teacher.findUnique({
    where: { teacherId },
    include: { user: true },
  });
};