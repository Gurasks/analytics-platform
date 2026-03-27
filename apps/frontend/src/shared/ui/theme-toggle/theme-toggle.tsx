import { useTheme } from "@/shared/theme";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <button
      onClick={handleToggle}
      className="
        relative p-2.5 rounded-lg
        bg-secondary hover:bg-secondary
        text-primary
        transition-all duration-200
        focus:outline-none
        focus:ring-2 focus:ring-(--accent-color)
        focus:ring-offset-2
        focus:ring-offset-(--bg-primary)
        overflow-hidden
        shadow-sm
      "
      aria-label={
        theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
    >
      <div
        className={`relative transition-all duration-300 ${isAnimating
          ? "scale-110 rotate-12"
          : "scale-100 rotate-0"
          }`}
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-(--accent-color)" />
        ) : (
          <Moon className="w-5 h-5 text-(--accent-color)" />
        )}
      </div>

      <span className="sr-only">
        {theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"}
      </span>
    </button>
  );
}