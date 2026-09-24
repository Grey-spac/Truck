"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("truck-care-theme");
    const current = document.documentElement.dataset.theme;
    const isLight = saved === "light" || (!saved && current === "light");
    document.documentElement.dataset.theme = isLight ? "light" : "dark";
    setLight(isLight);
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    window.localStorage.setItem("truck-care-theme", next ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Dark mode" : "Light mode"}
    >
      {light ? <Moon size={17} /> : <Sun size={17} />}
      <span className="hidden lg:inline">{light ? "Dark" : "Light"}</span>
    </button>
  );
}
