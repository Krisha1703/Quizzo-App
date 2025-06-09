"use server";

import { LoginSchema } from "../../../../schema";
import { loginUser } from "../../../../utils/user";
import { db } from "../../../../lib/db";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return new Response(
        JSON.stringify({ error: { message: "Invalid request body" } }),
        { status: 400 }
      );
    }

    const parsedData = LoginSchema.safeParse(body);
    if (!parsedData.success) {
      return new Response(
        JSON.stringify({ error: { message: parsedData.error.errors || "Invalid input" } }),
        { status: 400 }
      );
    }

    const { email, password } = parsedData.data;

    const result = await loginUser({ email, password });

    if (result.error) {
      return new Response(
        JSON.stringify({ error: { message: result.error } }),
        { status: 401 }
      );
    }

     await db.user.update({
      where: { email },
      data: { LastLoginAt: new Date() },
    });

    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: result.user,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error.toString());
    return new Response(
      JSON.stringify({ error: { message: "Internal server error" } }),
      { status: 500 }
    );
  }
}
