import { cn } from "@/lib/utils";

interface PanelProps {
  children: React.ReactNode;
  className?: string;
}

export function Panel({ children, className }: PanelProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card text-card-foreground p-6", className)}>
      {children}
    </div>
  );
}
