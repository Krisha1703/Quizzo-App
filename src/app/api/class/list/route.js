import { db } from "../../../../../lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "Missing userId" }),
        { status: 400 }
      );
    }

    // Find user by userId
    const user = await db.user.findUnique({
      where: { userId },
      include: {
        teacher: true,
        student: true,
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    let classes = [];

    if (user.role === "Teacher" && user.teacher) {
      // Find classes where teacherId matches
      classes = await db.class.findMany({
        where: { teacherId: user.teacher.teacherId },
        include: {
          teacher: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } else if (user.role === "Student" && user.student) {
      // Find classes where studentIds array contains the student's studentId
      classes = await db.class.findMany({
        where: {
          studentIds: {
            has: user.student.studentId,
          },
        },
        include: {
          teacher: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    }

    // Format the classes data to return
    const formatted = classes.map((cls) => ({
      classId: cls.classId,
      classCode: cls.classCode,
      name: cls.name,
      description: cls.description,
      learningOutcomes: cls.learningOutcomes,
      schedule: cls.schedule,
      createdAt: cls.createdAt,
      totalStudents: cls.studentIds?.length || 0,
      teacher: cls.teacher?.user
        ? {
            teacherId: cls.teacher.teacherId,
            name: `${cls.teacher.user.firstName} ${cls.teacher.user.lastName}`,
            email: cls.teacher.user.email,
          }
        : null,
    }));

    return new Response(
      JSON.stringify({ classes: formatted }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching classes:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch classes" }),
      { status: 500 }
    );
  }
}
