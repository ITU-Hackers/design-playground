"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Example", href: "/example" },
  { label: "Style", href: "/style" },
  { label: "Colors", href: "/colors" },
  { label: "Typography", href: "/typography" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center px-6">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <span className="rounded-md bg-primary px-3 py-1 text-lg font-bold tracking-tight text-primary-foreground">Design Playground</span>
        </Link>
        <nav className="flex items-center space-x-6 text-base font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
