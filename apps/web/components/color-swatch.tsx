"use client";

import { hexToHslString, hslStringToHex } from "@/lib/color";

interface ColorSwatchProps {
  name: string;
  variable: string;
  hslValue: string;
  onChange: (name: string, hsl: string) => void;
}

export function ColorSwatch({ name, variable, hslValue, onChange }: ColorSwatchProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card text-card-foreground p-3">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `hsl(${hslValue})` }}
        />
        <input
          type="color"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          value={hslStringToHex(hslValue)}
          onChange={(e) => onChange(name, hexToHslString(e.target.value))}
          title={`Edit ${name}`}
        />
      </div>
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="font-mono text-xs text-muted-foreground">{variable}</p>
      </div>
    </div>
  );
}
