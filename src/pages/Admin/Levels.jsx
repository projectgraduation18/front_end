

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLevels } from "../../redux/slices/levelSlice";
import { Spinner } from "../../components/ui/spinner";
import LevelCard from "../../components/LevelCard";

const LevelPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { levels, loading, error, fetched } = useSelector(
    (state) => state.levels
  );

  useEffect(() => {
    if (!fetched) {
      dispatch(getLevels());
    }
    console.log(levels);
  }, [dispatch, fetched]);

  const handleViewDetails = (level) => {
    if (level.hasDepartments) {
      navigate(`/admin/levels/${level.levelNumber}/department`);
    } else {
      navigate(`/admin/levels/${level.levelNumber}/subjects`);
    }
  };

  if (loading) {
    return <Spinner className="size-20 dark:text-white" />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className=" flex items-center justify-center p-4 pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full mx-auto">
        {levels.map((level) => (
          <LevelCard
            key={level.levelNumber}
            level={level}
            onViewDetails={handleViewDetails}
            
          />
        ))}
      </div>
    </div>
  );
};

export default LevelPage;