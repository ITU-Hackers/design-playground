# ITU Hackers Design Playground

A live design playground for **ITU Hackers** to define and preview a shared visual identity before hackathon projects. Tweak border radius, colors, and fonts in real time, then see how they look on a realistic example page.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [pnpm](https://pnpm.io/) v9

## Setup

```sh
# Clone the repo
git clone <repo-url>
cd style-guide

# Install dependencies
pnpm install
```

## Running locally

```sh
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Building for production

```sh
pnpm build
```

## Project structure

```
apps/
  web/          # Next.js app (the design playground)
packages/
  eslint-config/        # Shared ESLint config
  typescript-config/    # Shared TypeScript config
```
