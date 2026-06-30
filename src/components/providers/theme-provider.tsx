"use client";

import { useCallback, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "aydexx-theme";

/**
 * The DOM (<html class="dark">) is the single source of truth for the theme —
 * it's set before paint by `themeNoFlashScript` and mutated on toggle. React
 * subscribes via useSyncExternalStore, so there's no setState-in-effect and no
 * hydration flash.
 */
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  // Ease color changes rather than snapping (see globals.css).
  root.classList.add("theme-transition");
}

function onStorage(e: StorageEvent) {
  // Keep other tabs in sync.
  if (e.key === STORAGE_KEY) {
    applyTheme(e.newValue === "light" ? "light" : "dark");
    notify();
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be unavailable (private mode) — non-fatal */
    }
    notify();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}

/**
 * Inline, render-blocking script that applies the stored theme (defaulting to
 * dark) before first paint to prevent a flash of the wrong theme.
 */
export const themeNoFlashScript = `
(function(){
  try {
    var stored = localStorage.getItem("${STORAGE_KEY}");
    var theme = stored === "light" ? "light" : "dark";
    var root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`;
