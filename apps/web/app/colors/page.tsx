const tokens = [
  { name: "background", variable: "--background" },
  { name: "foreground", variable: "--foreground" },
  { name: "primary", variable: "--primary" },
  { name: "primary-foreground", variable: "--primary-foreground" },
  { name: "secondary", variable: "--secondary" },
  { name: "secondary-foreground", variable: "--secondary-foreground" },
  { name: "muted", variable: "--muted" },
  { name: "muted-foreground", variable: "--muted-foreground" },
  { name: "accent", variable: "--accent" },
  { name: "accent-foreground", variable: "--accent-foreground" },
  { name: "destructive", variable: "--destructive" },
  { name: "border", variable: "--border" },
];

export default function ColorsPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Colors</h1>
        <p className="text-muted-foreground">
          Semantic color tokens used throughout the design system.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.map((token) => (
          <div
            key={token.name}
            className="flex items-center gap-3 rounded-lg border border-border p-3"
          >
            <div
              className="h-10 w-10 shrink-0 rounded-md border border-border"
              style={{ backgroundColor: `hsl(var(${token.variable}))` }}
            />
            <div>
              <p className="text-sm font-medium">{token.name}</p>
              <p className="font-mono text-xs text-muted-foreground">
                {token.variable}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
