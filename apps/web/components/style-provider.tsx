"use client";

import { useEffect } from "react";
import { DEFAULT_COLORS_LIGHT, DEFAULT_COLORS_DARK } from "@/lib/color";
import { loadGoogleFont } from "@/lib/fonts";
import { STORAGE_KEYS } from "@/lib/constants";

const RADIUS_KEY = STORAGE_KEYS.radius;
const BG_KEY = STORAGE_KEYS.bg;
const FONTS_KEY = STORAGE_KEYS.fonts;

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
    // Apply color theme on mount
    const storedColors = localStorage.getItem(STORAGE_KEYS.colors);
    if (storedColors) {
      try {
        const parsed = JSON.parse(storedColors) as Record<string, string>;
        for (const [name, value] of Object.entries(parsed)) {
          document.documentElement.style.setProperty(`--${name}`, value);
        }
      } catch {
        // ignore corrupt localStorage
      }
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const defaults = prefersDark ? DEFAULT_COLORS_DARK : DEFAULT_COLORS_LIGHT;
      for (const [name, value] of Object.entries(defaults)) {
        document.documentElement.style.setProperty(`--${name}`, value);
      }
    }

    // Apply persisted values on mount
    const radius = localStorage.getItem(RADIUS_KEY);
    if (radius) document.documentElement.style.setProperty("--radius", `${radius}rem`);

    const bg = localStorage.getItem(BG_KEY) ?? "";
    applyBg(bg);

    // Resolve the default font values from computed styles (same as fonts page does)
    const geistSans = getComputedStyle(document.body).getPropertyValue("--font-geist-sans").trim();
    const geistMono = getComputedStyle(document.body).getPropertyValue("--font-geist-mono").trim();

    let heading = "Geist Sans";
    let body = "Geist Sans";
    let mono = "Geist Mono";

    try {
      const fontsRaw = localStorage.getItem(FONTS_KEY);
      if (fontsRaw) {
        const parsed = JSON.parse(fontsRaw) as { heading?: string; body?: string; mono?: string };
        if (parsed.heading) heading = parsed.heading;
        if (parsed.body) body = parsed.body;
        if (parsed.mono) mono = parsed.mono;
      }
    } catch {
      // ignore corrupt localStorage
    }

    if (heading !== "Geist Sans") {
      loadGoogleFont(heading);
      document.documentElement.style.setProperty("--font-heading", `"${heading}", serif`);
    } else if (geistSans) {
      document.documentElement.style.setProperty("--font-heading", geistSans);
    }

    if (body !== "Geist Sans") {
      loadGoogleFont(body);
      document.documentElement.style.setProperty("--font-body", `"${body}", sans-serif`);
    } else if (geistSans) {
      document.documentElement.style.setProperty("--font-body", geistSans);
    }

    if (mono !== "Geist Mono") {
      loadGoogleFont(mono);
      document.documentElement.style.setProperty("--font-geist-mono", `"${mono}", monospace`);
    } else if (geistMono) {
      document.documentElement.style.setProperty("--font-geist-mono", geistMono);
    }

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
