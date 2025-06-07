import { db } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const classId = params.classId;

  const data = await db.class.findFirst({
    where: { classId },
  });

  console.log("Fetching class data for classId:", classId);
  console.log("Class data:", data);

  if (!data) return NextResponse.json({ error: "Class not found" }, { status: 404 });

  return NextResponse.json(data);
}
