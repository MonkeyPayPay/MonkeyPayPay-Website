# MonkeyPayPay.com

A premium, fast, accessible hub site for the MonkeyPayPay family of Google Play
apps. Built with **[Astro](https://astro.build)** — static, dependency-light,
and deployed free on Vercel/Netlify.

Design goals (from the brief): editorial typography, a fluid CSS-Grid layout,
a dark-first palette with an electric accent gradient, restrained futuristic
motion (scroll reveals, magnetic hover, animated gradient mesh, view
transitions, a ⌘K command palette), and WCAG-AA accessibility with green Core
Web Vitals.

---

## Add or edit an app — one file

Everything on the site is driven by **`src/data/apps.ts`**. Add an object to the
`apps` array and it automatically gets:

- a card on the homepage under its category,
- a detail page at `/apps/<slug>`,
- auto-generated **Privacy** and **Terms** pages at `/apps/<slug>/privacy` and `/terms`,
- an entry in the ⌘K command palette and the footer.

```ts
{
  slug: 'my-app',                 // lowercase, hyphens — used in the URL
  name: 'My App',
  category: 'fitness',            // must match a slug in `categories`
  tagline: 'One punchy line.',
  description: 'A sentence or two.',
  icon: '/apps/my-app/icon.png',  // put the file in public/apps/my-app/
  playUrl: 'https://play.google.com/store/apps/details?id=...',
  screenshots: [
    { src: '/apps/my-app/1.png', alt: 'Home screen' },
    { src: '/apps/my-app/2.png', alt: 'Settings' },
  ],
  legalLastUpdated: '2026-01-01',
}
```

Put image files under **`public/`** (e.g. `public/apps/my-app/icon.png`) and
reference them with a leading slash (`/apps/my-app/icon.png`). Brand settings
(name, tagline, contact email, socials) live in **`src/data/site.ts`**.

> The Privacy/Terms pages are a plain-language **starter template** in
> `src/components/Legal.astro` — review and adapt them before publishing; Google
> Play requires an accurate privacy policy per app.

---

## Project structure

```
src/
├── data/            apps.ts (source of truth) + site.ts (brand settings)
├── layouts/         BaseLayout.astro (head, nav, footer, view transitions)
├── components/      Hero, Directory, AppCard, Nav, Footer, CommandPalette, …
├── pages/
│   ├── index.astro          Home (hero + directory)
│   ├── about.astro
│   ├── 404.astro
│   └── apps/[slug]/          index, privacy, terms  (generated per app)
├── scripts/         command.ts, filters.ts, interactions.ts (client JS)
└── styles/          global.css (design tokens + all styling)
public/              favicon, placeholder art, and your app images
```

---

## Editing & preview

You don't need to run anything locally — every push to GitHub triggers a
**Vercel preview deployment** with a shareable URL (see below). If you *do* want
to run it on your machine:

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
npm run preview  # preview the production build
```

Requires Node 18.20+, 20.3+, or 22+.

---

## Deploying (free) on Vercel

1. Go to **[vercel.com](https://vercel.com)** → sign in with GitHub.
2. **Add New → Project** → import **MonkeyPayPay/MonkeyPayPay-Website**.
3. Vercel auto-detects Astro — no configuration needed. Click **Deploy**.
4. Every push to the branch gets its own preview URL; the production branch is
   published to your domain.

Point your domain at the site under **Vercel → Project → Settings → Domains**
(Vercel shows the exact DNS records to add at your registrar).

---

## Tech notes

- **No CSS framework** — a hand-built token system (`global.css`) gives full
  control over the fluid type scale and dark/light theming, and keeps the
  payload tiny for Core Web Vitals. (Honors the brief's fluid-grid/type goal.)
- **Motion** uses the native View Transitions API and small vanilla scripts,
  all gated behind `prefers-reduced-motion`.
- **Fonts** are self-hosted variable fonts (Space Grotesk + Inter) via
  Fontsource — no external requests.
