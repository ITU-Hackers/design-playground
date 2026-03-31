const DEFAULT_COLORS_LIGHT_HEX = `
background=#ffffff
foreground=#363c6b
card=#f0f5ff
card-foreground=#363c6b
primary=#363c6b
primary-foreground=#ffffff
secondary=#d7e1ff
secondary-foreground=#363c6b
muted=#f0f5ff
muted-foreground=#5a6aaf
accent=#f0f5ff
accent-foreground=#363c6b
destructive=#e05a5a
destructive-foreground=#ffffff
border=#d7e1ff
input=#f0f5ff
ring=#363c6b
`;

const DEFAULT_COLORS_DARK_HEX = `
background=#191d38
foreground=#dde4ff
card=#242951
card-foreground=#dde4ff
primary=#dde4ff
primary-foreground=#191d38
secondary=#363c6b
secondary-foreground=#dde4ff
muted=#242951
muted-foreground=#8892b5
accent=#363c6b
accent-foreground=#dde4ff
destructive=#e05a5a
destructive-foreground=#ffffff
border=#363c6b
input=#2c3260
ring=#dde4ff
`;

export const COLOR_TOKENS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
];

export function hslStringToHex(hsl: string): string {
  const parts = hsl.trim().split(/\s+/);
  if (parts.length !== 3) return "#000000";
  const h = parseFloat(parts[0]!);
  const s = parseFloat(parts[1]!) / 100;
  const l = parseFloat(parts[2]!) / 100;
  if (isNaN(h) || isNaN(s) || isNaN(l)) return "#000000";

  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function hexToHslString(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0 0% 0%";

  const r = parseInt(result[1]!, 16) / 255;
  const g = parseInt(result[2]!, 16) / 255;
  const b = parseInt(result[3]!, 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
}

export function colorsToText(colors: Record<string, string>): string {
  const lines: string[] = [];
  for (const key of COLOR_TOKENS) {
    if (key in colors) {
      lines.push(`${key}=${hslStringToHex(colors[key]!)}`);
    }
  }
  return lines.join("\n") + "\n";
}

export function textToColors(text: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (COLOR_TOKENS.includes(key)) {
      result[key] = val.startsWith("#") ? hexToHslString(val) : val;
    }
  }
  return result;
}

export const DEFAULT_COLORS_LIGHT = textToColors(DEFAULT_COLORS_LIGHT_HEX);
export const DEFAULT_COLORS_DARK = textToColors(DEFAULT_COLORS_DARK_HEX);

/** @deprecated Use DEFAULT_COLORS_LIGHT or DEFAULT_COLORS_DARK */
export const DEFAULT_COLORS = DEFAULT_COLORS_LIGHT;
