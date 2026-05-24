import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// Click menu button to open
await page.click('[aria-label="Open menu"]');
await page.waitForTimeout(800);

// Screenshot with menu open
await page.screenshot({ path: '.claude/skills/run-ala-eh-website/menu-final-demo.png', fullPage: false });
console.log('✓ Final menu demo screenshot saved to menu-final-demo.png');

await browser.close();
