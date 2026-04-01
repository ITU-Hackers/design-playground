import { cn } from "@/lib/utils";

export function Table({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border bg-card", className)}>
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

export function TableHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <thead className="border-b border-border bg-muted">{children}</thead>
  );
}

export function TableBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return <tbody className="divide-y divide-border">{children}</tbody>;
}

export function TableRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tr className={cn("hover:bg-muted/40", className)}>{children}</tr>
  );
}

export function TableHead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th className={cn("px-4 py-3 text-left font-semibold", className)}>
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("px-4 py-3", className)}>{children}</td>
  );
}
