"use client";

import { useEffect } from "react";

const RADIUS_KEY = "style:radius";
const BG_KEY = "style:bg";

function applyBg(bg: string) {
  if (!bg) {
    document.body.style.backgroundImage = "";
    document.body.style.backgroundSize = "";
    document.body.style.backgroundAttachment = "";
  } else if (bg.startsWith("http") || bg.startsWith("/") || bg.startsWith("data:")) {
    document.body.style.backgroundImage = `url(${bg})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
  } else {
    document.body.style.backgroundImage = bg;
    document.body.style.backgroundSize = bg.includes("radial-gradient(circle") ? "20px 20px" : "cover";
    document.body.style.backgroundAttachment = "fixed";
  }
}

export function StyleProvider() {
  useEffect(() => {
    // Apply persisted values on mount
    const radius = localStorage.getItem(RADIUS_KEY);
    if (radius) document.documentElement.style.setProperty("--radius", `${radius}rem`);

    const bg = localStorage.getItem(BG_KEY) ?? "";
    applyBg(bg);

    // Listen for updates from the style page
    function onStyleChange(e: Event) {
      const { key, value } = (e as CustomEvent<{ key: string; value: string }>).detail;
      if (key === RADIUS_KEY) {
        document.documentElement.style.setProperty("--radius", `${value}rem`);
        localStorage.setItem(RADIUS_KEY, value);
      } else if (key === BG_KEY) {
        applyBg(value);
        if (value) {
          try {
            localStorage.setItem(BG_KEY, value);
          } catch {
            // Value too large for localStorage (e.g. a data URL from a file upload).
            // The background is applied for this session but won't persist on reload.
            localStorage.removeItem(BG_KEY);
          }
        } else {
          localStorage.removeItem(BG_KEY);
        }
      }
    }

    window.addEventListener("style-change", onStyleChange);
    return () => window.removeEventListener("style-change", onStyleChange);
  }, []);

  return null;
}
