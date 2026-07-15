# MonkeyPayPay — project memory

Context and running notes for Claude across sessions. (Human-friendly setup
docs live in `README.md`.)

## What this is

- **MonkeyPayPay.com** — a premium, dark-first **Astro 7** static site that is a
  hub/directory for the owner's **Google Play** apps (Apple App Store planned),
  grouped by category. Built to the brief in the project's original spec
  (editorial type, fluid grid, restrained motion, ⌘K palette, WCAG AA).
- **The site's heart:** MonkeyPayPay is named after the owner's daughter
  **Paisley** (nicknames *Monkey* / *Pay Pay*). The `/story` page ("For Paisley")
  is the emotional center — handle its copy with care.

## How it's wired

- **Repo root = the site.** Everything is data-driven from:
  - `src/data/apps.ts` — the single source of truth for apps (adding one entry
    creates its card, detail page, auto-generated Privacy + Terms pages, ⌘K
    entry, and footer links).
  - `src/data/site.ts` — brand settings + `donate` config.
- **Deploy:** push to branch `claude/wordpress-github-setup-mup411` → **Vercel**
  auto-builds and deploys. The owner reviews via the Vercel preview/production URL.
- **Owner is non-technical** ("Claude drives, I review"). Keep guidance concrete;
  prefer doing the work and pushing over asking them to edit code.
- Build check: `npm run build` (must stay green; currently 12 pages, 0 vulns).
- The WordPress theme this started as is preserved in git history at commit
  `258612b` (superseded by the Astro rebuild).

## Domain / hosting facts

- Domain **monkeypaypay.com** registered at **GoDaddy**; site hosted on **Vercel**.
- Apex DNS at GoDaddy: `A  @  216.198.79.1` (Vercel's IP) — set and working.
  GoDaddy also has `CNAME www → monkeypaypay.com` and a `_domainconnect` record.
- Every page emits a canonical tag to `https://monkeypaypay.com` (so www serving
  the same content is SEO-safe).

## OPEN ITEMS / TODO (revisit)

1. **www redirect — DEFERRED.** Adding `www.monkeypaypay.com` in the Vercel
   *mobile* UI failed (the "Redirect to Another Domain" destination dropdown
   wouldn't let them select `monkeypaypay.com`). Retry on **desktop** Vercel:
   add `www.monkeypaypay.com`, 308 redirect → `monkeypaypay.com` (or just connect
   it to Production — both are fine). Not urgent.
2. **PayPal donate link — PENDING.** Owner will use **PayPal** ("Support Paisley"
   button). When they send their `https://paypal.me/...` link, set
   `site.donate.url` in `src/data/site.ts` and push. Until then the button safely
   opens a mailto.
3. **Replace sample apps.** `src/data/apps.ts` still holds 3 placeholder apps
   (Pulse Fit / Tap Quest / Glance). Swap for the owner's real apps: Play Store
   URLs, icons, screenshots, splash art (`public/apps/<slug>/...`), and
   `appStoreUrl` when iOS versions ship.
4. **Story copy review.** `/story` wording is Claude's edit of the owner's words
   (includes invented detail "first wobbling steps across the living-room floor").
   Confirm details with the owner and adjust.
5. **Splash art, App Store, and Web app** are placeholders (`/placeholders/splash.svg`,
   "App Store · coming soon" / "Web app · coming soon" chips) until real
   assets/links arrive. Each app supports `playUrl`, `appStoreUrl`, and
   `webAppUrl` — set any to a real URL to turn its chip into a live button.
