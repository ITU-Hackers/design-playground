import { Button } from "@/components/ui/button";
import { PageFooter } from "@/components/page-footer";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { CtaBanner } from "@/components/ui/cta-banner";

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
        <Badge size="md">Available for freelance</Badge>
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
          <Button size="lg" variant="secondary">
            Get in Touch
          </Button>
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-8">
        <h2 className="font-bold tracking-tight">Selected Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Panel
              key={project.title}
              className="group flex flex-col transition-colors hover:border-primary/40 hover:bg-accent/30"
            >
              <Badge className="mb-1">{project.category}</Badge>
              <h3 className="mb-2 font-semibold">{project.title}</h3>
              <p className="flex-1 text-sm text-muted-foreground">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </Panel>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-8">
        <h2 className="font-bold tracking-tight">Skills & Tools</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {skills.map((group) => (
            <div key={group.group} className="space-y-3">
              <h3 className="font-semibold uppercase tracking-widest text-muted-foreground">
                {group.group}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-primary font-semibold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <CtaBanner
        title="Let's build something together"
        description="I'm currently open to new projects and full-time roles. If you have something interesting in mind, I'd love to hear about it."
      >
        <Button size="lg" variant="default">
          Say Hello
        </Button>
      </CtaBanner>

      <PageFooter
        name="ITU Hacker"
        links={["GitHub", "LinkedIn", "Dribbble", "Twitter"]}
        copyright="© 2026"
      />
    </div>
  );
}
