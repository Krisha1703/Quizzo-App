import { db } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { classCode, studentId: userId } = body;

    console.log("[DEBUG] Request body:", body);

    if (!classCode || !userId) {
      return NextResponse.json({ error: "Missing classCode or studentId" }, { status: 400 });
    }

    // Find class by classCode
    const cls = await db.class.findUnique({
      where: { classCode },
    });

    if (!cls) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

 
    const student = await db.student.findUnique({
      where: { userId },  
    });
    console.log("[DEBUG] Found student:", student);

    if (!student) {
      return NextResponse.json({ error: "Student not found for this userId" }, { status: 404 });
    }

    // Destructure student fields
    const { id, studentId, userId: linkedUserId } = student;

    console.log("[DEBUG] student.id (Mongo ObjectId):", id);
    console.log("[DEBUG] student.studentId (Custom ID):", studentId);
    console.log("[DEBUG] student.userId (Linked User ID):", linkedUserId);


    const studentObjectId = student.studentId;

    // Validate format 
    if (!studentObjectId) {
      return NextResponse.json({ error: "Invalid student ObjectId" }, { status: 400 });
    }

    // Check if student already joined
    const alreadyJoined = cls.studentIds.includes(studentObjectId);

    if (alreadyJoined) {
      return NextResponse.json({ error: "Student already joined this class" }, { status: 409 });
    }

    // Add studentId to studentIds array
    await db.class.update({
      where: { classId: cls.classId },
      data: {
        studentIds: {
          push: studentObjectId,
        },
      },
    });

    return NextResponse.json({ message: "Class joined successfully" });
  } catch (error) {
    console.error("[ERROR] Error joining class:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
