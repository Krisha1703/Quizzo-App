import { getUserByUserId } from "../../../../../utils/user";
import { getTeacherClasses, getStudentClasses } from "../../../../../utils/class";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400 });
    }

    const user = await getUserByUserId(userId);

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    let classes = [];

    if (user.role === "Teacher" && user.teacher) {
      classes = await getTeacherClasses(user.teacher.teacherId);
    } else if (user.role === "Student" && user.student) {
      classes = await getStudentClasses(user.student.studentId);
    }

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

    return new Response(JSON.stringify({ classes: formatted }), { status: 200 });
  } catch (error) {
    console.error("Error fetching classes:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch classes" }), { status: 500 });
  }
}
