import { db } from "../lib/db";
import { generateId } from "./generateIds";
import { getTeacherByName } from "./teacher";

// 1. Create a new class
export const createClass = async ({
  name,
  description,
  learningOutcomes,
  schedule,
  teacherName,
  classCode,
}) => {

  const user = await getTeacherByName(teacherName);
  if (!user || !user.teacher) return { error: "Teacher not found" };

  const teacherId = user.teacher.teacherId;


  const classId = generateId("CLS");
  const uniqueClassCode = classCode || generateRandomClassCode();


  const existingClass = await db.class.findFirst({ where: { classCode: uniqueClassCode } });
  if (existingClass) return { error: "Class code already exists. Try again." };

  return await db.class.create({
    data: {
      classId,
      name,
      description,
      learningOutcomes,
      schedule,
      classCode: uniqueClassCode,
      teacherId,
    },
  });
};

// 2. Generate random 6 char class code
const generateRandomClassCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

// 3. Get class by classCode
export const getClassByCode = async (classCode) => {
  if (!classCode) return null;
  return await db.class.findUnique({
    where: { classCode },
  });
};

// 4. Get all classes taught by a teacher
export const getTeacherClasses = async (teacherId) => {
  return await db.class.findMany({
    where: { teacherId },
    include: {
      teacher: {
        include: { user: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

// 5. Get all classes attended by a student
export const getStudentClasses = async (studentId) => {
  return await db.class.findMany({
    where: {
      studentIds: {
        has: studentId,
      },
    },
    include: {
      teacher: {
        include: { user: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

// 6. Get class by classId
export const getClassByClassId = async (classId) => {
  const classData = await db.class.findFirst({
    where: { classId },
    include: {
      teacher: {
        include: { user: true },
      },
    },
  });

  if (!classData) return null;

  const students = await db.student.findMany({
    where: {
      studentId: {
        in: classData.studentIds,
      },
    },
    include: {
      user: true,
    },
  });

  return {
    ...classData,
    students,
  };
};


// 7. Update class details
export const updateClass = async (classId, data) => {
  return await db.class.update({
    where: { classId },
    data,
  });
};