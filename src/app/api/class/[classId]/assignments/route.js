// File: /app/api/class/[classId]/assignments/route.js

import { NextResponse } from "next/server";
import { uploadFileToCloudinary } from "../../../../../../lib/cloudinary-upload";
import { db } from "../../../../../../lib/db";
import { generateId } from "../../../../../../utils/generateIds";
import { getStudentByUserId } from "../../../../../../utils/student";

export async function POST(req, { params }) {
  const classId = params.classId;
  const formData = await req.formData();

  const file = formData.get("file");
  const description = formData.get("description");
  const dueDate = formData.get("dueDate");
const title = formData.get("title");

  if (!file || !description || !dueDate) {
    return NextResponse.json({ error: "Missing file, description, or dueDate" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const assignmentId = generateId("ASG-");

  try {
    const cloudinaryUrl = await uploadFileToCloudinary(buffer, "assignments");

    const assignment = await db.assignment.create({
      data: {
        assignmentId,
        classId,
        title,
        description,
        dueDate: new Date(dueDate),
        fileUrl: cloudinaryUrl,
      },
    });

    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    console.error("Assignment upload failed:", error);
    return NextResponse.json({ error: "Assignment upload failed" }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  const classId = params.classId;
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const student = await getStudentByUserId(userId);
  const studentId = student?.studentId;


  try {
    const assignments = await db.assignment.findMany({
      where: { classId },
      orderBy: { dueDate: "asc" },
      include: {
        submissions: studentId
          ? {
              where: { studentId },
              select: { submittedAt: true },
            }
          : false,
      },
    });


    const result = assignments.map((assignment) => ({
      assignmentId: assignment.assignmentId,
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      fileUrl: assignment.fileUrl,
      createdAt: assignment.createdAt,
      submitted: assignment.submissions?.[0]?.submittedAt ? true : false,
    }));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Fetch assignments failed:", error);
    return NextResponse.json({ error: "Failed to fetch assignments" }, { status: 500 });
  }
}

