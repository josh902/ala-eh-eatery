# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

There is no test suite.

**Port conflict (Windows):** If `npm run dev` warns that port 3000 is in use and falls back to 3001, kill the stale process: `taskkill /PID <pid> /F` (the PID is printed in the warning).

**Import naming conflict:** lucide-react exports `Image` as an icon, but next/image exports `Image` as a component. If importing both, rename lucide's icon to `ImageIcon` to avoid conflicts (see Navbar.tsx).

## Important: Non-Standard Versions

This project uses **Next.js 16.2.6** and **React 19** — both have breaking changes from the versions in your training data. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices. **Tailwind CSS v4** also differs significantly from v3 (uses `@import "tailwindcss"` instead of `@tailwind` directives).

## Architecture

Single-page restaurant site using Next.js App Router. `app/page.tsx` composes all sections top-to-bottom:

```
Navbar → HeroSection → AboutSection → FeaturedMenuSection → GallerySection
→ TestimonialsSection → ReservationSection → DeliverySection → LocationSection → Footer
```

**Navbar Scroll Behavior:**
- Hides (slides up) when `scrollY > 30` pixels
- Background changes from `brand-cream` to `brand-dark` when `scrollY > 50` pixels
- Hide animation uses CSS transform: `-translate-y-full` / `translate-y-0`
- Mobile menu includes branding section, icons for each nav item, visual dividers, and contact footer

All section components live in `components/` and are `"use client"` — no RSC usage currently. UI primitives (Button, Input, Select, Sheet, Textarea, Label) are in `components/ui/` via shadcn; add new ones with `npx shadcn add <component>`.

## Common Component Patterns

**Scroll-triggered animations:** Use `motion.div` with `whileInView={{ opacity: 1, y: 0 }}` and `viewport={{ once: true, margin: "-100px" }}` for elements that animate on scroll.

**External links:** Wrap external URLs in `motion.a` elements with `target="_blank" rel="noopener noreferrer"` (see DeliverySection for example). Use `href` for the link target.

**Icons from lucide-react:** Import individual icons (`Truck`, `Clock`, `ChefHat`, etc.) and pass to components via object properties when reusable (see Navbar's `navLinks` array).

**Staggered animations:** Parent containers use `containerVariants` with `staggerChildren: 0.1-0.2` and `delayChildren`; children use individual `itemVariants` for sequential reveal.

**Card hover states:** Common pattern is `hover:shadow-2xl hover:scale-105` with `transition-all duration-300` for interactive cards.

**Responsive grids:** Mobile-first stacking uses `grid grid-cols-1 md:grid-cols-2 gap-8` (e.g., DeliverySection). Adjust gap for larger screens with `lg:gap-12`.

**Section structure:** All sections follow: motion header (label + title + subtitle) → content with motion variants → optional info note. Padding: `py-20 sm:py-28 lg:py-32`.

Data files:
- `lib/menuData.ts` — `MenuItem` and `MenuCategory` interfaces, 8 categories with items
- `lib/testimonials.ts` — `Testimonial` interface and reviews array
- `lib/utils.ts` — exports `cn()` for merging Tailwind classes

## Animations

All animations use **Framer Motion** with a consistent pattern: define `variants` objects, apply `whileInView` with `viewport={{ once: true, margin: "-100px" }}` for scroll triggers, and use `staggerChildren` in parent containers for sequential reveals.

## Styling

- Path alias `@/*` maps to the project root
- Brand colors are defined both in `tailwind.config.ts` (as `brand-*` class names) and as CSS variables (`--brand-*`) in `app/globals.css`. **In Tailwind v4, the config-based utility classes (`bg-brand-maroon`, etc.) may not generate CSS reliably.** Use the CSS-variable arbitrary-value syntax instead: `bg-[var(--brand-maroon)]`, `text-[var(--brand-gold)]`, etc. This directly references the CSS variable and always works.
- Fonts: `font-serif` = Playfair Display (headings), `font-sans` = Lora (body) — loaded as CSS vars in `app/layout.tsx`
- Shadcn style is `base-nova`

## Visual Verification

After any UI change, use the Playwright driver to screenshot the result:

```bash
node .claude/skills/run-ala-eh-website/driver.mjs smoke
node .claude/skills/run-ala-eh-website/driver.mjs screenshot <section>
node .claude/skills/run-ala-eh-website/driver.mjs mobile
```

Valid sections: `home`, `about`, `menu`, `gallery`, `testimonials`, `reserve`, `location`. Screenshots land in `.claude/skills/run-ala-eh-website/`. Requires `npm install` inside that directory once (installs Playwright).

## Custom Skills

- **`/build`** — Use this before starting any implementation. It runs the full clarify → plan → implement → self-check workflow defined in `.claude/commands/build.md`.
- **`/run-ala-eh-website`** — Launches and drives the site with Playwright. See `.claude/skills/run-ala-eh-website/SKILL.md`.

## Before Starting Implementation

Before writing any code, ask clarifying questions until you are **≥95% confident** you fully understand all of the following:

1. **Website goal** — what is the site trying to achieve?
2. **Target audience** — who are the users?
3. **Design style** — visual tone, mood, references
4. **Required sections** — which sections/pages are needed?
5. **Functionality** — interactive features, forms, integrations
6. **Animations** — motion style, intensity, specific interactions
7. **Branding** — colors, fonts, logo usage, voice/tone
8. **User experience expectations** — flow, accessibility, performance priorities

Iterate with follow-up questions as needed. Do not begin implementation until all dimensions are clear.

## Troubleshooting

**Hydration mismatch error** — "React expected server HTML to contain..." or "<button> cannot be a descendant of <button>"
- Cause: Nested button elements (e.g., `<button>` inside `<SheetTrigger>`) cause hydration errors
- Fix: Apply styling directly to the trigger/parent element instead of wrapping it in a Button component. Preserve `aria-label` for accessibility.

**Text contrast issues** — Text appears hard to read on cream backgrounds
- Cause: Using `text-brand-text-dark` (lighter) or `font-light` for body text
- Fix: Use `text-brand-dark` for better contrast; use `font-medium` instead of `font-light` for readability. Test contrast ratio in DevTools.

**Import conflicts** — TypeScript error "'X' is declared but its value is never read"
- Cause: Same name imported from multiple libraries (e.g., `Image` from both lucide-react and next/image)
- Fix: Rename one import using `as` (e.g., `import { Image as ImageIcon } from "lucide-react"`)

**Shadcn components render transparent / invisible**
- Cause: This project uses shadcn but never defined shadcn's semantic CSS tokens (`--primary`, `--popover`, `--accent`, `--background`, `--foreground`, etc.) in `globals.css`. Shadcn components whose default styles reference these variables render with no background/color.
- Affected components: `Button` (default variant uses `bg-primary`), `SelectContent` (uses `bg-popover`), and any other shadcn primitives using semantic tokens.
- Fix: Pass explicit color overrides via `className`. For buttons, either use a plain `<button>` with `bg-[var(--brand-maroon)]`-style classes, or pass a `className` that includes the desired background. For `SelectContent`, add `className="bg-white border border-brand-cream/50 shadow-lg"`.
- **Do not** use the Button component's default variant without overriding `bg-primary`.
