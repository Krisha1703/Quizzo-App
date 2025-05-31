import { db } from "../../../../lib/db";
import bcrypt from "bcryptjs";
import { LoginSchema } from "../../../../schema";

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

    // Find the first user matching the email
    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: { message: "Invalid email or password" } }),
        { status: 401 }
      );
    }

    // Compare password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: { message: "Invalid email or password" } }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: { email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName, userId: user.userId },
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
