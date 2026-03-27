import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type ThemeName = "dark" | "cyberpunk" | "minimal";

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
});

const themeVars: Record<ThemeName, Record<string, string>> = {
  dark: {
    "--color-primary-400": "#818cf8",
    "--color-primary-500": "#6366f1",
    "--color-primary-600": "#4f46e5",
    "--color-accent-cyan": "#22d3ee",
    "--color-accent-purple": "#a78bfa",
    "--color-surface-950": "#020617",
  },
  cyberpunk: {
    "--color-primary-400": "#f472b6",
    "--color-primary-500": "#ec4899",
    "--color-primary-600": "#db2777",
    "--color-accent-cyan": "#34d399",
    "--color-accent-purple": "#c084fc",
    "--color-surface-950": "#0a0a0f",
  },
  minimal: {
    "--color-primary-400": "#94a3b8",
    "--color-primary-500": "#64748b",
    "--color-primary-600": "#475569",
    "--color-accent-cyan": "#67e8f9",
    "--color-accent-purple": "#a5b4fc",
    "--color-surface-950": "#0f172a",
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("portfolio-theme") as ThemeName) || "dark";
  });

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
    localStorage.setItem("portfolio-theme", t);
  };

  useEffect(() => {
    const vars = themeVars[theme];
    const root = document.documentElement;
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
