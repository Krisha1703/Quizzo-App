import { db } from "../../../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const classId = params.classId;
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!classId || !userId) {
    return NextResponse.json({ error: "Missing classId or userId" }, { status: 400 });
  }

  // Get user and role
  const user = await db.user.findUnique({
    where: { userId },
    select: { role: true, userId: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isTeacher = user.role === "Teacher";

  try {
    // Get class student count
    const classData = await db.class.findUnique({
      where: { classId },
      select: { studentIds: true },
    });

    const totalStudents = classData?.studentIds?.length || 0;

    // Get all assignments with submissions
    const assignments = await db.assignment.findMany({
      where: { classId },
      include: {
        submissions: true,
      },
      orderBy: { dueDate: "asc" },
    });

    let studentId = null;
    if (!isTeacher) {
      const student = await db.student.findUnique({
        where: { userId: user.userId }, // student.userId is unique
        select: { studentId: true },
      });
      studentId = student?.studentId;
    }

    const result = assignments.map((assignment) => {
      const { submissions } = assignment;

      const scores = submissions
        .map((s) => s.score)
        .filter((s) => typeof s === "number");

      const stats = {
        min: scores.length ? Math.min(...scores) : null,
        max: scores.length ? Math.max(...scores) : null,
        mean: scores.length
          ? parseFloat(
              (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)
            )
          : null,
      };

      // ---------- Teacher View ----------
      if (isTeacher) {
        const onTime = submissions.filter(
          (s) => s.submittedAt && !s.isLate
        ).length;
        const late = submissions.filter(
          (s) => s.submittedAt && s.isLate
        ).length;
        const notSubmitted = totalStudents - submissions.length;

        return {
          assignmentId: assignment.assignmentId,
          title: assignment.title,
          dueDate: assignment.dueDate,
          submissionStats: {
            onTime,
            late,
            notSubmitted,
          },
          minScore: stats.min,
          meanScore: stats.mean,
          maxScore: stats.max,
        };
      }

      // ---------- Student View ----------
      const mySubmission = submissions.find((s) => s.studentId === studentId);

      let submissionStatus = "Not Submitted";
      if (mySubmission) {
        submissionStatus = mySubmission.isLate ? "Late" : "On Time";
      }

      return {
        assignmentId: assignment.assignmentId,
        title: assignment.title,
        dueDate: assignment.dueDate,
        submissionStatus,
        submittedAt: mySubmission?.submittedAt ?? null,
        fileUrl: mySubmission?.fileUrl ?? null,
        score:
          typeof mySubmission?.score === "number"
            ? mySubmission.score
            : null,
        minScore: stats.min,
        meanScore: stats.mean,
        maxScore: stats.max,
      };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Error in scorebook API:", err);
    return NextResponse.json(
      { error: "Failed to fetch scorebook data" },
      { status: 500 }
    );
  }
}
