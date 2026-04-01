import Link from "next/link";

interface PageFooterProps {
  name: string;
  links?: string[];
  copyright?: string;
  variant?: "default" | "card";
  meta?: string;
  githubUrl?: string;
}

export function PageFooter({
  name,
  links,
  copyright,
  variant = "default",
  meta,
  githubUrl,
}: PageFooterProps) {
  return (
    <footer className="rounded-lg border border-border bg-card text-card-foreground p-6">
      {variant === "card" ? (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>{name}</p>
          {meta && <p className="font-mono text-xs">{meta}</p>}
        </div>
      ) : (
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
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
              aria-label="GitHub repository"
            >
              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>
          )}
        </div>
      )}
    </footer>
  );
}
