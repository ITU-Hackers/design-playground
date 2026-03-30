"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const centerNavItems = [
  { label: "Style", href: "/style" },
  { label: "Colors", href: "/colors" },
  { label: "Typography", href: "/typography" },
];

export function Navbar() {
  const pathname = usePathname();

  const outlineLink = (href: string, label: string) => (
    <Button key={href} asChild variant="outline" size="lg" className="text-lg" data-active={pathname === href}>
      <Link href={href}>{label}</Link>
    </Button>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="grid h-14 grid-cols-3 items-center px-6">
        <div className="flex items-center">
          <Button asChild variant="default" size="lg" className="text-lg">
            <Link href="/">Design Playground</Link>
          </Button>
        </div>
        <div className="flex items-center justify-center space-x-2">
          {centerNavItems.map((item) => outlineLink(item.href, item.label))}
        </div>
        <nav className="flex items-center justify-end">
          {outlineLink("/example", "Example")}
        </nav>
      </div>
    </header>
  );
}
