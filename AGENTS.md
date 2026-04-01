# Project context

## What this project is

A live design playground for the **ITU Hackers** team to define, preview, and iterate upon UI design for hackathon projects. Users tweak colors, fonts, border radius, and backgrounds in real time, and see those changes reflected instantly across realistic example pages (landing, portfolio, docs).

## Important commands

- Install: `pnpm install` (from repo root)
- Run: `pnpm dev`
- Build: `pnpm build`
- Lint/format/type-check: `pnpm lint` / `pnpm format` / `pnpm check-types`

> Always run commands from the repo root (pnpm workspaces + Turbo), not from within `apps/web/`.

## Architecture

```
design-playground/
├── apps/web/
│   ├── app/                    # Next.js App Router pages
│   │   └── example/            # landing / portfolio / docs preview pages
│   ├── components/
│   │   ├── ui/                 # shadcn/ui-pattern design-system components
│   │   └── *.tsx               # Feature components (Navbar, StyleProvider, etc.)
│   └── lib/                    # Utilities, constants, hooks
├── packages/                   # Shared eslint-config + typescript-config
└── assets/                     # Wallpaper presets, fonts, color scheme presets
```

**Stack:** Next.js 16 + React 19 (App Router), Tailwind CSS 3, shadcn/ui (Radix UI + CVA + `cn()`). Add `"use client"` only where interactivity or browser APIs are required.

## Components and the style system

**Always use components from `components/ui/`** rather than raw HTML. Raw HTML bypasses the CSS variable system and won't respond to user style selections.

The entire visual design is driven by **CSS custom properties on `:root`** (see `app/globals.css`), applied by `StyleProvider` (`components/style-provider.tsx`). Tailwind tokens like `bg-primary`, `text-foreground`, and `rounded-lg` all resolve through these variables.

- **Never hardcode colors, font families, or border radii.** Use semantic Tailwind tokens so user selections apply automatically.
- `StyleProvider` is the single source of truth for style application — do not create parallel mechanisms. Style changes propagate via the `"style-change"` custom event; dispatch that if you need to trigger an update outside the existing pages.
- Storage keys live in `lib/constants.ts`. Color values are HSL component strings (e.g. `"233 32.9% 31.6%"`); maintain this format.

## Adding new components

Follow the shadcn/ui pattern: Radix UI primitive + CVA variants + `cn()`. A `components.json` is present in `apps/web/` — use `npx shadcn add <component>` from that directory to scaffold via the CLI.

## Keeping this file up to date

Update `AGENTS.md` when the project changes meaningfully — new pages, libraries, conventions, or style system changes. Only record things an agent couldn't reliably infer from reading the code. If a trade-off was made, leave a short note explaining why.
