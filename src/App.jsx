import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./redux/store";
import { useEffect } from "react";
import { restoreSession } from "./redux/slices/authSlice";

import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import ForgotPasswordPage from "./pages/forgot-password";
import ChatPage from "./pages/chat";
import MainLayout from "./components/layout/mainLayout";
import LanguageDirection from "./components/language-direction";
import VerificationCode from "./pages/verification-code";
import ResetPasswordPage from "./pages/reset-password";

import LevelPage from "./pages/Student/levelPage";
import Department from "./pages/Student/Department";
import SubjectsPage from "./pages/Student/subjectsPage";
import UnauthorizedPage from "./pages/unauthorized";

import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Students from "./pages/Admin/Students";
import Levels from "./pages/Admin/Levels";
import DepartmentDetails from "./pages/Admin/DepartmentDetails";
import SubjectsPageAdmin from "./pages/Admin/subjectsPage";
import SubjectDetails from "./pages/Admin/SubjectDetails";
import StudentHomePage from "./pages/Student/studentHome";
const queryClient = new QueryClient();

/* ================= ROUTES ================= */

// function AppRoutes() {
//   const dispatch = useDispatch();

//   const {
//     user,
//     isAuthenticated,
//     isLoading,
//     authInitialized,
//   } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(restoreSession());
//   }, [dispatch]);

//   /* 🔥 مهم جداً */
//   if (!authInitialized) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <Routes>

//       {/* ================= PUBLIC ================= */}
//       <Route path="/" element={<MainLayout />}>
//         <Route index element={<HomePage />} />

//         <Route path="/forgot-password" element={<ForgotPasswordPage />} />

//         <Route
//           path="/login"
//           element={
//             !isAuthenticated ? (
//               <LoginPage />
//             ) : user?.role?.toLowerCase() === "admin" ? (
//               <Navigate to="/admin" replace />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />

//         <Route
//           path="/signup"
//           element={
//             !isAuthenticated ? <SignupPage /> : <Navigate to="/" replace />
//           }
//         />

//         <Route
//           path="/verification-code"
//           element={
//             !isAuthenticated ? <VerificationCode /> : <Navigate to="/" replace />
//           }
//         />

//         <Route
//           path="/reset-password"
//           element={
//             !isAuthenticated ? <ResetPasswordPage /> : <Navigate to="/" replace />
//           }
//         />

//         <Route
//           path="/chat"
//           element={
//             isAuthenticated ? <ChatPage /> : <Navigate to="/login" replace />
//           }
//         />

//         <Route path="/unauthorized" element={<UnauthorizedPage />} />

//         {/* ================= STUDENT ================= */}
//         <Route
//           path="/level"
//           element={
//             <StudentRoute user={user} isAuthenticated={isAuthenticated} authInitialized={authInitialized}>
//               <LevelPage />
//             </StudentRoute>
//           }
//         />
//          <Route
//           path="/student"
//           element={
//             <StudentRoute user={user} isAuthenticated={isAuthenticated} authInitialized={authInitialized}>
//               <StudentHomePage />
//             </StudentRoute>
//           }
//         />

//         <Route
//           path="/level/:levelId/subjects"
//           element={
//             <StudentRoute user={user} isAuthenticated={isAuthenticated} authInitialized={authInitialized}>
//               <SubjectsPage />
//             </StudentRoute>
//           }
//         />

//         <Route
//           path="/level/:levelId/department"
//           element={
//             <StudentRoute user={user} isAuthenticated={isAuthenticated} authInitialized={authInitialized}>
//               <Department />
//             </StudentRoute>
//           }
//         />

//         <Route
//           path="/level/:levelId/department/:departmentId/subjects"
//           element={
//             <StudentRoute user={user} isAuthenticated={isAuthenticated} authInitialized={authInitialized}>
//               <SubjectsPage />
//             </StudentRoute>
//           }
//         />
//       </Route>

