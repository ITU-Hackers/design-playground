"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const centerNavItems = [
  { label: "Style", href: "/style" },
  { label: "Colors", href: "/colors" },
  { label: "Fonts", href: "/fonts" },
];

const exampleItems = [
  { label: "Portfolio", href: "/example/portfolio" },
  { label: "Documentation", href: "/example/docs" },
  { label: "Landing Page", href: "/example/landing" },
];

export function Navbar() {
  const pathname = usePathname();

  const outlineLink = (href: string, label: string) => (
    <Button key={href} asChild variant="outline" size="lg" className="text-lg w-18" data-active={pathname === href}>
      <Link href={href}>{label}</Link>
    </Button>
  );

  const isExampleActive = exampleItems.some((item) => pathname === item.href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/40">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="lg" className="text-lg" data-active={isExampleActive}>
                Examples <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {exampleItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
