import { cn } from "@/lib/utils";

interface CtaBannerProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function CtaBanner({
  title,
  description,
  children,
  className,
}: CtaBannerProps) {
  return (
    <section
      className={cn(
        "rounded-lg border border-primary/40 bg-accent px-8 py-12 text-center text-accent-foreground",
        className
      )}
    >
      <h2 className="font-bold tracking-tight">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-accent-foreground/80">
        {description}
      </p>
      <div className="mt-6 flex justify-center gap-3">{children}</div>
    </section>
  );
}
