import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";

import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import ForgotPasswordPage from "./pages/forgot-password";
import ChatPage from "./pages/chat";
import MainLayout from "./components/layout/mainLayout";
import LanguageDirection from "./components/language-direction";
import VerificationCode from "./pages/verification-code";
import LevelPage from "./pages/lectures/levelPage";
import Category from "./pages/lectures/category";
import LecturesPage from "./pages/lectures/lecturesPage";
import { useSelector } from "react-redux";
import UnauthorizedPage from "./pages/unauthorized";
const queryClient = new QueryClient();

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageDirection>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />

                <Route
                  path="/level"
                  element={
                    user?.role === "Student" ? (
                      <LevelPage />
                    ) : (
                      <Navigate
                        to={!isAuthenticated ? "/login" : "/unauthorized"}
                      />
                    )
                  }
                />
                <Route
                  path="/level/:levelId/lectures"
                  element={
                    user?.role === "Student" ? (
                      <LecturesPage />
                    ) : (
                      <Navigate
                        to={!isAuthenticated ? "/login" : "/unauthorized"}
                      />
                    )
                  }
                />
                <Route
                  path="/level/:levelId/category"
                  element={
                    user?.role === "Student" ? (
                      <Category />
                    ) : (
                      <Navigate
                        to={!isAuthenticated ? "/login" : "/unauthorized"}
                      />
                    )
                  }
                />
                <Route
                  path="/level/:levelId/category/:categoryId/lectures"
                  element={
                    user?.role === "Student" ? (
                      <LecturesPage />
                    ) : (
                      <Navigate
                        to={!isAuthenticated ? "/login" : "/unauthorized"}
                      />
                    )
                  }
                />

                <Route
                  path="/login"
                  element={
                    !isAuthenticated ? <LoginPage /> : <Navigate to="/" />
                  }
                />
                <Route
                  path="/signup"
                  element={
                    !isAuthenticated ? <SignupPage /> : <Navigate to="/" />
                  }
                />
                <Route
                  path="/verification-code"
                  element={
                    !isAuthenticated ? (
                      <VerificationCode />
                    ) : (
                      <Navigate to="/" />
                    )
                  }
                />
                <Route path="/chat" element={ isAuthenticated ? <ChatPage /> : <Navigate to="/login" /> } />

                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />

                <Route path="/unauthorized" element={<UnauthorizedPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageDirection>
    </QueryClientProvider>
  );
}

export default App;
