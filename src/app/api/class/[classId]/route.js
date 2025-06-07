import { db } from "../../../../../lib/db";
import { NextResponse } from "next/server";
import { getClassByClassId } from "../../../../../utils/class";

export async function GET(req, { params }) {
  const classId = params.classId;

  const data = await getClassByClassId(classId);

  console.log("Fetching class data for classId:", classId);
  console.log("Class data:", JSON.stringify(data, null, 2));


  if (!data) return NextResponse.json({ error: "Class not found" }, { status: 404 });

  return NextResponse.json(data);
}
