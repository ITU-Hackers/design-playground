"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

function setVar(name: string, value: string) {
  document.documentElement.style.setProperty(name, value);
}

export default function StylePage() {
  const [radius, setRadius] = useState(0.5);

  useEffect(() => {
    setVar("--radius", `${radius}rem`);
  }, [radius]);

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Style</h1>
        <p className="text-muted-foreground">
          Adjust design tokens and see the entire app update in real time.
        </p>
      </div>

      {/* Controls */}
      <section className="space-y-6 rounded-lg border border-border p-6">
        <h2 className="text-xl font-semibold">Controls</h2>

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
            onChange={(e) => setRadius(parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Sharp</span>
            <span>Rounded</span>
          </div>
        </div>

      </section>

      {/* Preview */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Preview</h2>

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
            {["Primary", "Secondary", "Outline"].map((label) => (
              <div
                key={label}
                className="rounded-lg border border-border bg-card p-4"
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
      </section>
    </div>
  );
}
