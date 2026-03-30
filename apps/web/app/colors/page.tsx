"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ColorSwatch } from "@/components/color-swatch";
import {
  COLOR_TOKENS,
  DEFAULT_COLORS,
  colorsToText,
  textToColors,
} from "@/lib/color";

const STORAGE_KEY = "design-playground:colors";

const tokens = COLOR_TOKENS.map((name) => ({
  name,
  variable: `--${name}`,
}));

export default function ColorsPage() {
  const [colors, setColors] = useState<Record<string, string>>(DEFAULT_COLORS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Record<string, string>;
        setColors((prev) => ({ ...prev, ...parsed }));
        for (const [name, value] of Object.entries(parsed)) {
          document.documentElement.style.setProperty(`--${name}`, value);
        }
      } catch {
        // ignore malformed storage
      }
    }
  }, []);

  function handleColorChange(name: string, hsl: string) {
    setColors((prev) => {
      const next = { ...prev, [name]: hsl };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    document.documentElement.style.setProperty(`--${name}`, hsl);
  }

  function handleSave() {
    const toml = colorsToText(colors);
    const blob = new Blob([toml], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "colorscheme";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleLoad(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const loaded = textToColors(text);
      const next = { ...colors, ...loaded };
      setColors(next);
      for (const [name, value] of Object.entries(loaded)) {
        document.documentElement.style.setProperty(`--${name}`, value);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    };
    reader.readAsText(file);
    // reset so the same file can be re-loaded
    e.target.value = "";
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Colors</h1>
        <p className="text-muted-foreground">
          Semantic color tokens used throughout the design system. Click a swatch to edit its color.
        </p>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSave}>Save colorscheme</Button>
        <label>
          <Button asChild>
            <span>Load colorscheme</span>
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="*"
            className="sr-only"
            onChange={handleLoad}
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.map((token) => (
          <ColorSwatch
            key={token.name}
            name={token.name}
            variable={token.variable}
            hslValue={colors[token.name] ?? DEFAULT_COLORS[token.name] ?? ""}
            onChange={handleColorChange}
          />
        ))}
      </div>
    </div>
  );
}
