"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useCodeTheme } from "@/lib/use-code-theme";

interface CodeBlockProps {
  language: string;
  children: string;
  fontFamily?: string;
  bordered?: boolean;
}

export function CodeBlock({
  language,
  children,
  fontFamily = "var(--font-mono)",
  bordered = false,
}: CodeBlockProps) {
  const codeTheme = useCodeTheme();
  return (
    <SyntaxHighlighter
      language={language}
      style={{
        ...codeTheme,
        'code[class*="language-"]': {
          ...codeTheme['code[class*="language-"]'],
          background: "transparent",
          fontFamily,
        },
      }}
      customStyle={{
        margin: 0,
        fontSize: "0.875rem",
        fontFamily,
        background: "hsl(var(--card))",
        ...(bordered
          ? { borderRadius: "0.5rem", border: "1px solid hsl(var(--border))" }
          : { padding: 0 }),
      }}
    >
      {children}
    </SyntaxHighlighter>
  );
}
