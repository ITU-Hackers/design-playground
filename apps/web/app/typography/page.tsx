"use client";

import { useState, useEffect } from "react";

const HEADING_FONTS = [
  { name: "Geist Sans", value: "var(--font-geist-sans)", google: false },
  { name: "Inter", value: "Inter", google: true },
  { name: "Poppins", value: "Poppins", google: true },
  { name: "Playfair Display", value: "Playfair Display", google: true },
  { name: "Merriweather", value: "Merriweather", google: true },
  { name: "Lora", value: "Lora", google: true },
  { name: "DM Serif Display", value: "DM Serif Display", google: true },
];

const BODY_FONTS = [
  { name: "Geist Sans", value: "var(--font-geist-sans)", google: false },
  { name: "Inter", value: "Inter", google: true },
  { name: "Roboto", value: "Roboto", google: true },
  { name: "Open Sans", value: "Open Sans", google: true },
  { name: "Lato", value: "Lato", google: true },
  { name: "Poppins", value: "Poppins", google: true },
  { name: "Nunito", value: "Nunito", google: true },
];

const MONO_FONTS = [
  { name: "Geist Mono", value: "var(--font-geist-mono)", google: false },
  { name: "Fira Code", value: "Fira Code", google: true },
  { name: "JetBrains Mono", value: "JetBrains Mono", google: true },
  { name: "Source Code Pro", value: "Source Code Pro", google: true },
  { name: "Inconsolata", value: "Inconsolata", google: true },
  { name: "IBM Plex Mono", value: "IBM Plex Mono", google: true },
];

const STORAGE_KEY = "design-playground:fonts";

function loadGoogleFont(value: string) {
  const id = `google-font-${value.replace(/\s/g, "-")}`;
  if (!document.getElementById(id)) {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(value)}:wght@300;400;500;600;700&display=swap`;
    document.head.appendChild(link);
  }
}

function FontSelect({
  id,
  label,
  fonts,
  selected,
  onChange,
}: {
  id: string;
  label: string;
  fonts: typeof HEADING_FONTS;
  selected: (typeof HEADING_FONTS)[number];
  onChange: (font: (typeof HEADING_FONTS)[number]) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        value={selected.name}
        onChange={(e) => onChange(fonts.find((f) => f.name === e.target.value)!)}
        className="w-52 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {fonts.map((font) => (
          <option key={font.name} value={font.name}>
            {font.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function FontsPage() {
  const [headingFont, setHeadingFont] = useState(HEADING_FONTS[0]!);
  const [bodyFont, setBodyFont] = useState(BODY_FONTS[0]!);
  const [monoFont, setMonoFont] = useState(MONO_FONTS[0]!);

  // Load persisted font selections
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { heading, body, mono } = JSON.parse(saved);
        const h = HEADING_FONTS.find((f) => f.name === heading);
        const b = BODY_FONTS.find((f) => f.name === body);
        const m = MONO_FONTS.find((f) => f.name === mono);
        if (h) setHeadingFont(h);
        if (b) setBodyFont(b);
        if (m) setMonoFont(m);
      }
    } catch {
      // ignore
    }
  }, []);

  // Apply heading font
  useEffect(() => {
    if (headingFont.google) {
      loadGoogleFont(headingFont.value);
      document.documentElement.style.setProperty(
        "--font-heading",
        `"${headingFont.value}", serif`
      );
    } else {
      document.documentElement.style.setProperty(
        "--font-heading",
        headingFont.value
      );
    }
    persist();
  }, [headingFont]);

  // Apply body font
  useEffect(() => {
    if (bodyFont.google) {
      loadGoogleFont(bodyFont.value);
      document.body.style.setProperty(
        "--font-geist-sans",
        `"${bodyFont.value}", sans-serif`
      );
    } else {
      document.body.style.removeProperty("--font-geist-sans");
    }
    persist();
  }, [bodyFont]);

  // Apply mono font
  useEffect(() => {
    if (monoFont.google) {
      loadGoogleFont(monoFont.value);
      document.body.style.setProperty(
        "--font-geist-mono",
        `"${monoFont.value}", monospace`
      );
    } else {
      document.body.style.removeProperty("--font-geist-mono");
    }
    persist();
  }, [monoFont]);

  function persist() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        heading: headingFont.name,
        body: bodyFont.name,
        mono: monoFont.name,
      })
    );
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Fonts</h1>
        <blockquote className="text-muted-foreground">
          Font scales, weights, and text styling conventions.
        </blockquote>
      </div>

      <section className="space-y-4 rounded-lg border border-border p-6">
        <FontSelect
          id="heading-font"
          label="Heading Font"
          fonts={HEADING_FONTS}
          selected={headingFont}
          onChange={setHeadingFont}
        />
        <FontSelect
          id="body-font"
          label="Body Font"
          fonts={BODY_FONTS}
          selected={bodyFont}
          onChange={setBodyFont}
        />
        <FontSelect
          id="mono-font"
          label="Monospace Font"
          fonts={MONO_FONTS}
          selected={monoFont}
          onChange={setMonoFont}
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Headings</h2>
        <div className="space-y-4 rounded-lg border border-border p-6 font-heading">
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
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Monospace</h2>
        <div className="space-y-4 rounded-lg border border-border p-6">
          <p className="font-mono text-sm">
            const greeting = &quot;Hello, world!&quot;;
          </p>
          <p className="font-mono text-sm">
            function add(a: number, b: number): number &#123; return a + b; &#125;
          </p>
        </div>
      </section>
    </div>
  );
}
