import { NextResponse } from "next/server";
import { uploadFileToCloudinary } from "../../../../../../lib/cloudinary-upload";
import { db } from "../../../../../../lib/db";

export async function POST(req, { params }) {
  const classId = params.classId;
  const formData = await req.formData();

  const file = formData.get("file");
  const description = formData.get("description");

  if (!file || !description) {
    return NextResponse.json({ error: "Missing file or description" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const cloudinaryUrl = await uploadFileToCloudinary(buffer, "resources");

    const resource = await db.resource.create({
      data: {
        classId,
        description,
        url: cloudinaryUrl,
      },
    });

    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET(_, { params }) {
  const classId = params.classId;

  try {
    const resources = await db.resource.findMany({
      where: { classId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(resources, { status: 200 });
  } catch (error) {
    console.error("Fetch failed:", error);
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}
