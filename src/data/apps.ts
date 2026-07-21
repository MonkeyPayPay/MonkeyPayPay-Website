// ─────────────────────────────────────────────────────────────────────────────
// THE SINGLE SOURCE OF TRUTH FOR THE WHOLE SITE.
//
// Add an app object to `apps` below and it automatically:
//   • appears in the homepage directory under its category,
//   • gets its own detail page at /apps/<slug>,
//   • gets auto-generated Privacy + Terms pages at /apps/<slug>/privacy|terms,
//   • becomes searchable in the ⌘K command palette,
//   • gets footer legal links.
//
// Replace the three sample apps below with your real ones.
// ─────────────────────────────────────────────────────────────────────────────

export interface Screenshot {
  /** Path under /public (e.g. "/apps/pulse-fit/1.png") or a full https URL. */
  src: string;
  alt: string;
}

export interface App {
  /** URL-safe id used in /apps/<slug>/… — lowercase, hyphens only. */
  slug: string;
  name: string;
  /** Must match a category `slug` in `categories` below. */
  category: string;
  /** One short line shown on the card. */
  tagline: string;
  /** A sentence or two, shown on the card and the app page. */
  description: string;
  /** App icon: path under /public or a full URL. */
  icon: string;
  /** Wide "splash" / hero banner shown on the app page. Optional. */
  splash?: string;
  /** The Google Play listing URL. Leave "" for a "coming soon" placeholder. */
  playUrl?: string;
  /** Apple App Store URL. Leave "" to show a "coming soon" placeholder. */
  appStoreUrl?: string;
  /** Web app / PWA URL (opens in a browser). Leave "" for a "coming soon" placeholder. */
  webAppUrl?: string;
  /** 2–4 screenshots look best. */
  screenshots: Screenshot[];
  /** Date shown on the auto-generated legal pages (YYYY-MM-DD). */
  legalLastUpdated?: string;
  /** Tailors the auto-generated Privacy + Terms pages to this app's reality. */
  legal?: {
    /**
     * 'local-only' = no account, nothing collected or transmitted off-device
     * (renders an accurate "Data Not Collected"-style policy). 'standard' =
     * the generic template. Defaults to 'standard' when omitted.
     */
    dataModel?: 'local-only' | 'standard';
    /** App offers in-app purchases / subscriptions (adds billing sections). */
    usesSubscriptions?: boolean;
    /** App schedules on-device notifications (adds a notifications section). */
    usesNotifications?: boolean;
    /** Overrides the site-wide contact email for this app's legal pages. */
    contactEmail?: string;
  };
}

export interface Category {
  slug: string;
  name: string;
  /** Optional one-liner shown under the category heading. */
  blurb?: string;
}

// Categories render in this order. Empty categories are hidden automatically.
export const categories: Category[] = [
  { slug: 'fitness', name: 'Health & Fitness' },
  { slug: 'games', name: 'Games' },
  { slug: 'widgets', name: 'Widgets' },
  { slug: 'productivity', name: 'Productivity' },
  { slug: 'utilities', name: 'Utilities' },
  { slug: 'finance', name: 'Finance' },
];

