import { PageFooter } from "@/components/page-footer";
import { Panel } from "@/components/ui/panel";
import Link from "next/link";

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
    title: "Fonts",
    description: "Font scales, weights, and text styling conventions.",
    href: "/fonts",
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="space-y-4 pt-8">
        <h1 className="font-bold tracking-tight">Design Playground</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          A live design playground; explore styles, colors, and fonts.
        </p>
      </section>

      <Panel className="space-y-6">
        <section className="space-y-4">
          <h2 className="font-semibold tracking-tight">Live Tweaks</h2>
          <p className="text-muted-foreground">
            Make design adjustements and see them reflected across the site in real time.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-lg border border-border bg-card text-card-foreground p-6 transition-colors hover:border-foreground/20 hover:bg-accent"
            >
              <h2 className="mb-2 text-lg font-semibold tracking-tight">
                {section.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {section.description}
              </p>
            </Link>
          ))}
        </section>
      </Panel>

      <Panel className="space-y-6">
        <section className="space-y-4">
          <h2 className="font-semibold tracking-tight">Examples</h2>
          <p className="text-muted-foreground">
            See your design choices come together on these example pages.
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Landing",
              description: "A marketing landing page with hero, features, and call-to-action sections.",
              href: "/example/landing",
            },
            {
              title: "Portfolio",
              description: "A personal portfolio page showcasing projects and work history.",
              href: "/example/portfolio",
            },
            {
              title: "Docs",
              description: "A documentation layout with sidebar navigation and content sections.",
              href: "/example/docs",
            },
          ].map((example) => (
            <Link
              key={example.href}
              href={example.href}
              className="group rounded-lg border border-border bg-card text-card-foreground p-6 transition-colors hover:border-foreground/20 hover:bg-accent"
            >
              <h2 className="mb-2 text-lg font-semibold tracking-tight">
                {example.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {example.description}
              </p>
            </Link>
          ))}
        </section>
      </Panel>
    </div>
  );
}
