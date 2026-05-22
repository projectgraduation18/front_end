// CategoryPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Category = () => {
  const { levelId } = useParams(); // هنا بنجيب levelId من الـ URL
  const navigate = useNavigate();

  const categories = [
    {
      id: "cs",
      name: "Computer Science",
      icon: "💻",
      description: "Focus on programming, algorithms, and software development",
    },
    {
      id: "is",
      name: "Information Systems",
      icon: "📊",
      description: "Focus on databases, systems analysis, and IT management",
    },
  ];

  const handleCategorySelect = (category) => {
    // استخدام levelId من الـ params
    navigate(`/level/${levelId}/category/${category.id}/lectures`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Level {levelId}</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Choose your specialization track
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategorySelect(category)}
              className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-6xl mb-4">{category.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Select {category.name} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
