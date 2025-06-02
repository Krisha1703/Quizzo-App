"use server";

import { db } from "../../../../../../lib/db";
import { CreateClassSchema } from "../../../../../../schema";

// GET handler to prefill the edit form
export async function GET(_req, context) {
  const params = await context.params;
  console.log("GET params:", params);

  const classId = params.classId;
  console.log("GET classId:", classId);

  try {
    const classData = await db.class.findFirst({
      where: { classId },
      include: {
        teacher: { include: { user: true } },
      },
    });

    if (!classData) {
      console.log("GET: Class not found");
      return new Response(JSON.stringify({ error: "Class not found" }), { status: 404 });
    }

    const { name, description, learningOutcomes, schedule, teacher } = classData;
    const teacherName = `${teacher.user.firstName} ${teacher.user.lastName}`;

    console.log("GET: Class found", { name, teacherName });

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
  const params = await context.params;
  console.log("PUT params:", params);

  const classId = params.classId; 
  console.log("PUT classId:", classId);

  try {
    const body = await req.json();
    console.log("PUT body:", body);

    const parsed = CreateClassSchema.safeParse(body);
    if (!parsed.success) {
      console.log("PUT validation errors:", parsed.error.errors);
      return new Response(JSON.stringify({ error: parsed.error.errors }), { status: 400 });
    }

    const { name, description, learningOutcomes, schedule, teacherName } = parsed.data;
    console.log("PUT parsed data:", parsed.data);

    const [firstName, ...rest] = teacherName.split(" ");
    const lastName = rest.join(" ");

    const user = await db.user.findFirst({
      where: { firstName, lastName, role: "Teacher" },
      include: { teacher: true },
    });
    console.log("PUT found user:", user);

    if (!user?.teacher) {
      console.log("PUT: Teacher not found");
      return new Response(JSON.stringify({ error: "Teacher not found" }), { status: 404 });
    }

    const existing = await db.class.findFirst({
      where: { classId },
      include: {
        teacher: { include: { user: true } },
      },
    });

    if (!existing) {
      console.log("PUT: Class not found");
      return new Response(JSON.stringify({ error: "Class not found" }), { status: 404 });
    }

    await db.class.update({
      where: { classId },
      data: {
        name,
        description,
        learningOutcomes,
        schedule,
        teacherId: user.teacher.teacherId,
      },
    });

    console.log("PUT: Class updated successfully");

    return new Response(JSON.stringify({ message: "Class updated successfully" }), { status: 200 });
  } catch (err) {
    console.error("PUT error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
