import { Sun, Moon } from "lucide-react";
import { useDarkMode } from "@/hooks/use-dark-mode";

export default function ThemeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed top-4 right-4 z-50 flex items-center justify-center w-9 h-9 rounded-full border border-border bg-card text-foreground shadow-sm hover:bg-muted transition-colors duration-150"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
