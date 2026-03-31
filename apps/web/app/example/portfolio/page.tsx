import { Button } from "@/components/ui/button";
import { PageFooter } from "@/components/page-footer";

const projects = [
  {
    title: "Horizon Dashboard",
    category: "Web App",
    description:
      "A real-time analytics dashboard built with React and D3. Handles millions of data points with smooth 60fps rendering.",
    tags: ["React", "TypeScript", "D3"],
  },
  {
    title: "Marble Design System",
    category: "Design Systems",
    description:
      "A comprehensive component library used across 12 products. Includes 80+ components, Figma tokens, and full accessibility coverage.",
    tags: ["Design Systems", "Storybook", "Figma"],
  },
  {
    title: "Pulse Mobile",
    category: "Mobile",
    description:
      "Cross-platform health tracking app with 200k+ downloads. Featured in App Store's Apps We Love collection.",
    tags: ["React Native", "GraphQL", "HealthKit"],
  },
  {
    title: "Folio CMS",
    category: "Full Stack",
    description:
      "Headless CMS with a visual page builder. Powers over 500 marketing sites with sub-second page loads.",
    tags: ["Next.js", "PostgreSQL", "Cloudflare"],
  },
];

const skills = [
  { group: "Frontend", items: ["React", "TypeScript", "Next.js", "CSS / Tailwind"] },
  { group: "Backend", items: ["Node.js", "PostgreSQL", "GraphQL", "Redis"] },
  { group: "Tooling", items: ["Figma", "Storybook", "Turborepo", "Vercel"] },
];

export default function PortfolioPage() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="space-y-6 pt-10">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Available for freelance
        </p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Hi, I'm ITU Hacker.
          <br />
          <span className="text-primary">I build for the web.</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Full-stack engineer with 8 years of experience crafting products that
          people actually enjoy using. I care deeply about performance,
          accessibility, and the details that make the difference.
        </p>
        <div className="flex gap-3 pt-2">
          <Button size="lg">View My Work</Button>
          <Button size="lg" variant="outline">Get in Touch</Button>
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-8">
        <h2 className="font-bold tracking-tight">Selected Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group flex flex-col rounded-lg border border-border bg-card text-card-foreground p-6 transition-colors hover:border-primary/40 hover:bg-accent/30"
            >
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-primary">
                {project.category}
              </p>
              <h3 className="mb-2 font-semibold">{project.title}</h3>
              <p className="flex-1 text-sm text-muted-foreground">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-8">
        <h2 className="font-bold tracking-tight">Skills & Tools</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {skills.map((group) => (
            <div key={group.group} className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {group.group}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="rounded-lg bg-primary px-8 py-12 text-primary-foreground">
        <div className="mx-auto max-w-xl space-y-4 text-center">
          <h2 className="font-bold tracking-tight">Let's build something together</h2>
          <p className="text-primary-foreground/80">
            I'm currently open to new projects and full-time roles. If you have
            something interesting in mind, I'd love to hear about it.
          </p>
          <Button size="lg" variant="secondary">
            Say Hello
          </Button>
        </div>
      </section>

      <PageFooter
        name="ITU Hacker"
        links={["GitHub", "LinkedIn", "Dribbble", "Twitter"]}
        copyright="© 2026"
      />
    </div>
  );
}
