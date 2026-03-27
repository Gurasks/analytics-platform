import { useContext, useMemo } from "react";
import { ThemeContext } from "./theme-context";
import { getCssVar } from "../helpers/css-helper";

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

export function useThemeColors() {
  const { theme } = useTheme();

  return useMemo(() => {
    const get = getCssVar;

    return {
      accent: get("--accent-color"),
      accentHover: get("--accent-hover"),
      bgCard: get("--bg-card"),
      textPrimary: get("--text-primary"),
      textSecondary: get("--text-secondary"),
      border: get("--border-color"),
    };
  }, [theme]);
}
