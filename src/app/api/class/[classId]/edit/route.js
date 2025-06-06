"use server";

import { CreateClassSchema } from "../../../../../../schema";
import { getClassByClassId, updateClass } from "../../../../../../utils/class";
import { getTeacherByName } from "../../../../../../utils/teacher";

// GET handler to prefill the edit form
export async function GET(_req, context) {
  const { classId } = context.params;

  try {
    const classData = await getClassByClassId(classId);

    if (!classData) {
      return new Response(JSON.stringify({ error: "Class not found" }), { status: 404 });
    }

    const { name, description, learningOutcomes, schedule, teacher } = classData;
    const teacherName = `${teacher.user.firstName} ${teacher.user.lastName}`;

    return new Response(
      JSON.stringify({ name, description, learningOutcomes, schedule, teacherName }),
      { status: 200 }
    );
  } catch (err) {
    console.error("GET error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

// PUT handler to save updates
export async function PUT(req, context) {
  const { classId } = context.params;

  try {
    const body = await req.json();
    const parsed = CreateClassSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.errors }), { status: 400 });
    }

    const { name, description, learningOutcomes, schedule, teacherName } = parsed.data;

    const teacherUser = await getTeacherByName(teacherName);
    if (!teacherUser?.teacher) {
      return new Response(JSON.stringify({ error: "Teacher not found" }), { status: 404 });
    }

    const existing = await getClassByClassId(classId);
    if (!existing) {
      return new Response(JSON.stringify({ error: "Class not found" }), { status: 404 });
    }

    await updateClass(classId, {
      name,
      description,
      learningOutcomes,
      schedule,
      teacherId: teacherUser.teacher.teacherId,
    });

    return new Response(JSON.stringify({ message: "Class updated successfully" }), { status: 200 });
  } catch (err) {
    console.error("PUT error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
