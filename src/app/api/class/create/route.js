"use server";

import { CreateClassSchema } from "../../../../../schema";
import { createClass } from "../../../../../utils/class";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400 });
    }

    const parsedData = CreateClassSchema.safeParse(body);
    if (!parsedData.success) {
      return new Response(JSON.stringify({ error: parsedData.error.errors || "Invalid input" }), { status: 400 });
    }

    const result = await createClass(parsedData.data);

    if (result.error) {
      const status = result.error.includes("exists") ? 409 : 404;
      return new Response(JSON.stringify({ error: result.error }), { status });
    }

    return new Response(
      JSON.stringify({
        message: "Class created successfully",
        classCode: result.classCode,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Class Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
