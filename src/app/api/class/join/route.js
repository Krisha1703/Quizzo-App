import { db } from "../../../../../lib/db";
import { getClassByCode } from "../../../../../utils/class";
import { getStudentByUserId } from "../../../../../utils/student";

export async function POST(req) {
  try {
    const body = await req.json();
    const { classCode, studentId: userId } = body;

    if (!classCode || !userId) {
      return new Response(JSON.stringify({ error: "Missing classCode or studentId" }), { status: 400 });
    }

    const cls = await getClassByCode(classCode);
    if (!cls) {
      return new Response(JSON.stringify({ error: "Class not found" }), { status: 404 });
    }

    const student = await getStudentByUserId(userId);
    if (!student) {
      return new Response(JSON.stringify({ error: "Student not found for this userId" }), { status: 404 });
    }

    const studentObjectId = student.studentId;
    if (!studentObjectId) {
      return new Response(JSON.stringify({ error: "Invalid student ObjectId" }), { status: 400 });
    }

    if (cls.studentIds.includes(studentObjectId)) {
      return new Response(JSON.stringify({ error: "Student already joined this class" }), { status: 409 });
    }

    await db.class.update({
      where: { classId: cls.classId },
      data: {
        studentIds: {
          push: studentObjectId,
        },
      },
    });

    return new Response(JSON.stringify({ message: "Class joined successfully" }), { status: 200 });
  } catch (error) {
    console.error("[ERROR] Error joining class:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
