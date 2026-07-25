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
      'Turn exercise into a game: flick the wheel, land on a random 2-minute move, and knock it out with an on-screen coach, countdown, and haptics. Earn XP, clear daily quests, and build a streak — 48 bodyweight exercises with animated demos, three difficulty tiers, unlockable wheel themes, and a quiet mode for apartments. No gym, no equipment, no account.',
    icon: '/apps/spinfit/icon.webp',
    splash: '/apps/spinfit/banner.webp',
    playUrl: '', // ← paste the Google Play link once SpinFit is published
    appStoreUrl: '', // ← add when the iOS version ships
    webAppUrl: '', // ← SpinFit is a native app; leave blank (shows "coming soon")
    screenshots: [
      { src: '/apps/spinfit/screens/spin.webp', alt: 'SpinFit — flick the wheel to land on a 2-minute move' },
      { src: '/apps/spinfit/screens/coach.webp', alt: 'SpinFit — an on-screen coach walks you through each move' },
      { src: '/apps/spinfit/screens/timer.webp', alt: 'SpinFit — a countdown timer for every exercise' },
      { src: '/apps/spinfit/screens/victory.webp', alt: 'SpinFit — earn XP and level up after each spin' },
      { src: '/apps/spinfit/screens/progress.webp', alt: 'SpinFit — track your streak and training balance' },
      { src: '/apps/spinfit/screens/themes.webp', alt: 'SpinFit — unlockable wheel themes' },
    ],
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
      'A calm quit-anything tracker — vaping, alcohol, sugar, doomscrolling, gambling, or anything custom. Live counters tick money saved and time reclaimed by the second, an 11-step milestone ladder fires confetti and shareable cards, and a craving panic button surfaces your reasons plus a 60-second breathing exercise. Relapses reset with encouragement while keeping your lifetime stats and best streak; track several quits at once, with home-screen widgets on iOS and Android. Everything stays on your device.',
    icon: '/apps/quitline/icon.webp',
    splash: '/apps/quitline/banner.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: 'https://quit-anything-psi.vercel.app',
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
      'A habit and water tracker that actually keeps you honest — one-tap logging with a satisfying progress ring, streaks with freeze tokens so one bad day won’t undo weeks, and a coach you choose (Gentle, Sarcastic, or Brutal) that calls you out in that tone when you slip. Track counts, water, minutes, pages or steps, share your streak cards, and onboard in under 30 seconds. Local-first, no account.',
    icon: '/apps/roastline/icon.webp',
    splash: '/apps/roastline/banner.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: 'https://habit-tracker-eight-jet.vercel.app', // live web app
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
      'A fitness and health app built for men: strength programs and a Smart Workout generator that reads your equipment and recovery, a HIIT timer, GPS run/ride/walk with voice cues, macro & TDEE tracking with barcode scanning, a Daily Readiness score, body metrics with age-aware screening reminders, progress photos, and a daily mind check-in. Local-first by default, with optional account sync across devices.',
    icon: '/apps/forge/icon.webp',
    splash: '/apps/forge/banner.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: 'https://forge-wine-nine.vercel.app', // live web app
    screenshots: [
      { src: '/apps/forge/screens/dashboard.webp', alt: 'Forge — Daily Readiness and today’s mission' },
      { src: '/apps/forge/screens/train.webp', alt: 'Forge — programs and a Smart Workout generator' },
      { src: '/apps/forge/screens/cardio.webp', alt: 'Forge — GPS run, ride & walk tracking' },
      { src: '/apps/forge/screens/fuel.webp', alt: 'Forge — TDEE targets and macro tracking' },
    ],
    legalLastUpdated: '2026-07-19',
    legal: { dataModel: 'standard', usesSubscriptions: true, usesNotifications: false },
  },
  {
    slug: 'apex',
    name: 'Apex',
    category: 'fitness',
    tagline: 'Your whole fitness and health, in one place.',
    description:
      'An all-in-one fitness and health app: a Smart Workout generator, a HIIT timer, GPS cardio, a Daily Readiness score, macro & TDEE tracking with barcode scanning, body metrics, progress photos, and a daily mind check-in — one clean dashboard. Apex is the azure sibling of Forge, built on the same engine. Local-first by default, with optional account sync.',
    icon: '/apps/apex/icon.webp',
    splash: '/apps/apex/banner.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: 'https://apex-delta-ecru.vercel.app', // live web app
    screenshots: [
      { src: '/apps/apex/screens/dashboard.webp', alt: 'Apex — daily readiness and today’s mission' },
      { src: '/apps/apex/screens/train.webp', alt: 'Apex — programs and a smart workout generator' },
      { src: '/apps/apex/screens/fuel.webp', alt: 'Apex — calorie targets and macro tracking' },
      { src: '/apps/apex/screens/body.webp', alt: 'Apex — body metrics and health checks' },
      { src: '/apps/apex/screens/mind.webp', alt: 'Apex — a daily mind check-in' },
    ],
    legalLastUpdated: '2026-07-19',
    legal: { dataModel: 'standard', usesSubscriptions: true, usesNotifications: false },
  },
  {
    slug: 'lyra',
    name: 'Lyra',
    category: 'fitness',
    tagline: 'AI fitness built for the female cycle.',
    description:
      'An AI fitness coach designed around women’s hormonal reality — training and nutrition that adapt to each phase of the 28-day cycle, instead of a generic program built for male physiology. Gets smarter every cycle. In active development.',
    icon: '/apps/lyra/icon.webp',
    splash: '/apps/lyra/banner.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: 'https://health-fitness-phi.vercel.app', // live web app
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
    slug: 'chainlink',
    name: 'Chainlink',
    category: 'games',
    tagline: 'One word chains into the next.',
    description:
      'A daily word puzzle for everyone on earth: fill each link with a real word that starts and ends on the given letters, threading your words into a chain. One shared puzzle a day (two years shipped), a spoiler-free emoji share grid, streaks, a home-screen widget, and deep accessibility (colorblind mode, dynamic type, reduce-motion) — deterministic, fully offline, no account.',
    icon: '/apps/chainlink/icon.webp',
    splash: '/apps/chainlink/banner.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: 'https://daily-puzzle-plum.vercel.app', // live web app
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

  // ── Productivity ────────────────────────────────────────────────────────────
  {
    slug: 'just-one',
    name: 'Just One',
    category: 'productivity',
    tagline: 'One task at a time. That’s it.',
    description:
      'An anti-overwhelm to-do app that shows exactly one task at a time. Brain-dump everything into a hidden backlog; the home screen shows only your current task in large, calm type. Finish with a swipe and the next appears — plus on-device voice capture, a breathing focus timer with weekly stats, home-screen widgets, and an end-of-day recap. Local-first, no account.',
    icon: '/apps/just-one/icon.webp',
    splash: '/apps/just-one/banner.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: 'https://one-task-only.vercel.app', // live web app
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

  {
    slug: 'carecircle',
    name: 'CareCircle',
    category: 'productivity',
    tagline: 'Coordinate a loved one’s care, together.',
    description:
      'A family caregiving hub that keeps everyone on the same page: a shared care log, tasks and calendar, expense splitting, and a document vault with AI summaries — plus an AI care advisor for the hard questions. Built for the sibling group coordinating a parent’s care, on web, iOS, and Android.',
    icon: '/apps/carecircle/icon.webp',
    splash: '/apps/carecircle/banner.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: 'https://my-new-app-lyart.vercel.app', // live web app
    screenshots: [
      { src: '/apps/carecircle/screens/dashboard.webp', alt: 'CareCircle — the family care dashboard: tasks, expenses & activity' },
      { src: '/apps/carecircle/screens/features.webp', alt: 'CareCircle — task board, care calendar, expense splitting, document vault & AI advisor' },
      { src: '/apps/carecircle/screens/how-it-works.webp', alt: 'CareCircle — up and running in three steps' },
      { src: '/apps/carecircle/screens/pricing.webp', alt: 'CareCircle — free to start, with Family and Pro tiers' },
    ],
    legalLastUpdated: '2026-07-21',
    legal: { dataModel: 'standard', usesSubscriptions: true, usesNotifications: true },
  },

  // ── Utilities ───────────────────────────────────────────────────────────────
  {
    slug: 'fate',
    name: 'Fate',
    category: 'utilities',
    tagline: 'Let fate settle it.',
    description:
      'A physics-driven decision maker: build custom spin wheels (with optional weighting), flip coins, roll dice, and let fate end every “you decide” standoff. Tuned 60fps spins with haptic ticks and a confetti reveal, a pass-the-phone group mode, preset templates, unlockable themes, and shareable result cards.',
    icon: '/apps/fate/icon.webp',
    splash: '/apps/fate/banner.webp',
    playUrl: '',
    appStoreUrl: '',
    webAppUrl: 'https://decision-spinner-jet.vercel.app', // live web app
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
