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
High Impact
1. Duplicate loadGoogleFont function — defined identically in two files:

style-provider.tsx:10-19
fonts/page.tsx:41-50
Extract to a shared lib/fonts.ts.

2. Repeated font application useEffect blocks — three nearly identical blocks in fonts/page.tsx:144-185. Could be collapsed into a single applyFont(key, state) helper.

3. Inconsistent CSS property target — most font properties use document.documentElement.style.setProperty(), but --font-geist-mono uses document.body.style.setProperty() in both fonts/page.tsx:177 and style-provider.tsx:101-103. Standardize to documentElement.

Medium Impact
4. Card className duplication — "rounded-lg border border-border bg-card text-card-foreground p-X" repeated across several files (landing/page.tsx, docs/page.tsx, page-footer.tsx). A Panel component already exists but isn't being used in these spots.

5. Duplicate getComputedStyle calls — getComputedStyle(document.body).getPropertyValue("--font-geist-sans").trim() called identically in two separate effects in fonts/page.tsx:152 and 167.

6. @deprecated export with no removal — DEFAULT_COLORS in color.ts:142-143 is marked deprecated; worth checking if it's still imported anywhere and removing if not.