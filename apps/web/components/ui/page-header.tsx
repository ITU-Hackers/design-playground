import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  centered?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  description,
  as: Heading = "h1",
  centered = false,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-2", centered && "text-center", className)}>
      <Heading className="font-bold tracking-tight">{title}</Heading>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