//       {/* ================= ADMIN ================= */}
//       <Route
//         path="/admin"
//         element={
//           <AdminRoute user={user} isAuthenticated={isAuthenticated} authInitialized={authInitialized}>
//             <AdminLayout />
//           </AdminRoute>
//         }
//       >
//         <Route index element={<Dashboard />} />
//         <Route path="students" element={<Students />} />
//         <Route path="levels" element={<Levels />} />
//         <Route path="levels/:levelId/department" element={<DepartmentDetails />} />
//         <Route path="levels/:levelId/department/:departmentId/subjects" element={<SubjectsPageAdmin />} />
//         <Route path="levels/:levelId/subjects" element={<SubjectsPageAdmin />} />
//         <Route path="subjects/:subjectId" element={<SubjectDetails />} />
//       </Route>

//     </Routes>
//   );
// }








function AppRoutes() {
  const dispatch = useDispatch();

  const {
    user,
    isAuthenticated,
    authInitialized,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  /* ================= LOADING ================= */
  if (!authInitialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verification-code" element={<VerificationCode />} />

        <Route
          path="/reset-password"
          element={
            !isAuthenticated ? (
              <ResetPasswordPage />
            ) : (
              <Navigate
                to={user?.role?.toLowerCase() === "admin" ? "/admin" : "/student"}
                replace
              />
            )
          }
        />

        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : user?.role?.toLowerCase() === "admin" ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/student" replace />
            )
          }
        />

        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate to="/student" replace />
            )
          }
        />

        <Route
          path="/chat"
          element={
            isAuthenticated ? (
              <ChatPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* ================= STUDENT ================= */}
        <Route
          path="/student"
          element={
            <StudentRoute
              user={user}
              isAuthenticated={isAuthenticated}
              authInitialized={authInitialized}
            >
              <StudentHomePage />
            </StudentRoute>
          }
        />

        <Route
          path="/level"
          element={
            <StudentRoute
              user={user}
              isAuthenticated={isAuthenticated}
              authInitialized={authInitialized}
            >
              <LevelPage />
            </StudentRoute>
          }
        />

        <Route
          path="/level/:levelId/subjects"
          element={
            <StudentRoute
              user={user}
              isAuthenticated={isAuthenticated}
              authInitialized={authInitialized}
            >
              <SubjectsPage />
            </StudentRoute>
          }
        />

        <Route
          path="/level/:levelId/department"
          element={
            <StudentRoute
              user={user}
              isAuthenticated={isAuthenticated}
              authInitialized={authInitialized}
            >
              <Department />
            </StudentRoute>
          }
        />

        <Route
          path="/level/:levelId/department/:departmentId/subjects"
          element={
            <StudentRoute
              user={user}
              isAuthenticated={isAuthenticated}
              authInitialized={authInitialized}
            >
              <SubjectsPage />
            </StudentRoute>
          }
        />
      </Route>

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <AdminRoute
            user={user}
            isAuthenticated={isAuthenticated}
            authInitialized={authInitialized}
          >
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="levels" element={<Levels />} />
        <Route path="levels/:levelId/department" element={<DepartmentDetails />} />
        <Route path="levels/:levelId/department/:departmentId/subjects" element={<SubjectsPageAdmin />} />
        <Route path="levels/:levelId/subjects" element={<SubjectsPageAdmin />} />
        <Route path="subjects/:subjectId" element={<SubjectDetails />} />
      </Route>

    </Routes>
  );
}



/* ================= APP ================= */

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LanguageDirection>
          <TooltipProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </LanguageDirection>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

/* ================= GUARDS ================= */

const AdminRoute = ({ user, isAuthenticated, authInitialized, children }) => {
  if (!authInitialized) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (user?.role?.toLowerCase() !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

const StudentRoute = ({ user, isAuthenticated, authInitialized, children }) => {
  if (!authInitialized) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (user?.role?.toLowerCase() !== "student") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};