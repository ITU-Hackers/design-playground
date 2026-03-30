"use client";

import { useState, useEffect } from "react";

const FONTS = [
  { name: "Geist Sans", value: "var(--font-geist-sans)", google: false },
  { name: "Inter", value: "Inter", google: true },
  { name: "Roboto", value: "Roboto", google: true },
  { name: "Open Sans", value: "Open Sans", google: true },
  { name: "Lato", value: "Lato", google: true },
  { name: "Poppins", value: "Poppins", google: true },
  { name: "Playfair Display", value: "Playfair Display", google: true },
  { name: "Merriweather", value: "Merriweather", google: true },
];

export default function TypographyPage() {
  const [selectedFont, setSelectedFont] = useState(FONTS[0]!);

  useEffect(() => {
    if (!selectedFont.google) {
      document.body.style.removeProperty("--font-geist-sans");
      return;
    }

    const id = `google-font-${selectedFont.value.replace(/\s/g, "-")}`;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(selectedFont.value)}:wght@300;400;500;600;700&display=swap`;
      document.head.appendChild(link);
    }

    document.body.style.setProperty(
      "--font-geist-sans",
      `"${selectedFont.value}", sans-serif`
    );
  }, [selectedFont]);

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Typography</h1>
        <p className="text-muted-foreground">
          Font scales, weights, and text styling conventions.
        </p>
      </div>

      <section className="space-y-6 rounded-lg border border-border p-6">
        <div className="flex items-center justify-between">
          <label htmlFor="font-select" className="text-sm font-medium">
            Font Family
          </label>
          <select
            id="font-select"
            value={selectedFont.name}
            onChange={(e) =>
              setSelectedFont(FONTS.find((f) => f.name === e.target.value)!)
            }
            className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {FONTS.map((font) => (
              <option key={font.name} value={font.name}>
                {font.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Headings</h2>
        <div className="space-y-4 rounded-lg border border-border p-6">
          <h1 className="text-4xl font-bold tracking-tight">Heading 1</h1>
          <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
          <h3 className="text-2xl font-semibold tracking-tight">Heading 3</h3>
          <h4 className="text-xl font-semibold tracking-tight">Heading 4</h4>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Body text</h2>
        <div className="space-y-4 rounded-lg border border-border p-6">
          <p className="text-lg">
            Large — Used for lead paragraphs and introductions.
          </p>
          <p className="text-base">
            Base — The default body text size for general content.
          </p>
          <p className="text-sm text-muted-foreground">
            Small / Muted — Used for supporting text and captions.
          </p>
          <p className="font-mono text-sm">
            Monospace — Used for code snippets and technical content.
          </p>
        </div>
      </section>
    </div>
  );
}
