 import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X, GraduationCap } from "lucide-react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { motion, AnimatePresence } from "framer-motion";
import LanguageDropdown from "./language-dropdown";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { isDark, toggle } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const {t} = useTranslation()
 const navLinks = [
  { label: t("nav.home"), type: "scroll", id: "hero" },
  { label: t("nav.features"), type: "scroll", id: "features" },
  { label: t("nav.about"), type: "scroll", id: "about" },
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
};

  return (
    <nav className="fixed  top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
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
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-full border border-border bg-background flex items-center justify-center"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <LanguageDropdown/>
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium rounded-lg border border-border hover:bg-muted"
            >
              {t("login_button")}
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground"
            >
              {t("signup_button")}
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <LanguageDropdown/>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
                  onClick={() => {
                    handleNavClick(link);
                    setMenuOpen(false);
                  }}
                  className="text-left text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </button>
              ))}
               <div className="flex gap-2 pt-2 border-t border-border">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center px-4 py-2 text-sm border border-border rounded-lg"
                >
                  {t("login_button")}
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg"
                >
                  {t("signup_button")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}