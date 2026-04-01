"use client";

import { CodeBlock } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import { PageFooter } from "@/components/page-footer";
import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

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
        <Panel className="space-y-4">
          <Badge variant="method" className="text-primary">v2.4.1 — stable</Badge>
          <h1 className="font-bold tracking-tight">ITU-Hackers SDK</h1>
          <p className="text-lg text-muted-foreground">
            A type-safe, batteries-included SDK for the ITU-Hackers Data Platform.
            Works in Node.js, Deno, and the browser.
          </p>
          <div className="flex gap-3">
            <Button>Get Started</Button>
            <Button variant="outline">View on GitHub</Button>
          </div>
        </Panel>

        {/* Sections */}
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="space-y-4">
            <PageHeader as="h2" title={section.title} description={section.content} />
            <CodeBlock language={section.language} bordered>
              {section.code}
            </CodeBlock>
          </section>
        ))}

        {/* API Reference */}
        <section id="api-reference" className="space-y-6">
          <PageHeader
            as="h2"
            title="API Reference"
            description={<>Base URL: <code className="font-mono text-sm">https://api.ituhackers.dev</code></>}
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpoints.map((ep) => (
                <TableRow key={`${ep.method}-${ep.path}`}>
                  <TableCell>
                    <Badge variant="method" className={methodColors[ep.method]}>
                      {ep.method}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <code className="font-mono text-xs">{ep.path}</code>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {ep.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
