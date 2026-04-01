# TODO
- Make background preset options less shit, add controls
- Intelligently render text black or white against background?
- Improve UI and category consistency?
- Autodetect light/dark theme preference
- Shaders?

## Good ideas for Style Controls
- Spacing / Density
    - Spacing scale — a slider that scales padding/gap across the UI (compact → comfortable → spacious). Maps to a CSS custom property used in your components.
- Shadow / Elevation
    - Shadow intensity — slider from flat (0) to heavy drop shadows. Controls --shadow tokens.
    - Shadow style — presets like sharp, soft, layered (neumorphic-ish).
- Border
    Border width — 0 / 1px / 2px toggle or slider. Distinct from radius.
    Border opacity/style — solid vs dashed vs none.
- Motion
    - Animation speed — slider from instant → slow, maps to transition-duration multiplier. 
    - Could also have an "off" preset for reduced-motion preference.
- Backdrop / Surface
    - Surface blur — controls backdrop-filter: blur() on panels/modals. Glassmorphism-style.
    - Surface opacity — how transparent panels are over the background.
- Layout
    - Content width — narrow / default / wide, controls max-width of the main content column.
    - Sidebar width — if you have a nav sidebar, a slider for its width.

The most impactful ones for a design playground are probably spacing scale, shadow intensity, surface blur, and animation speed — they dramatically change the "feel" of the UI without touching color or type.

## Tech Debt / Clean-up Opportunities

### Medium Impact

4. **`fileInputRef` declared but never used** — `colors/page.tsx:24` creates `useRef<HTMLInputElement>(null)` that is never attached to anything. Dead code.

5. **`data-active` attributes in navbar set but never consumed** — `navbar.tsx:30,51` set `data-active={pathname === href}` and `data-active={isExampleActive}`, but no CSS or JS reads these attributes. Either wire them up for active-link styling or remove them.

6. **`w-18` in navbar is not a Tailwind class** — `navbar.tsx:30` has `className="text-lg w-18"`. Tailwind's scale jumps from `w-16` (4rem) to `w-20` (5rem); `w-18` generates nothing. Likely should be `w-auto` or removed.

7. **`PageFooter` writes the same outer className twice** — both the `"card"` and `"default"` variants in `page-footer.tsx:18,28` open with identical `<footer className="rounded-lg border border-border bg-card text-card-foreground p-6">`. The branching only affects the inner layout. The outer wrapper could be shared.

8. **FileReader errors silently swallowed** — `colors/page.tsx:71-82` and `style/page.tsx:58-64` attach `reader.onload` but no `reader.onerror`. If the read fails the user gets no feedback.

