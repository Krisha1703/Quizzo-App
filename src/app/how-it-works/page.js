"use client";

export default function LearnPage() {
  const resources = [
    { title: "Getting Started with Quizzo", type: "Guide" },
    { title: "Top 10 Study Tips for Students", type: "Article" },
    { title: "How Teachers Can Use Quizzo Effectively", type: "Video" },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Learn with Quizzo</h1>
      <p className="text-gray-700 mb-8">
        Explore resources, tutorials, and tips to get the most out of Quizzo.
      </p>
      <ul className="space-y-4">
        {resources.map((res, idx) => (
          <li
            key={idx}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-white"
          >
            <h2 className="text-xl font-semibold">{res.title}</h2>
            <p className="text-sm text-gray-500">{res.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
