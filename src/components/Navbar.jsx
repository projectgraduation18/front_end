import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X, GraduationCap, LogOut, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { motion, AnimatePresence } from "framer-motion";
import LanguageDropdown from "./language-dropdown";
import { useTranslation } from "react-i18next";
import { logoutUser } from "../redux/slices/authSlice";

export default function Navbar() {
  const { isDark, toggle } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { t } = useTranslation();

  // جلب حالة المصادقة من Redux Store
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth,
  );

  const navLinks = [
    { label: t("nav.home"), type: "route",  path:"/student"},
    { label: t("nav.level"), type: "route", id: "level", path: "level" },
    { label: t("nav.chat_ai"), type: "route", path: "/chat" },
  ];

  const handleNavClick = (link) => {
    if (link.type === "route") {
      navigate(link.path);
    } else {
      if (location.pathname !== "/") {
        navigate("/");

        setTimeout(() => {
          document.getElementById(link.id)?.scrollIntoView({
            behavior: "smooth",
          });
        }, 100);
      } else {
        document.getElementById(link.id)?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    // dispatch(resetAuthState());
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground tracking-tight">
              FCI <span className="text-primary">MU</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center hover:bg-muted transition-colors"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <LanguageDropdown />

            {/* عرض الأزرار حسب حالة المصادقة */}
            {isLoading ? (
              // عرض loading spinner أثناء التحقق
              <div className="w-20 h-9 animate-pulse bg-muted rounded-lg" />
            ) : isAuthenticated ? (
              // المستخدم مسجل دخول - عرض اسمه وزر Logout
              <div className="flex items-center gap-3">
                {/* <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {user?.name || user?.email?.split("@")[0] || "User"}
                  </span>
                </div> */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  {t("logout_button") || "Logout"}
                </button>
              </div>
            ) : (
              // المستخدم غير مسجل دخول - عرض أزرار Login و Register
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  {t("login_button")}
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  {t("signup_button")}
                </Link>
              </>
            )}
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <LanguageDropdown />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              {menuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-card overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className="text-left text-sm text-muted-foreground hover:text-foreground py-2 transition-colors"
                >
                  {link.label}
                </button>
              ))}

              <div className="flex gap-2 pt-2 border-t border-border mt-2">
                {isLoading ? (
                  <div className="w-full h-9 animate-pulse bg-muted rounded-lg" />
                ) : isAuthenticated ? (
                  // Mobile - مستخدم مسجل دخول
                  <>
                    <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        {user?.name || user?.email?.split("@")[0] || "User"}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex-1 text-center px-4 py-2 text-sm bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      {t("logout_button") || "Logout"}
                    </button>
                  </>
                ) : (
                  // Mobile - مستخدم غير مسجل دخول
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="flex-1 text-center px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      {t("login_button")}
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="flex-1 text-center px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                    >
                      {t("signup_button")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
