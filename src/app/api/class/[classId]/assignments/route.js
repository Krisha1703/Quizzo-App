import { NextResponse } from "next/server";
import { db } from "../../../../../../lib/db";
import { getStudentByUserId } from "../../../../../../utils/student";

export async function GET(req, context) {
  const params = await context.params;  
  const classId = params.classId;
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    const student = await getStudentByUserId(userId);
    const studentId = student?.studentId;


    const assignments = await db.assignment.findMany({
      where: { classId },
      orderBy: { dueDate: "asc" },
    });

    let submissionMap = {};
    if (studentId) {
      const submissions = await db.assignmentSubmission.findMany({
        where: { studentId },
        select: {
          assignmentId: true,
          isLate: true,
          submittedAt: true,
          score: true,
          fileUrl: true,
        },
      });

      submissionMap = submissions.reduce((map, sub) => {
        map[sub.assignmentId] = sub;
        return map;
      }, {});
    }

   const result = assignments.map((assignment) => {
  const submission = submissionMap[assignment.assignmentId];

  return {
    assignmentId: assignment.assignmentId,
    title: assignment.title,
    description: assignment.description,
    dueDate: assignment.dueDate,
    fileUrl: assignment.fileUrl,
    createdAt: assignment.createdAt,
    submittedAt: submission?.submittedAt ?? null,
    submitted: submission?.submittedAt != null,
    submissionStatus: submission
      ? submission.isLate
        ? "Late"
        : "On Time"
      : "Not Submitted",
    
    submissionFileUrl: submission?.fileUrl ?? null,
    score: submission?.score ?? null,
  };
});


    console.log("Student submission results: ", result);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Fetch assignments failed:", error);
    return NextResponse.json({ error: "Failed to fetch assignments" }, { status: 500 });
  }
}
