import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BookOpen, Layers, TrendingUp } from "lucide-react";

import { getLevels } from "../../redux/slices/levelSlice";
import { useIsArabic } from "../../lib/utils";
import { useTranslation } from "react-i18next";
export default function StudentHomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const { levels } = useSelector((state) => state.levels);

  const isArabic = useIsArabic();
  useEffect(() => {
    dispatch(getLevels());
  }, [dispatch]);
  console.log(levels);

  return (
    <div className="min-h-screen bg-background p-6 pt-20 container mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
           {isArabic ? "مرحبا " : "Welcome back, "} {user?.name}
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
           {isArabic ? "استكشف مستوياتك وموادك الدراسية" : "Explore your levels and subjects"}
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-2">
            <Layers className="text-primary" />
            <h3 className="font-semibold">
              {isArabic ? "المستويات" : "Levels"}
            </h3>
          </div>
          <p className="text-2xl font-bold mt-2">
            {levels?.length || 4}
          </p>
        </div>

        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-2">
            <BookOpen className="text-blue-500" />
            <h3 className="font-semibold">
              {isArabic ? "المواد الدراسية" : "Subjects"}
            </h3>
          </div>
          <p className="text-2xl font-bold mt-2">
            +50
          </p>
        </div>

        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-500" />
            <h3 className="font-semibold">
              {isArabic ? "الاقسام" : "Departments"}
            </h3>
          </div>
          <p className="text-2xl font-bold mt-2">
            3
          </p>
        </div>

      </div>

      {/* LEVELS PREVIEW */}
      <h2 className="text-xl font-bold mb-4">
        {isArabic ? "المستويات" : "  Levels"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {levels?.slice(0, 6).map((level) => (
          <div
            key={level.id}
             onClick={() => {
      if (level.levelNumber === 3 || level.levelNumber === 4) {
        navigate(`/level/${level.levelNumber}/department`);
      } else {
        navigate(`/level/${level.levelNumber}/subjects`);
      }
    }}
            className="bg-card border rounded-xl p-5 cursor-pointer hover:shadow-md transition"
          >
            <h3 className="font-semibold">
              {isArabic ? " المستوى" : " Level"} : {level.levelNumber}
            </h3>

            <p className="text-sm text-muted-foreground mt-1">
                {t(`levels.level_${level.levelNumber}_description`)}

             </p>

            <p className="text-xs mt-3 text-primary">
              {isArabic ? "عرض المواد" : "View Subjects"} →
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}