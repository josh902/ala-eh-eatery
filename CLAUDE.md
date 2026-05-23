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

## Important: Non-Standard Versions

This project uses **Next.js 16.2.6** and **React 19** — both have breaking changes from the versions in your training data. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices. **Tailwind CSS v4** also differs significantly from v3 (uses `@import "tailwindcss"` instead of `@tailwind` directives).

## Architecture

Single-page restaurant site using Next.js App Router. `app/page.tsx` composes all sections top-to-bottom:

```
Navbar → HeroSection → AboutSection → FeaturedMenuSection → GallerySection
→ TestimonialsSection → ReservationSection → LocationSection → Footer
```

All section components live in `components/` and are `"use client"` — no RSC usage currently. UI primitives (Button, Input, Select, Sheet, Textarea, Label) are in `components/ui/` via shadcn; add new ones with `npx shadcn add <component>`.

Data files:
- `lib/menuData.ts` — `MenuItem` and `MenuCategory` interfaces, 8 categories with items
- `lib/testimonials.ts` — `Testimonial` interface and reviews array
- `lib/utils.ts` — exports `cn()` for merging Tailwind classes

## Animations

All animations use **Framer Motion** with a consistent pattern: define `variants` objects, apply `whileInView` with `viewport={{ once: true, margin: "-100px" }}` for scroll triggers, and use `staggerChildren` in parent containers for sequential reveals.

## Styling

- Path alias `@/*` maps to the project root
- Brand colors available as Tailwind classes (`brand-dark`, `brand-maroon`, `brand-gold`, `brand-gold-light`, `brand-cream`, `brand-warm-beige`, `brand-text-dark`) and as CSS variables (`--brand-*`) in `app/globals.css`
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