export const apps: App[] = [
  {
    slug: 'spinfit',
    name: 'SpinFit',
    category: 'fitness',
    tagline: 'Spin. Sweat. Two minutes at a time.',
    description:
      'Turn exercise into a game: flick the wheel, land on a random 2-minute move, and knock it out with an on-screen coach and countdown. Earn XP, level up, and build a streak — 48 bodyweight exercises, three difficulty tiers, and a quiet mode for apartments. No gym, no equipment, no account.',
    icon: '/apps/spinfit/icon.webp',
    splash: '/apps/spinfit/banner.webp',
    playUrl: '', // ← paste the Google Play link once SpinFit is published
    appStoreUrl: '', // ← add when the iOS version ships
    webAppUrl: '', // ← SpinFit is a native app; leave blank (shows "coming soon")
    // Real in-app screenshots go here when ready (public/apps/spinfit/1.png …).
    screenshots: [],
    legalLastUpdated: '2026-07-16',
    legal: {
      dataModel: 'local-only',
      usesSubscriptions: true, // SpinFit Pro (RevenueCat), $3.99/mo
      usesNotifications: true, // on-device daily reminders
      // contactEmail: 'support@spinfit.app', // ← enable once that inbox is live
    },
  },

  // ── Health & Fitness ────────────────────────────────────────────────────────
  {
    slug: 'quitline',
    name: 'Quitline',
    category: 'fitness',
    tagline: 'Quit anything. Watch it add up.',
    description:
      'A calm quit-anything tracker — vaping, alcohol, sugar, doomscrolling, gambling, or anything custom. Live counters for days clean, money saved and time reclaimed; a milestone ladder from your first hour to two years; a craving panic button with a 60-second breathing exercise; compassionate relapse handling that keeps your lifetime stats; and home-screen widgets. Everything stays on your device.',
    icon: '/apps/quitline/icon.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: '',
    screenshots: [],
    legalLastUpdated: '2026-07-19',
    legal: { dataModel: 'local-only', usesSubscriptions: true, usesNotifications: true },
  },
  {
    slug: 'roastline',
    name: 'Roastline',
    category: 'fitness',
    tagline: 'Build streaks. Get roasted into showing up.',
    description:
      'A habit and water tracker that actually keeps you honest — one-tap logging with a satisfying progress ring, streaks with freeze tokens so one bad day won’t nuke weeks of work, and a coach you choose (Gentle, Sarcastic, or Brutal) that calls you out when you slip. Shareable streak cards, full dark mode, local-first with no account.',
    icon: '/apps/roastline/icon.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: '',
    screenshots: [],
    legalLastUpdated: '2026-07-19',
    legal: { dataModel: 'local-only', usesSubscriptions: true, usesNotifications: true },
  },
  {
    slug: 'forge',
    name: 'Forge',
    category: 'fitness',
    tagline: 'Every part of men’s health, one dashboard.',
    description:
      'A fitness and health app built for men: strength programs and a smart workout generator that reads your equipment and recovery, macro and TDEE tracking with barcode scanning, body metrics with age-aware screening reminders, a progress-photo gallery, and a daily mind check-in. Everything is stored on your device — no account, no server.',
    icon: '/apps/forge/icon.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: '', // Forge is a web app — set this to the live URL once deployed
    screenshots: [
      { src: '/apps/forge/screens/dashboard.webp', alt: 'Forge — daily readiness and today’s mission' },
      { src: '/apps/forge/screens/train.webp', alt: 'Forge — programs and a smart workout generator' },
      { src: '/apps/forge/screens/fuel.webp', alt: 'Forge — TDEE targets and macro tracking' },
      { src: '/apps/forge/screens/body.webp', alt: 'Forge — body metrics and age-aware health checks' },
      { src: '/apps/forge/screens/mind.webp', alt: 'Forge — a daily mind check-in' },
    ],
    legalLastUpdated: '2026-07-19',
    legal: { dataModel: 'local-only', usesSubscriptions: true, usesNotifications: true },
  },
  {
    slug: 'apex',
    name: 'Apex',
    category: 'fitness',
    tagline: 'Your whole fitness and health, in one place.',
    description:
      'An all-in-one fitness and health app: strength programs and a smart workout generator, macro and TDEE tracking with barcode scanning, body metrics with trend charts, a progress-photo gallery, and a daily mind check-in — one clean dashboard. Apex is the azure sibling of Forge, built on the same engine. Everything is stored on your device.',
    icon: '/apps/apex/icon.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: '', // Apex is a web app — set this to the live URL once launched
    screenshots: [
      { src: '/apps/apex/screens/dashboard.webp', alt: 'Apex — daily readiness and today’s mission' },
      { src: '/apps/apex/screens/train.webp', alt: 'Apex — programs and a smart workout generator' },
      { src: '/apps/apex/screens/fuel.webp', alt: 'Apex — calorie targets and macro tracking' },
      { src: '/apps/apex/screens/body.webp', alt: 'Apex — body metrics and health checks' },
      { src: '/apps/apex/screens/mind.webp', alt: 'Apex — a daily mind check-in' },
    ],
    legalLastUpdated: '2026-07-19',
    legal: { dataModel: 'local-only', usesSubscriptions: true, usesNotifications: true },
  },
  {
    slug: 'lyra',
    name: 'Lyra',
    category: 'fitness',
    tagline: 'AI fitness built for the female cycle.',
    description:
      'An AI fitness coach designed around women’s hormonal reality — training and nutrition that adapt to each phase of the 28-day cycle, instead of a generic program built for male physiology. Gets smarter every cycle. In active development.',
    icon: '/apps/lyra/icon.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: '', // Lyra is a web app / SaaS — set this to the live URL once deployed
    screenshots: [
      { src: '/apps/lyra/screens/dashboard.webp', alt: 'Lyra — a daily dashboard tuned to today’s cycle phase' },
      { src: '/apps/lyra/screens/cycle.webp', alt: 'Lyra — a cycle tracker with phase-by-phase guidance' },
      { src: '/apps/lyra/screens/training.webp', alt: 'Lyra — workouts adapted to your current phase' },
      { src: '/apps/lyra/screens/nutrition.webp', alt: 'Lyra — a food plan for your phase' },
      { src: '/apps/lyra/screens/insights.webp', alt: 'Lyra — weekly insights on energy, mood and your cycle' },
      { src: '/apps/lyra/screens/coach.webp', alt: 'Lyra — an AI coach that knows your cycle' },
    ],
    legalLastUpdated: '2026-07-19',
    legal: { dataModel: 'standard', usesSubscriptions: true, usesNotifications: true },
  },

  // ── Games ─────────────────────────────────────────────────────────────────
  {
    slug: 'all-in-trivia',
    name: 'All In Trivia',
    category: 'games',
    tagline: 'Wager your points. Trust your gut.',
    description:
      'A trivia game where you bet your points on your confidence — answer right to multiply your wager, wrong to lose it, and try not to go bust. 2,040 questions across 12 categories, a globally-shared daily challenge, an escalating endless mode, and lifelines earned by streaks (never bought). Fully offline, no account.',
    icon: '/apps/all-in-trivia/icon.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: '',
    screenshots: [],
    legalLastUpdated: '2026-07-19',
    legal: { dataModel: 'standard', usesSubscriptions: true, usesNotifications: false },
  },
  {
    slug: 'chainlink',
    name: 'Chainlink',
    category: 'games',
    tagline: 'One word chains into the next.',
    description:
      'A daily word puzzle for everyone on earth: fill each link with a real word that starts and ends on the given letters, threading your words into a chain. One shared puzzle a day, two years of puzzles shipped, spoiler-free result sharing, and endless practice — deterministic and fully offline, no account.',
    icon: '/apps/chainlink/icon.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: '',
    screenshots: [
      { src: '/apps/chainlink/screens/1.webp', alt: 'Chainlink — one new word chain every day' },
      { src: '/apps/chainlink/screens/2.webp', alt: 'Chainlink — link each word to the next' },
      { src: '/apps/chainlink/screens/3.webp', alt: 'Chainlink — keep your daily streak alive' },
      { src: '/apps/chainlink/screens/4.webp', alt: 'Chainlink — share your result, spoiler-free' },
      { src: '/apps/chainlink/screens/5.webp', alt: 'Chainlink — Premium: full archive and practice' },
    ],
    legalLastUpdated: '2026-07-19',
    legal: { dataModel: 'local-only', usesSubscriptions: true, usesNotifications: true },
  },
  {
    slug: 'empire-table',
    name: 'Empire Table',
    category: 'games',
    tagline: 'From food cart to restaurant empire.',
    description:
      'An idle restaurant tycoon: hire crew, balance food and labor cost, price your menu, survive health inspections and viral reviews, then sell the business to prestige for permanent industry reputation. Warm illustrated art, juicy number-and-haptic feedback, and offline earnings that pile up while you’re away.',
    icon: '/apps/empire-table/icon.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: '',
    screenshots: [],
    legalLastUpdated: '2026-07-19',
    legal: { dataModel: 'standard', usesSubscriptions: true, usesNotifications: false },
  },
  {
    slug: 'evolve',
    name: 'EVOLVE',
    category: 'games',
    tagline: 'A new game, in the making.',
    description:
      'An original game in early development, built in Unity. Still taking shape — more to come soon.',
    icon: '/apps/evolve/icon.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: '',
    screenshots: [],
    legalLastUpdated: '2026-07-19',
    legal: { dataModel: 'standard' },
  },

  // ── Productivity ────────────────────────────────────────────────────────────
  {
    slug: 'just-one',
    name: 'Just One',
    category: 'productivity',
    tagline: 'One task at a time. That’s it.',
    description:
      'An anti-overwhelm to-do app that shows exactly one task at a time. Brain-dump everything into a hidden backlog; the home screen shows only your single current task in large, calm typography. Finish it with a swipe and the next one appears — Things 3 meets a meditation app. Local-first, no account.',
    icon: '/apps/just-one/icon.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: '',
    screenshots: [
      { src: '/apps/just-one/screens/home.webp', alt: 'Just One — a single current task, front and center' },
      { src: '/apps/just-one/screens/onboarding.webp', alt: 'Just One — one thing at a time' },
      { src: '/apps/just-one/screens/backlog.webp', alt: 'Just One — everything else waits in the backlog' },
      { src: '/apps/just-one/screens/focus.webp', alt: 'Just One — a focus timer for deep work' },
      { src: '/apps/just-one/screens/recap.webp', alt: 'Just One — a calm end-of-day recap' },
      { src: '/apps/just-one/screens/stats.webp', alt: 'Just One — weekly focus stats' },
    ],
    legalLastUpdated: '2026-07-19',
    legal: { dataModel: 'local-only', usesSubscriptions: true, usesNotifications: true },
  },

  // ── Utilities ───────────────────────────────────────────────────────────────
  {
    slug: 'fate',
    name: 'Fate',
    category: 'utilities',
    tagline: 'Let fate settle it.',
    description:
      'A physics-driven decision maker: build custom spin wheels (with optional weighting), flip coins, roll dice, and let fate end every “you decide” standoff. Tuned spins with haptic ticks and a dramatic confetti reveal, a group mode where everyone adds an option, preset templates, and shareable result cards.',
    icon: '/apps/fate/icon.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: '',
    screenshots: [],
    legalLastUpdated: '2026-07-19',
    legal: { dataModel: 'standard', usesSubscriptions: true, usesNotifications: false },
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getApp(slug: string): App | undefined {
  return apps.find((a) => a.slug === slug);
}

export function categoryName(slug: string): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

export function appsByCategory(slug: string): App[] {
  return apps.filter((a) => a.category === slug);
}

/** Categories that contain at least one app, in declared order. */
export function usedCategories(): Category[] {
  return categories.filter((c) => apps.some((a) => a.category === c.slug));
}
