"use server";

import { db } from "../../../../../lib/db";
import { CreateClassSchema } from "../../../../../schema";

const generateClassId = () => `CLS${Date.now().toString().slice(-6)}`;
const generateClassCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400 });
    }

    const parsedData = CreateClassSchema.safeParse(body);
    if (!parsedData.success) {
      return new Response(JSON.stringify({ error: parsedData.error.errors || "Invalid input" }), { status: 400 });
    }

    const { name, description, learningOutcomes, schedule, teacherName, classCode } = parsedData.data;

    const [firstName, ...rest] = teacherName.split(" ");
    const lastName = rest.join(" ");

  
    const user = await db.user.findFirst({
      where: { firstName, lastName, role: "Teacher" },
      include: { teacher: true },
    });

    if (!user || !user.teacher) {
      return new Response(JSON.stringify({ error: "Teacher not found" }), { status: 404 });
    }

    const teacherId = user.teacher.teacherId;

   
    const classId = generateClassId();
    const uniqueClassCode = classCode || generateClassCode();

  
    const existingClass = await db.class.findFirst({
      where: { classCode: uniqueClassCode },
    });

    if (existingClass) {
      return new Response(JSON.stringify({ error: "Class code already exists. Try again." }), { status: 409 });
    }


    await db.class.create({
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

    return new Response(JSON.stringify({ message: "Class created successfully", classCode: newClass.classCode, }), { status: 201 });
  } catch (error) {
    console.error("Create Class Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
