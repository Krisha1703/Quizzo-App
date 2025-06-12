import { NextResponse } from "next/server";
import { db } from "../../../../../../../lib/db";

// GET: Fetch all submissions 
export async function GET(req, { params }) {
  const assignmentId = params.assignmentId;
  try {
    const submissions = await db.assignmentSubmission.findMany({
      where: { assignmentId },
      include: {
        student: {
          include: { user: true },
        },
      },
    });

    const assignment = await db.assignment.findUnique({
      where: { assignmentId },
      include: { class: true },
    });

    if (!assignment) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
    }

    const allStudents = await db.student.findMany({
      where: {
        studentId: {
          in: assignment.class.studentIds,
        },
      },
      include: { user: true },
    });

    const studentMap = new Map();

    allStudents.forEach((student) => {
      studentMap.set(student.studentId, {
        studentId: student.studentId,
        studentName: `${student.user.firstName} ${student.user.lastName}`,
        submittedAt: null,
        isLate: false,
        fileUrl: null,
        score: null,
      });
    });

    submissions.forEach((sub) => {
      studentMap.set(sub.studentId, {
        studentId: sub.studentId,
        studentName: `${sub.student.user.firstName} ${sub.student.user.lastName}`,
        submittedAt: sub.submittedAt,
        isLate: sub.isLate,
        fileUrl: sub.fileUrl,
        score: sub.score ?? null,
      });
    });

    const allSubmissions = Array.from(studentMap.values());
    const scores = allSubmissions.map((s) => s.score).filter((n) => n !== null);
    const min = scores.length ? Math.min(...scores) : 0;
    const max = scores.length ? Math.max(...scores) : 0;
    const mean = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    return NextResponse.json({
      submissions: allSubmissions,
      stats: { min, mean, max },
    });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

// POST: Update individual score
export async function POST(req, { params }) {
  const { assignmentId } = params;

  try {
    const { studentId, score } = await req.json();

    await db.assignmentSubmission.updateMany({
      where: { assignmentId, studentId },
      data: { score },
    });

    const allScores = await db.assignmentSubmission.findMany({
      where: { assignmentId },
      select: { score: true },
    });

    const validScores = allScores.map((s) => s.score).filter((n) => n !== null);
    const min = validScores.length ? Math.min(...validScores) : 0;
    const max = validScores.length ? Math.max(...validScores) : 0;
    const mean = validScores.length ? validScores.reduce((a, b) => a + b, 0) / validScores.length : 0;

    return NextResponse.json({ success: true, stats: { min, mean, max } });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Failed to update score" }, { status: 500 });
  }
}
