interface PageFooterProps {
  name: string;
  links?: string[];
  copyright?: string;
  variant?: "default" | "card";
  meta?: string;
}

export function PageFooter({
  name,
  links,
  copyright,
  variant = "default",
  meta,
}: PageFooterProps) {
  if (variant === "card") {
    return (
      <footer className="rounded-lg border border-border bg-card text-card-foreground p-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>{name}</p>
          {meta && <p className="font-mono text-xs">{meta}</p>}
        </div>
      </footer>
    );
  }

  return (
    <footer className="rounded-lg border border-border bg-card text-card-foreground p-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm font-semibold">{name}</p>
        {links && links.length > 0 && (
          <nav className="flex gap-6 text-sm text-muted-foreground">
            {links.map((link) => (
              <span key={link} className="cursor-pointer hover:text-foreground">
                {link}
              </span>
            ))}
          </nav>
        )}
        {copyright && (
          <p className="text-xs text-muted-foreground">{copyright}</p>
        )}
      </div>
    </footer>
  );
}
