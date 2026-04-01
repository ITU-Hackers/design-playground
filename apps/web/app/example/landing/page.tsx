import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageFooter } from "@/components/page-footer";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { CtaBanner } from "@/components/ui/cta-banner";
import { PageHeader } from "@/components/ui/page-header";

const features = [
  {
    title: "Lightning Fast",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Secure by Default",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "Scalable Infrastructure",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

const stats = [
  { value: "99.9%", label: "Uptime" },
  { value: "2.4M", label: "Users" },
  { value: "<50ms", label: "Latency" },
  { value: "24/7", label: "Support" },
];

const testimonials = [
  {
    quote:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    name: "Jane Cooper",
    role: "CTO, ITU-Hackers Corp",
  },
  {
    quote:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    name: "Marcus Chen",
    role: "Lead Engineer, Globex",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$9",
    description: "Perfect for individuals and small projects.",
    features: ["5 projects", "10GB storage", "Email support", "Basic analytics"],
  },
  {
    name: "Pro",
    price: "$29",
    description: "For growing teams that need more power.",
    features: [
      "Unlimited projects",
      "100GB storage",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For organizations with advanced needs.",
    features: [
      "Unlimited everything",
      "1TB storage",
      "Dedicated support",
      "Custom SLA",
      "SSO & audit logs",
    ],
  },
];

export default function ExamplePage() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="space-y-6 pt-10 text-center">
        <Badge size="md">Introducing ITU-Hackers Platform</Badge>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Build something{" "}
          <span className="text-primary">extraordinary</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          scelerisque aliquam odio et faucibus. Nulla rhoncus feugiat eros quis
          consectetur.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="secondary">
            Learn More
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((stat) => (
          <Panel key={stat.label} className="text-center">
            <h3 className="font-bold tracking-tight">{stat.value}</h3>
            <h4 className="mt-1 text-sm text-muted-foreground">{stat.label}</h4>
          </Panel>
        ))}
      </section>

      {/* Features */}
      <section className="space-y-8">
        <PageHeader
          as="h2"
          centered
          title="Everything you need"
          description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur."
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <Panel key={feature.title}>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Panel>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <CtaBanner
        title="Ready to get started?"
        description="Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur."
      >
        <Button size="lg" variant="default">
          Start Free Trial
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="bg-transparent border-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/10 hover:text-accent-foreground"
        >
          Contact Sales
        </Button>
      </CtaBanner>

      {/* Testimonials */}
      <section className="space-y-8">
        <PageHeader
          as="h2"
          centered
          title="Trusted by teams everywhere"
          description="Hear what our customers have to say."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <Panel key={t.name}>
              <blockquote>
                <p className="italic text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </footer>
              </blockquote>
            </Panel>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="space-y-8">
        <PageHeader
          as="h2"
          centered
          title="Simple, transparent pricing"
          description="No hidden fees. Cancel anytime."
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <Panel
              key={plan.name}
              className={`flex flex-col ${
                plan.highlighted
                  ? "border-primary bg-accent text-accent-foreground"
                  : ""
              }`}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>
              <p className="mt-4 text-4xl font-bold tracking-tight">
                {plan.price}
                <span className="text-base font-normal text-muted-foreground">
                  /mo
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-primary">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6 w-full"
                variant={plan.highlighted ? "default" : "outline"}
              >
                Choose {plan.name}
              </Button>
            </Panel>
          ))}
        </div>
      </section>

      {/* Newsletter / Form */}
      <Panel className="p-8">
        <div className="mx-auto max-w-md space-y-4 text-center">
          <h2 className="font-bold tracking-tight">Stay updated</h2>
          <p className="text-sm text-muted-foreground">
            Subscribe to our newsletter for the latest updates and insights.
          </p>
          <div className="flex gap-2">
            <Input type="email" placeholder="you@example.com" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </Panel>

      <PageFooter
        name="ITU-Hackers Inc."
        links={["About", "Blog", "Careers", "Contact"]}
        copyright="© 2026 ITU-Hackers Inc. All rights reserved."
      />
    </div>
  );
}
