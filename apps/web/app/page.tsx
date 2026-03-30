import Link from "next/link";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Style",
    description: "Tweak border radius, borders, and other style properties with live preview.",
    href: "/style",
  },
  {
    title: "Colors",
    description: "Color palette, semantic tokens, and theme variables.",
    href: "/colors",
  },
  {
    title: "Typography",
    description: "Font scales, weights, and text styling conventions.",
    href: "/typography",
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="space-y-4 pt-8">
        <h1 className="text-4xl font-bold tracking-tight">Design Playground</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          A live design playground; explore styles, colors, and fonts.
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group rounded-lg border border-border p-6 transition-colors hover:border-foreground/20 hover:bg-accent"
          >
            <h2 className="mb-2 text-lg font-semibold tracking-tight group-hover:text-foreground">
              {section.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {section.description}
            </p>
          </Link>
        ))}
      </section>

      <section className="space-y-4">
        <p className="text-muted-foreground">
          Once you have tweaked everything to your liking, see it all come
          together on the example page.
        </p>
        <Button asChild>
          <Link href="/example">View example</Link>
        </Button>
      </section>
    </div>
  );
}
