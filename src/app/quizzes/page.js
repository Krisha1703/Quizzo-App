"use client";

import { useState } from "react";

export default function QuizzesPage() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const quizzes = [
    { id: 1, title: "General Knowledge", questions: 10 },
    { id: 2, title: "Math Practice", questions: 15 },
    { id: 3, title: "Science Basics", questions: 12 },
  ];

  if (selectedQuiz) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-6">
        <button
          onClick={() => setSelectedQuiz(null)}
          className="text-primary underline mb-4"
        >
          ← Back to quizzes
        </button>
        <h1 className="text-2xl font-bold mb-4">{selectedQuiz.title}</h1>
        <p className="text-gray-700">
          {selectedQuiz.questions} questions in this quiz.
        </p>
        <button className="mt-6 px-6 py-2 bg-primary text-white rounded-lg">
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Practice Quizzes</h1>
      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="p-4 border rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition bg-white"
          >
            <div>
              <h2 className="text-xl font-semibold">{quiz.title}</h2>
              <p className="text-sm text-gray-500">{quiz.questions} questions</p>
            </div>
            <button
              onClick={() => setSelectedQuiz(quiz)}
              className="px-4 py-2 bg-primary text-white rounded-lg"
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
