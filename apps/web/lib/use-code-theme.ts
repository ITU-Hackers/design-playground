import { useState, useEffect } from "react";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

function getCardLightness(): number {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--card")
    .trim();
  // Format: "H S% L%" e.g. "220 100.0% 97.1%"
  const parts = value.split(/\s+/);
  const l = parseFloat(parts[2] ?? "0");
  return l;
}

export function useCodeTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    function update() {
      setIsDark(getCardLightness() < 50);
    }
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    return () => observer.disconnect();
  }, []);

  return isDark ? oneDark : oneLight;
}
