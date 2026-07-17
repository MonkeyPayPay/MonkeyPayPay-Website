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
2. **PayPal donate link — DONE.** `site.donate.url` is set to the PayPal
   business "Support Paisley" payment link (customer-set amount):
   `https://www.paypal.com/ncp/payment/RX7XKC9W7XGWL`. The Support Paisley
   button (story page, homepage teaser, footer) now opens it in a new tab.
   A matching QR code was also provided by the owner if we ever want to show it.
3. **Apps.** `src/data/apps.ts`:
   - **SpinFit** (fitness, slug `spinfit`) is the owner's first real app — real
     copy + accurate legal pulled from the app repo
     **`monkeypaypay/micro-workout-roulette`** (Expo/React Native; gamified
     2-min-workout roulette; local-only storage, no account, RevenueCat for
     "SpinFit Pro" $3.99/mo, on-device reminders). Real brand art is in
     `public/apps/spinfit/` (icon.webp, banner.webp = splash, plus wordmark.webp,
     logo-mark.webp saved for later use). The mascot was background-removed to a
     transparent `public/brand/mascot.webp` and is featured on the 404 page.
     Still PENDING: real in-app screenshots (screenshots array is currently
     empty) and the Google Play URL at launch (buttons show "coming soon").
     Store copy lives in that repo's `store-listing/`.
   - **Tap Quest / Glance** samples were removed; SpinFit is currently the only
     app. Add real apps as they launch (pull details/art from each repo).
   - Favicon/app icon is the monkey head (`public/favicon-16.png`,
     `favicon-32.png`, `apple-touch-icon.png`). Social share card is
     `public/og-image.png` (1200×630, monkey + wordmark) wired via og:image.
   - **Brand mascot:** a cartoon monkey in a pink tutu (the MonkeyPayPay
     character — ties to Paisley + dance). Owner generates poses via GPT from a
     reference image; they arrive with a baked-in checkerboard bg. Removal
     recipe: border flood-fill keying light-neutral pixels (sharp raw buffer),
     PLUS clear enclosed pockets with area ≥ 280 (protects eye catchlights/teeth
     which are smaller). Poses in `public/brand/`: `monkey-wave.webp` = hero,
     `monkey-ballet.webp` = story page, `monkey-404.webp` = 404 page,
     `monkey-apps.webp` = saved/unused (crowded the homepage next to the hero).
   - Per-app legal is tailored via the `legal` field (dataModel 'local-only',
     usesSubscriptions, usesNotifications, contactEmail) → `Legal.astro`.
   - **Contact email:** `support@monkeypaypay.com` site-wide (site.ts), used by
     the footer, story page, and every app's legal pages.
4. **Story copy.** `/story` wording is Claude's edit of the owner's words. Owner
   already reviewed once (removed the pull quote, changed "living room" →
   "family room"). Adjust further if they ask.
5. **Splash art, App Store, and Web app** are placeholders (`/placeholders/splash.svg`,
   "App Store · coming soon" / "Web app · coming soon" chips) until real
   assets/links arrive. Each app supports `playUrl`, `appStoreUrl`, and
   `webAppUrl` — set any to a real URL to turn its chip into a live button.
