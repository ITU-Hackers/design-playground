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

