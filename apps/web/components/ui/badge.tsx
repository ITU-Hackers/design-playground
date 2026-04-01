import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("font-medium", {
  variants: {
    variant: {
      label: "uppercase tracking-widest text-primary",
      outline:
        "rounded-md border border-border px-2 py-0.5 text-muted-foreground",
      method: "font-mono font-semibold",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
    },
  },
  defaultVariants: {
    variant: "label",
    size: "sm",
  },
});

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, variant, size, className }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {children}
    </span>
  );
}
