"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { PageFooter } from "@/components/page-footer";

const sections = [
  {
    id: "installation",
    title: "Installation",
    language: "bash",
    content: "Get started by installing the package via your preferred package manager.",
    code: `# npm
npm install @ituhackers/sdk

# pnpm
pnpm add @ituhackers/sdk

# yarn
yarn add @ituhackers/sdk`,
  },
  {
    id: "quick-start",
    title: "Quick Start",
    language: "typescript",
    content: "Initialize the client with your API key and make your first request.",
    code: `import { ITUHackersClient } from "@ituhackers/sdk";

const client = new ITUHackersClient({
  apiKey: process.env.ITU_HACKERS_API_KEY,
  region: "us-east-1",
});

const result = await client.query({
  collection: "users",
  filter: { active: true },
  limit: 10,
});

console.log(result.data);`,
  },
  {
    id: "authentication",
    title: "Authentication",
    language: "bash",
    content: "All API requests must include a valid API key in the Authorization header.",
    code: `curl -X GET https://api.ITU-Hackers.dev/v1/collections \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
  },
  {
    id: "error-handling",
    title: "Error Handling",
    language: "typescript",
    content: "The SDK throws typed errors that you can catch and handle gracefully.",
    code: `import { ITUHackersError, RateLimitError } from "@ituhackers/sdk";

try {
  const data = await client.query({ collection: "events" });
} catch (error) {
  if (error instanceof RateLimitError) {
    console.log(\`Retry after \${error.retryAfter}ms\`);
  } else if (error instanceof ITUHackersError) {
    console.error(\`[\${error.code}] \${error.message}\`);
  }
}`,
  },
];

const endpoints = [
  { method: "GET", path: "/v1/collections", description: "List all collections" },
  { method: "POST", path: "/v1/collections", description: "Create a collection" },
  { method: "GET", path: "/v1/collections/:id", description: "Get a collection by ID" },
  { method: "PATCH", path: "/v1/collections/:id", description: "Update a collection" },
  { method: "DELETE", path: "/v1/collections/:id", description: "Delete a collection" },
  { method: "POST", path: "/v1/query", description: "Query across collections" },
];

const methodColors: Record<string, string> = {
  GET: "text-blue-500",
  POST: "text-green-500",
  PATCH: "text-yellow-500",
  DELETE: "text-red-500",
};

export default function DocsPage() {
  return (
    <div className="flex gap-10">
      {/* Sidebar */}
      <aside className="hidden w-36 shrink-0 sm:block">
        <div className="sticky top-24 space-y-1 rounded-lg bg-background/95 p-3 backdrop-blur">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            On this page
          </p>
          {[...sections, { id: "api-reference", title: "API Reference" }].map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="block rounded py-1 font-mono text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {s.title}
            </a>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1 space-y-16">
        {/* Header */}
        <div className="space-y-4 rounded-lg border border-border bg-card text-card-foreground p-6">
          <p className="font-mono text-sm text-primary">v2.4.1 — stable</p>
          <h1 className="font-bold tracking-tight">ITU-Hackers SDK</h1>
          <p className="text-lg text-muted-foreground">
            A type-safe, batteries-included SDK for the ITU-Hackers Data Platform.
            Works in Node.js, Deno, and the browser.
          </p>
          <div className="flex gap-3">
            <Button>Get Started</Button>
            <Button variant="outline">View on GitHub</Button>
          </div>
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="space-y-4">
            <h2 className="font-bold tracking-tight">{section.title}</h2>
            <p className="text-muted-foreground">{section.content}</p>
            <SyntaxHighlighter
              language={section.language}
              style={oneDark}
              customStyle={{ borderRadius: "0.5rem", fontSize: "0.875rem", margin: 0 }}
            >
              {section.code}
            </SyntaxHighlighter>
          </section>
        ))}

        {/* API Reference */}
        <section id="api-reference" className="space-y-6">
          <h2 className="font-bold tracking-tight">API Reference</h2>
          <p className="text-muted-foreground">
            Base URL: <code className="font-mono text-sm">https://api.ituhackers.dev</code>
          </p>
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Method</th>
                  <th className="px-4 py-3 text-left font-semibold">Endpoint</th>
                  <th className="px-4 py-3 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {endpoints.map((ep) => (
                  <tr key={`${ep.method}-${ep.path}`} className="hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <span className={`font-mono font-semibold ${methodColors[ep.method]}`}>
                        {ep.method}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <code className="font-mono text-xs">{ep.path}</code>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{ep.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <PageFooter
          variant="card"
          name="ITU Hackers SDK Documentation"
          meta="Last updated 2026-03-30"
        />
      </div>
    </div>
  );
}
