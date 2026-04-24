"use client";
import * as React from "react";
import { Button } from "../src";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");

  React.useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") setTheme(current);
  }, []);

  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("tuxedo-theme", next); } catch {}
  };

  return (
    <Button variant="ghost" size="sm" onClick={flip} aria-label="toggle theme">
      {theme === "dark" ? "☾ dark" : "☀ light"}
    </Button>
  );
}
