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

  const centerLink = (href: string, label: string) => {
    const isActive = pathname === href;
    return (
      <Button
        key={href}
        asChild
        variant="secondary"
        size="lg"
        className={`text-lg${isActive ? " ring-2 ring-secondary-foreground" : ""}`}
      >
        <Link href={href}>{label}</Link>
      </Button>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="grid h-14 grid-cols-3 items-center px-3 my-1">
        <div className="flex items-center">
          <Button asChild variant="default" size="lg" className={`text-lg${pathname === "/" ? " ring-2 ring-primary-foreground" : ""}`}>
            <Link className="text-xl font-bold" href="/">Design Playground</Link>
          </Button>
        </div>
        <div className="flex items-center justify-center space-x-2">
          {centerNavItems.map((item) => centerLink(item.href, item.label))}
        </div>
        <nav className="flex items-center justify-end">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" className={`text-lg${pathname.startsWith("/example") ? " ring-2 ring-foreground" : ""}`}>
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
