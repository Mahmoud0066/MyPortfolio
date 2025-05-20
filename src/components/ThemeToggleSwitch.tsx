
"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import "@/styles/ThemeToggle.css";

const ThemeToggleSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // If not mounted yet, render a placeholder or null to avoid hydration mismatch.
  // This ensures server and initial client render match.
  if (!mounted) {
    return <div style={{ width: '65px', height: '34px' }} aria-hidden="true" />;
  }

  const isDarkMode = theme === "dark";

  return (
    <>
      <label className="switch" htmlFor="theme-toggle-checkbox">
        <input
          type="checkbox"
          id="theme-toggle-checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        />
        <span className="slider round">
          <div className="moon"></div>
          <div className="sun"></div>
        </span>
      </label>
    </>
  );
};

export default ThemeToggleSwitch;
