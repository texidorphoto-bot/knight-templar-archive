"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const STORAGE_KEY = "templar-theme";

function getInitialTheme(): "day" | "night" {
  if (typeof window === "undefined") return "day";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "night" || stored === "day") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";
}

function applyTheme(theme: "day" | "night") {
  document.documentElement.setAttribute("data-theme", theme === "night" ? "night" : "");
  localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"day" | "night">("day");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "day" ? "night" : "day";
    setTheme(next);
    applyTheme(next);
  }

  if (!mounted) {
    return <div className="h-8 w-8" aria-hidden="true" />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === "day" ? "Switch to candlelit reading mode" : "Switch to daylight reading mode"}
      className="flex h-8 w-8 items-center justify-center rounded-subtle text-cloister-stone transition-colors hover:bg-vellum-warm hover:text-iron-gall"
      style={{ transitionDuration: "var(--duration-quick)" }}
    >
      {theme === "day" ? (
        <Moon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Sun className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
