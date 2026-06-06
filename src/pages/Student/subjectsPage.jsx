import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getSubjectsByLevel } from "../../redux/slices/subjectSlice";
import {Spinner} from "../../components/ui/spinner"
import { useTranslation } from "react-i18next";
import  SubjectCard from "../../components/SubjectCard";
const SubjectsPage = () => {

  const { levelId, departmentId } = useParams(); // categoryId = departmentId
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { subjects, loading, error, fetched } = useSelector(
    (state) => state.subjects
  );
console.log(subjects)


  useEffect(() => {

    if (levelId) {
      dispatch(
        getSubjectsByLevel({
          levelId,
          department: departmentId, // 👈 مهم
        })
      );
    }

  }, [dispatch, levelId, departmentId]);


 if (loading) {
    return<Spinner className="size-20 dark:text-white" />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }



  return (
    <div className="min-h-screen p-6 pt-20 container mx-auto">

      <h1 className="text-3xl font-bold mb-6">
         {t("subjects")}
      </h1>



    <div className="space-y-4  ">

  {subjects?.map((subject, index) => (
 <SubjectCard
    key={subject.id}
    subject={subject}
    index={index}
  />
  ))}

</div>

    </div>
  );
};

export default SubjectsPage;