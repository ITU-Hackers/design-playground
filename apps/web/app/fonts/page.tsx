"use client";

import { useState, useEffect, useRef } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";
import { ChevronDown } from "lucide-react";

const HEADING_FONTS = [
  { name: "Geist Sans", value: "var(--font-geist-sans)", google: false },
  { name: "Inter", value: "Inter", google: true },
  { name: "Poppins", value: "Poppins", google: true },
  { name: "Playfair Display", value: "Playfair Display", google: true },
  { name: "Merriweather", value: "Merriweather", google: true },
  { name: "Lora", value: "Lora", google: true },
  { name: "DM Serif Display", value: "DM Serif Display", google: true },
  { name: "IBM Plex Sans", value: "IBM Plex Sans", google: true },
];

const BODY_FONTS = [
  { name: "Geist Sans", value: "var(--font-geist-sans)", google: false },
  { name: "Inter", value: "Inter", google: true },
  { name: "Roboto", value: "Roboto", google: true },
  { name: "Open Sans", value: "Open Sans", google: true },
  { name: "Lato", value: "Lato", google: true },
  { name: "Poppins", value: "Poppins", google: true },
  { name: "Nunito", value: "Nunito", google: true },
  { name: "IBM Plex Sans", value: "IBM Plex Sans", google: true },
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

function fontFamilyStyle(font: { value: string; google: boolean }): string {
  return font.google ? `"${font.value}", sans-serif` : font.value;
}

function FontSelect({
  label,
  fonts,
  selected,
  onChange,
}: {
  label: string;
  fonts: typeof HEADING_FONTS;
  selected: (typeof HEADING_FONTS)[number];
  onChange: (font: (typeof HEADING_FONTS)[number]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{label}</span>
      <div ref={ref} className="relative w-52">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          style={{ fontFamily: fontFamilyStyle(selected) }}
        >
          {selected.name}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
        {open && (
          <div className="absolute z-50 mt-1 w-full rounded-md border border-input bg-background shadow-md">
            {fonts.map((font) => (
              <button
                key={font.name}
                type="button"
                onClick={() => { onChange(font); setOpen(false); }}
                className="flex w-full items-center px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                style={{ fontFamily: fontFamilyStyle(font) }}
              >
                {font.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function FontsPage() {
  const [headingFont, setHeadingFont] = useState(HEADING_FONTS[0]!);
  const [bodyFont, setBodyFont] = useState(BODY_FONTS[0]!);
  const [monoFont, setMonoFont] = useState(MONO_FONTS[0]!);

  // Pre-load all Google fonts for dropdown previews
  useEffect(() => {
    [...HEADING_FONTS, ...BODY_FONTS, ...MONO_FONTS]
      .filter((f) => f.google)
      .forEach((f) => loadGoogleFont(f.value));
  }, []);

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
      const geistSans = getComputedStyle(document.body).getPropertyValue("--font-geist-sans").trim();
      document.documentElement.style.setProperty("--font-heading", geistSans);
    }
    persist();
  }, [headingFont]);

  // Apply body font
  useEffect(() => {
    if (bodyFont.google) {
      loadGoogleFont(bodyFont.value);
      document.documentElement.style.setProperty(
        "--font-body",
        `"${bodyFont.value}", sans-serif`
      );
    } else {
      const geistSans = getComputedStyle(document.body).getPropertyValue("--font-geist-sans").trim();
      document.documentElement.style.setProperty("--font-body", geistSans);
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
      <PageHeader
        title="Fonts"
        description="Tweak the font styles for headings, body text, and monospace elements."
      />

      <Panel className="space-y-4">
        <h2 className="font-semibold">Select Fonts</h2>
        <FontSelect
          label="Heading Font"
          fonts={HEADING_FONTS}
          selected={headingFont}
          onChange={setHeadingFont}
        />
        <FontSelect
          label="Body Font"
          fonts={BODY_FONTS}
          selected={bodyFont}
          onChange={setBodyFont}
        />
        <FontSelect
          label="Monospace Font"
          fonts={MONO_FONTS}
          selected={monoFont}
          onChange={setMonoFont}
        />
      </Panel>

      <Panel>
        <h2 className="font-semibold">Preview Fonts</h2>
        <div className="mt-5 grid grid-cols-3 divide-x divide-border">
          {/* Row 1: Headers */}
          <div className="pb-4 px-6 border-b border-border">
            <h3 className="mt-4 font-semibold tracking-widest text-muted-foreground text-center">Headings</h3>
          </div>
          <div className=" pb-4 px-6 border-b border-border">
            <h3 className=" mt-4 font-semibold tracking-widest text-muted-foreground text-center">Body</h3>
          </div>
          <div className="pb-4 pl-6 border-b border-border">
            <h3 className="mt-4 font-semibold tracking-widest text-muted-foreground text-center">Monospace</h3>
          </div>
          {/* Row 2: Previews */}
          <div className="space-y-4 pt-4 px-6 pb-4">
            <h1 className="font-bold">Heading 1</h1>
            <h2 className="font-semibold">Heading 2</h2>
            <h3 className="font-semibold">Heading 3</h3>
            <h4 className="font-semibold">Heading 4</h4>
          </div>
          <div className="space-y-4 pt-4 px-6 pb-4">
            <p className="text-lg">The quick brown fox jumps over the lazy dog (large)</p>
            <p className="text-base">The quick brown fox jumps over the lazy dog (default)</p>
            <p className="text-sm text-muted-foreground">The quick brown fox jumps over the lazy dog (small/muted)</p>
          </div>
          <div className="space-y-4 pt-4 pl-6 pb-4">
           <pre className="font-mono text-sm">{
`import sys

def hello_world(print):
    if print != "print":
        sys.exit(1)
    print("Hello, World!")`
            }</pre>
            <p className="font-mono text-sm">hello_world("print");</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
