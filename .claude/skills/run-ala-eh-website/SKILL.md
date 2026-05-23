---
name: run-ala-eh-website
description: run start build screenshot ala-eh-website — launch and drive the Next.js restaurant site with Playwright
---

Ala Eh Eatery is a Next.js 16.2.6 single-page restaurant website. It is driven via `driver.mjs` — a Playwright script that launches a headless Chromium browser against the running dev server and can take screenshots of any section. All paths below are relative to `ala-eh-website/`.

## Prerequisites

- Node.js ≥ 20
- Install Playwright inside the skill directory (one-time):

```
cd .claude/skills/run-ala-eh-website
npm install
```

## Build / Start

```
npm install
npm run dev
```

Server starts at `http://localhost:3000`. If port 3000 is taken, Next.js falls back to 3001 — the driver handles both automatically.

## Run — Agent Path

Run the driver from the project root (`ala-eh-website/`):

```
node .claude/skills/run-ala-eh-website/driver.mjs
```

**Commands:**

| Command | What it does | Output |
|---|---|---|
| `driver.mjs` or `driver.mjs smoke` | Verify title, log nav links, screenshot hero | `screenshot-hero.png` |
| `driver.mjs screenshot <section>` | Scroll to a section and screenshot it | `screenshot-<section>.png` |
| `driver.mjs mobile` | Screenshot hero at 375×812 (iPhone viewport) | `screenshot-mobile.png` |

Valid sections: `home`, `about`, `menu`, `gallery`, `testimonials`, `reserve`, `location`

Screenshots land in `.claude/skills/run-ala-eh-website/`.

**Example — smoke test then screenshot the reservation section:**

```
node .claude/skills/run-ala-eh-website/driver.mjs smoke
node .claude/skills/run-ala-eh-website/driver.mjs screenshot reserve
```

Verified output (this session):
```
✓ Dev server on port 3000
✓ Title: Ala Eh Eatery | Filipino Restaurant in Halifax
✓ Heading: Ala Eh
✓ Nav: Ala EhEATERY, Home, About, Menu, Gallery, Testimonials, Reserve, Location
✓ Screenshot → ...screenshot-hero.png
```

## Run — Human Path

```
npm run dev
```

Opens at `http://localhost:3000`. Nav links are smooth-scroll anchors to page sections. Not useful headless.

## Gotchas

- **Port fallback:** `npm run dev` prints a warning and uses 3001 if 3000 is occupied. The driver pings both ports and uses whichever responds — no manual change needed.
- **No `chromium-cli` on Windows:** This machine uses Playwright's bundled Chromium instead. The driver's `node_modules/` contains it; `npx playwright install chromium` can also install it system-wide.
- **Section IDs not set in HTML:** The current sections don't have explicit `id` attributes. `driver.mjs` tries CSS selectors from `SECTION_SELECTORS` and falls back to clicking the matching nav link. If a section stops scrolling correctly, check the selector map at the top of `driver.mjs`.
- **`node_modules/` in skill dir:** Not committed. Run `npm install` inside `.claude/skills/run-ala-eh-website/` on a fresh clone.

## Troubleshooting

| Error | Fix |
|---|---|
| `No dev server found on port 3000 or 3001` | Run `npm run dev` first |
| `Cannot find module './node_modules/playwright/index.mjs'` | Run `npm install` inside the skill directory |
| Screenshot is blank / all-white | Dev server is up but page hasn't hydrated yet — the driver waits for `networkidle`, but on a slow machine try adding `await page.waitForTimeout(2000)` before the screenshot call |
