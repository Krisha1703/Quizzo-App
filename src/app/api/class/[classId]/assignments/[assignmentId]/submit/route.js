import { NextResponse } from "next/server";
import { db } from "../../../../../../../../lib/db";
import { getStudentByUserId } from "../../../../../../../../utils/student";
import { uploadFileToCloudinary } from "../../../../../../../../lib/cloudinary-upload";
import { generateId } from "../../../../../../../../utils/generateIds";

export async function POST(req, { params }) {
  const assignmentId = params.assignmentId;
  const formData = await req.formData();
  const userId = formData.get("userId");
  const file = formData.get("file");
 const student = await getStudentByUserId(userId);
const studentId = student?.studentId; 
const submissionId = generateId("SUB-");


  console.log("Received file:", file);
  console.log("userId:", userId);
  console.log("Student ID:", studentId);

  if (!file || !studentId) {
    return NextResponse.json({ error: "Missing file or student ID" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const assignment = await db.assignment.findUnique({
      where: { assignmentId },
    });

    if (!assignment) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
    }

    const cloudinaryUrl = await uploadFileToCloudinary(buffer, "submissions");

    const submissionDate = new Date();
    const isLate = submissionDate > new Date(assignment.dueDate);
  

    const submission = await db.assignmentSubmission.upsert({
      where: {
        assignmentId_studentId: {
          assignmentId,
          studentId,
        },
      },
      update: {
        fileUrl: cloudinaryUrl,
        submittedAt: submissionDate,
        isLate,
      },
      create: {
        submissionId,
        assignmentId,
        studentId,
        fileUrl: cloudinaryUrl,
        submittedAt: submissionDate,
        isLate,
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error("Submission failed:", error);
    return NextResponse.json({ error: "Failed to submit assignment" }, { status: 500 });
  }
}

export async function GET(_, { params }) {
  const assignmentId = params.assignmentId;

  try {
    const assignment = await db.assignment.findUnique({
      where: { assignmentId },
      include: {
        class: true,
      },
    });

    if (!assignment) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
    }

    const classId = assignment.classId;

    const classData = await db.class.findUnique({
      where: { classId },
    });

    const allStudentIds = classData.studentIds;

    const submissions = await db.assignmentSubmission.findMany({
      where: { assignmentId },
    });

    const onTime = submissions.filter((s) => !s.isLate).length;
    const late = submissions.filter((s) => s.isLate).length;
    const notSubmitted = allStudentIds.length - submissions.length;

    const summary = {
      assignmentId,
      onTime,
      late,
      notSubmitted,
    };

    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    console.error("Fetch submission summary failed:", error);
    return NextResponse.json({ error: "Failed to fetch submission summary" }, { status: 500 });
  }
}
