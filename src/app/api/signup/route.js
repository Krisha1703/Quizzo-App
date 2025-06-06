"use server";

import { SignUpSchema } from "../../../../schema";
import { createUser, isUserExists } from "../../../../utils/user";
import { generateId } from "../../../../utils/generateIds";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
      });
    }

    const parsedData = SignUpSchema.safeParse(body);
    if (!parsedData.success) {
      return new Response(
        JSON.stringify({ error: parsedData.error.errors || "Invalid input" }),
        { status: 400 }
      );
    }

    const { firstName, lastName, email, password, role } = parsedData.data;
    
    const userId = generateId("U");

    const existingUser = await isUserExists(email);

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email is already registered" }),
        { status: 400 }
      );
    }

    await createUser({ firstName, lastName, email, password, role, userId });

    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error.toString());
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
