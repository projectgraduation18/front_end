// LevelPage.jsx
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const LevelPage = () => {
  const navigate = useNavigate();

  const levels = [
    {
      id: 1,
      name: "Level 1",
      hasCategory: false,
      description: "This level covers the basics of computer science...",
      image: "https://example.com/level1-image.jpg",
    },
    {
      id: 2,
      name: "Level 2",
      hasCategory: false, // ملهوش category
      description: "This level builds on the fundamentals...",
      image: "https://example.com/level2-image.jpg",
    },
    {
      id: 3,
      name: "Level 3",
      hasCategory: true,
      description: "This level focuses on software development...",
      image: "https://example.com/level3-image.jpg",
    },
    {
      id: 4,
      name: "Level 4",
      hasCategory: true,
      description: "This level covers advanced topics...",
      image: "https://example.com/level4-image.jpg",
    },
  ];

  const handleViewDetails = (level) => {
    if (level.hasCategory) {
      navigate(`/level/${level.id}/category`);
    } else {
      navigate(`/level/${level.id}/lectures`);
    }
  };
  const {t}= useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full mx-auto">
        {levels.map((level) => (
          <div
            key={level.id}
            className="relative overflow-hidden rounded-2xl group w-full h-[300px] md:h-[350px] lg:h-[400px] transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
          >
            <div className="absolute inset-0">
              <img
                src={level.image}
                alt={level.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
            <div className="relative z-10 flex flex-col justify-between h-full p-4 md:p-6 text-white">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 tracking-tight">
                  {level.name}
                </h3>
                <p className="text-sm md:text-base opacity-90 line-clamp-3 md:line-clamp-4 leading-relaxed">
                  {level.description}
                </p>
                {level.hasCategory && (
                  <span className="inline-block mt-2 text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">
                     {t("levels.choose_department")} →
                  </span>
                )}
              </div>
              <div className="self-end mt-4">
                <button
                  onClick={() => handleViewDetails(level)}
                  className="text-sm md:text-base bg-blue-600 hover:bg-blue-700 px-4 md:px-6 py-2 md:py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {level.hasCategory ? t("levels.choose_department") : t("levels.start_learning")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelPage;
