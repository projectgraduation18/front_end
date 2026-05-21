import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

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
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageDirection>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>             
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route
                path="/verification-code"
                element={<VerificationCode />}
              />
              <Route
                path="/forgot-password"
                element={<ForgotPasswordPage />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </LanguageDirection>
    </QueryClientProvider>
  );
}

export default App;