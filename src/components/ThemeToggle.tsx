import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true); // Start in dark mode

  useEffect(() => {
    // Initialize dark mode on first load
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className="neo-toggle-container">
      <input
        type="checkbox"
        id="theme-toggle"
        className="neo-toggle-input"
        checked={isDark}
        onChange={toggleTheme}
      />
      <label htmlFor="theme-toggle" className="neo-toggle">
        <div className="neo-track">
          <div className="neo-background-layer"></div>
        </div>
        <div className="neo-thumb">
          <div className="neo-thumb-ring"></div>
        </div>
      </label>
      <div className="neo-status">
        <div className="neo-status-indicator">
          <div className="neo-status-dot"></div>
          <span className="neo-status-text">
            {isDark ? "DARK" : "LIGHT"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;