import { db } from "../lib/db";
import { generateId } from "./generateIds";

// 1. Create student profile for userId
export const createStudentProfile = async (userId) => {
  return await db.student.create({
    data: { userId, studentId: generateId("S") },
  });
};

// 2. Find student user by full name
export const getStudentByName = async (fullName) => {
  const [firstName, ...rest] = fullName.split(" ");
  const lastName = rest.join(" ");

  return await db.user.findFirst({
    where: { firstName, lastName, role: "Student" },
    include: { student: true },
  });
};

// 3. Find student by userId
export const getStudentByUserId = async (userId) => {
  return await db.student.findUnique({
    where: { userId },
    include: { user: true },
  });
};


// 4. Get student by studentId
export const getStudentByStudentId = async (studentId) => {
  return await db.student.findUnique({
    where: { studentId },
    include: { user: true },
  });
};
