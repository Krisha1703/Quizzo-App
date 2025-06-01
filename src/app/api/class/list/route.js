// app/api/class/list/route.js
import { db } from "../../../../../lib/db";

export async function GET() {
  try {
    const classes = await db.class.findMany({
      include: {
        teacher: {
          include: {
            user: true, 
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = classes.map((cls) => ({
      classId: cls.classId,
      classCode: cls.classCode,
      name: cls.name,
      description: cls.description,
      learningOutcomes: cls.learningOutcomes,
      schedule: cls.schedule,
      createdAt: cls.createdAt,
      totalStudents: cls.studentIds?.length || 0, 
      teacher: {
        teacherId: cls.teacher.teacherId,
        name: `${cls.teacher.user.firstName} ${cls.teacher.user.lastName}`,
        email: cls.teacher.user.email,
      },
    }));

    return new Response(JSON.stringify({ classes: formatted }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch classes" }), {
      status: 500,
    });
  }
}
