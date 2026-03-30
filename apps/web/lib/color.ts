export const DEFAULT_COLORS: Record<string, string> = {
  background: "0 0% 100%",
  foreground: "233 32.9% 31.6%",
  card: "220 100.0% 97.1%",
  "card-foreground": "233 32.9% 31.6%",
  primary: "233 32.9% 31.6%",
  "primary-foreground": "0 0% 100%",
  secondary: "220 100.0% 97.1%",
  "secondary-foreground": "233 32.9% 31.6%",
  muted: "220 100.0% 97.1%",
  "muted-foreground": "230 40.5% 29.0%",
  accent: "220 100.0% 97.1%",
  "accent-foreground": "233 32.9% 31.6%",
  destructive: "0 68.4% 61.6%",
  "destructive-foreground": "0 0% 100%",
  border: "200 48.6% 85.5%",
  input: "198 52.6% 92.5%",
  ring: "233 32.9% 31.6%",
};

export const COLOR_TOKENS = Object.keys(DEFAULT_COLORS);

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
    if (key in DEFAULT_COLORS) {
      result[key] = val.startsWith("#") ? hexToHslString(val) : val;
    }
  }
  return result;
}
