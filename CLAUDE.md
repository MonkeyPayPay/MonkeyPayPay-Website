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
  - `src/data/programs.ts` — the **Software** section (`/software` page): non-app
    business software grouped by category (linked in nav/footer/⌘K). First
    entry: **Mise**, a restaurant operating system (repo
    `monkeypaypay/reservation-scheduling-app`), status `in-development`. Add
    more programs/categories here as they come.
  - **bASS SWIM — the wife's brand (its own world, split from MonkeyPayPay).**
    Reached from the main site via a distinct **pink brand chip pinned far
    right** in `Nav.astro` (in `nav__actions`, `.nav__bass`) — deliberately off
    the MonkeyPayPay menu (Apps / Software / Paisley's Story). Repo
    `monkeypaypay/bikini-app-store` (project `bass-swim`). Structure:
    - `/bass-swim` (`src/pages/bass-swim.astro`) = **standalone chooser landing**
      — full-viewport 50/50 split, pick a line. Left = bASS SWIM (dark/sexy,
      new `bass-logo.webp`, Playfair italic tag). Right = American RiverRapps
      (warm cream/denim/sun, `riverrapps-lockup.webp`, Pacifico script tag).
      Halves grow on hover; stack on mobile. Its own `<html>`, bASS favicon.
    - `/bass-swim/bass` (`src/pages/bass-swim/bass.astro`, **BassLayout**) =
      **sexy** bASS SWIM brand page (fitness core). Black + hot-pink (`.bass-theme`),
      Playfair Display headings, new `bass-logo.webp` hero, feature trio + "the
      difference" band + CTA.
    - `/bass-swim/riverrapps` (`src/pages/bass-swim/riverrapps.astro`,
      **RiverRappsLayout**) = **all-American river girl** style-line page. Warm
      Americana (`.rr-theme`: cream/denim/red), Bitter slab-serif headings +
      Pacifico script accents, star bullets, `riverrapps-lockup`/`heart`/`rr-monogram`.
    - **Brand link config: `src/data/swim.ts`** (`swimBrands.bass` / `.riverrapps`,
      each `{href, external}`). The chooser + cross-links read from it. **When the
      real standalone URLs arrive, set `href` to the external URL + `external:true`
      — everything updates automatically.** (Owner said each line will get its own
      unique URL later; that's the swap point.)
    - Logos (owner-supplied, black bg removed via soft dark-key → transparent
      webp) in `public/brand/`: **`bass-logo.webp`** (NEW sexy silhouette-B
      wordmark = hero/chooser), `bass-wordmark.webp` (older wordmark, unused),
      `bass-heart.webp` (devil-heart = nav mark/favicon), `riverrapps-lockup.webp`
      (RR hero), `rr-monogram.webp` (RR nav), `riverrapps-heart.webp` (RR footer),
      `riverrapps-wordmark.webp` (saved). bASS favicons: `bass-favicon-32/64.png`,
      `bass-apple-touch.png`. Fonts: `@fontsource-variable/playfair-display`
      (bASS), `@fontsource-variable/bitter` + `@fontsource/pacifico` (RiverRapps).
    - **RiverRapps art is RECOLORED red-white-blue** (per owner: "make the river
      blue, keep overall red/white/blue"). The RR logos were AI-art in
      magenta+silver; recolored in-place by HSL hue-rotating only the saturated
      (magenta) pixels while preserving each pixel's S+L (keeps the metallic
      shading) — silver/white highlights (S≤0.15) untouched. `riverrapps-lockup`:
      **spatial split** — the river "R" → river blue (hue 208), the bottom
      "RAPPS" wordmark (y≥515 of 578) → true red (hue 357), "RIVER" stays silver.
      `rr-monogram` → blue river. `riverrapps-heart` → red (footer accent).
      The RR theme also swapped its warm-yellow "sun" glows for soft blue
      sky/water glows + a faint red wash so the whole page reads red/white/blue.
      (Recolor was a throwaway `_recolor.mjs` HSL script; magenta originals are
      in git history if ever needed.)
    - **SHOP = Shopify embedded (owner chose this; no store exists yet).** Each
      brand page has a `#shop` section that renders an on-page Shopify collection
      storefront via `src/components/ShopifyShop.astro` (Buy Button SDK from
      `sdks.shopifycdn.com`, inits on `astro:page-load`, buttons tinted with each
      line's accent). It stays "Shop · coming soon" until `swimBrands.<line>.shop`
      in `src/data/swim.ts` is filled with `{ domain, storefrontAccessToken,
      collectionId }`. **To go live:** owner creates a Shopify store + one
      collection per line + enables the "Buy Button" sales channel; paste those 3
      values per line → shop appears automatically. Accent per line already set
      (bASS `#e0218a`, RR `#b3202e`). Hero + section "coming soon" chips anchor to
      `#shop`. (Walkthrough for owner was given in chat.)
    - Status in-development. Old single 50/50 combined page (`.bass-split`/
      `.bass-line` CSS) is superseded — those styles linger unused in global.css.
  - **Detail-page infra:** Each program has a detail page
    at `/software/<slug>` (overview, modules, pricing) via
    `src/pages/software/[slug].astro`. Demo is wired to `program.demoUrl` —
    empty → "Interactive demo · coming soon"; set it (once the Mise app is
    deployed) → live "Try the demo" button. The Mise detail page also has a
    founder story ("Built by an operator…", signed "Jordan O'Brien, founder of
    Mise") via `program.story`.
    - **Mise screenshots (DONE):** the detail page has an "A look inside"
      gallery (`program.screenshots[]` in programs.ts → `.prog__shots` grid on
      `[slug].astro`). 16 real product screenshots live in
      `public/software/mise/screens/` (webp, resized to 1600w from the app's
      `docs/publicity/` "event package" in repo
      `monkeypaypay/reservation-scheduling-app`, branch
      `claude/restaurant-management-saas-gp1its`). The page copy + modules were
      also expanded to cover the newer platform (private events & catering/BEO,
      online orders, guest marketing, menu engineering, multi-location P&L,
      bilingual public booking widget). Pricing unchanged (Prep/Service/Prime/
      Enterprise). To refresh: re-pull that branch's `docs/publicity/*.png`.
    - **NEXT for Mise (deferred, logged for later):** (a) deploy the Mise app
      (React + Express/WebSocket, seeded "Harbor & Vine" demo) to a host that
      supports WebSockets — Render/Railway/Fly — then set `program.demoUrl` to
      flip the "Try the demo" button live; (b) add a real Mise logo (currently a
      gradient "M" monogram).
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
     `monkey-ballet.webp` = story page (top), `monkey-404.webp` = 404 page,
     `monkey-celebrate.webp` = story support card (by the donate button),
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
