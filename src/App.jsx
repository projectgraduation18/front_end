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
import LevelPage from "./pages/lectures/levelPage";
import Category from "./pages/lectures/category";
import LecturesPage from "./pages/lectures/lecturesPage";
import UnauthorizedPage from "./pages/unauthorized";

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LanguageDirection>
          <TooltipProvider>
            <BrowserRouter>
              {/* <ToastContainer theme="colored" position="top-center" /> */}
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="/chat" element={ isAuthenticated ? <ChatPage /> : <Navigate to="/login" /> } />
                  <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                  />

                  <Route
                    path="/login"
                    element={
                      !isAuthenticated && !isLoading ? (
                        <LoginPage />
                      ) : (
                        <Navigate to="/" />
                      )
                    }
                  />
                  <Route
                    path="/signup"
                    element={
                      !isAuthenticated && !isLoading ? (
                        <SignupPage />
                      ) : (
                        <Navigate to="/" />
                      )
                    }
                  />
                  <Route
                    path="/verification-code"
                    element={
                      !isAuthenticated && !isLoading ? (
                        <VerificationCode />
                      ) : (
                        <Navigate to="/" />
                      )
                    }
                  />

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

                  <Route path="/unauthorized" element={<UnauthorizedPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageDirection>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
