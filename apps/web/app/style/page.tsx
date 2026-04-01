"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Panel } from "@/components/ui/panel";

const BG_PRESETS = [
  { label: "None", value: "" },
  {
    label: "Gradient",
    value: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--primary) / 0.15) 100%)",
  },
  {
    label: "Mesh",
    value: [
      "radial-gradient(at 20% 30%, hsl(var(--primary) / 0.2) 0px, transparent 60%)",
      "radial-gradient(at 80% 10%, hsl(var(--muted-foreground) / 0.15) 0px, transparent 50%)",
      "radial-gradient(at 10% 75%, hsl(var(--primary) / 0.12) 0px, transparent 55%)",
      "radial-gradient(at 85% 80%, hsl(var(--muted-foreground) / 0.1) 0px, transparent 50%)",
    ].join(", "),
  },
  {
    label: "Dots",
    value: "radial-gradient(circle, hsl(var(--foreground) / 0.25) 1px, transparent 1px)",
  },
];

function dispatch(key: string, value: string) {
  window.dispatchEvent(new CustomEvent("style-change", { detail: { key, value } }));
}

export default function StylePage() {
  const [radius, setRadius] = useState(0.5);
  const [bgUrl, setBgUrl] = useState("");
  const [bgInput, setBgInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRadius(parseFloat(localStorage.getItem("style:radius") ?? "0.5"));
    setBgUrl(localStorage.getItem("style:bg") ?? "");
  }, []);

  function updateRadius(value: number) {
    setRadius(value);
    dispatch("style:radius", String(value));
  }

  function updateBg(value: string) {
    setBgUrl(value);
    setBgInput("");
    dispatch("style:bg", value);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      updateBg(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-10">
      <PageHeader
        title="Style"
        description="Play with the design controls and see the entire app update in real time."
      />

      {/* Controls */}
      <Panel className="space-y-6">
        <h2 className="font-semibold">Controls</h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="radius" className="text-sm font-medium">
              Border Radius
            </label>
            <span className="font-mono text-sm text-muted-foreground">
              {radius.toFixed(2)}rem
            </span>
          </div>
          <input
            id="radius"
            type="range"
            min="0"
            max="1.5"
            step="0.05"
            value={radius}
            onChange={(e) => updateRadius(parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Sharp</span>
            <span>Rounded</span>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Background Presets</label>

          {/* Presets */}
          <div className="flex flex-wrap gap-2">
            {BG_PRESETS.map((preset) => {
              const active = bgUrl === preset.value;
              return (
                <Button
                  key={preset.label}
                  variant="outline"
                  size="sm"
                  onClick={() => updateBg(preset.value)}
                  className={active ? "border-foreground/40 bg-foreground/10 text-foreground" : ""}
                >
                  {preset.label}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-sm font-medium">Background Image</label>

          {/* File picker + URL input */}
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose file
            </Button>
            <input
              type="text"
              value={bgInput}
              onChange={(e) => setBgInput(e.target.value)}
              placeholder="or paste an image URL…"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateBg(bgInput.trim())}
              disabled={!bgInput.trim()}
            >
              Apply
            </Button>
          </div>
        </div>

      </Panel>

      {/* Preview */}
      <Panel className="space-y-6">
        <h2 className="font-semibold">Preview</h2>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Buttons
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Cards</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Cool", "Even Cooler", "Super Cool"].map((label) => (
              <div
                key={label}
                className="rounded-lg border border-border bg-card text-card-foreground p-4"
              >
                <h4 className="mb-1 font-semibold">{label} Card</h4>
                <p className="text-sm text-muted-foreground">
                  A sample card to preview radius and border changes.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Inputs</h3>
          <div className="flex max-w-sm flex-col gap-3">
            <input
              type="text"
              placeholder="Text input"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <textarea
              placeholder="Textarea"
              rows={3}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>
      </Panel>
    </div>
  );
}
