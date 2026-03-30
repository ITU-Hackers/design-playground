import { Button } from "@/components/ui/button";
import { PageFooter } from "@/components/page-footer";

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
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Introducing ITU-Hackers Platform
        </p>
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
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-card text-card-foreground p-6 text-center"
          >
            <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Everything you need
          </h2>
          <p className="mt-2 text-muted-foreground">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-border bg-card text-card-foreground p-6"
            >
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="rounded-lg bg-primary px-8 py-12 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to get started?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
          quam nihil molestiae consequatur.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button
            size="lg"
            variant="secondary"
          >
            Start Free Trial
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            Contact Sales
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Trusted by teams everywhere
          </h2>
          <p className="mt-2 text-muted-foreground">
            Hear what our customers have to say.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-lg border border-border bg-card text-card-foreground p-6"
            >
              <p className="italic text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-2 text-muted-foreground">
            No hidden fees. Cancel anytime.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-lg border p-6 ${
                plan.highlighted
                  ? "border-primary bg-accent text-accent-foreground"
                  : "border-border bg-card text-card-foreground"
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
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / Form */}
      <section className="rounded-lg border border-border bg-card text-card-foreground p-8">
        <div className="mx-auto max-w-md space-y-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Stay updated</h2>
          <p className="text-sm text-muted-foreground">
            Subscribe to our newsletter for the latest updates and insights.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <Button>Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>

      <PageFooter
        name="ITU-Hackers Inc."
        links={["About", "Blog", "Careers", "Contact"]}
        copyright="© 2026 ITU-Hackers Inc. All rights reserved."
      />
    </div>
  );
}
