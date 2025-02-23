//Quiz fetched as API
import quizData from "@/data/quiz-data.json";

export async function GET() {
  return new Response(JSON.stringify(quizData), {
    headers: { "Content-Type": "application/json" },
  });
}
