"use client";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-primary mb-6">About Quizzo</h1>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        Quizzo is an interactive web platform designed for teachers and students
        to create, join, and manage classes with ease. From assignments to
        score tracking, Quizzo makes learning engaging and organized.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">
        Our mission is to simplify digital learning by combining{" "}
        <span className="font-semibold">collaboration</span>,
        <span className="font-semibold"> assessments</span>, and{" "}
        <span className="font-semibold">resources</span> into one easy-to-use
        platform.
      </p>
    </div>
  );
}
