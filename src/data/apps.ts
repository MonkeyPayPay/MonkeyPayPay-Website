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
    // TODO(owner): confirm SpinFit's tagline / description / art before launch.
    tagline: 'Ride. Track. Repeat.',
    description:
      'SpinFit turns any ride into a smart studio — guided indoor-cycling sessions, live stats, and streaks that keep you coming back.',
    icon: '/placeholders/icon.svg', // ← replace with /apps/spinfit/icon.png
    splash: '/placeholders/splash.svg', // ← replace with your splash art
    playUrl: '', // ← paste the Google Play link once SpinFit is published
    appStoreUrl: '', // ← add when the iOS version ships
    webAppUrl: '', // ← add if SpinFit has a browser/PWA version
    screenshots: [
      { src: '/placeholders/screenshot.svg', alt: 'SpinFit screenshot' },
      { src: '/placeholders/screenshot.svg', alt: 'SpinFit screenshot' },
      { src: '/placeholders/screenshot.svg', alt: 'SpinFit screenshot' },
    ],
    legalLastUpdated: '2026-07-16',
  },
  {
    slug: 'tap-quest',
    name: 'Tap Quest',
    category: 'games',
    tagline: 'A tiny idle adventure.',
    description:
      'A cozy incremental game about building a village of curious monkeys, one tap at a time.',
    icon: '/placeholders/icon.svg',
    splash: '/placeholders/splash.svg',
    playUrl: 'https://play.google.com/store/apps/details?id=com.example.tapquest',
    appStoreUrl: '',
    webAppUrl: '',
    screenshots: [
      { src: '/placeholders/screenshot.svg', alt: 'Tap Quest village' },
      { src: '/placeholders/screenshot.svg', alt: 'Tap Quest upgrades screen' },
    ],
    legalLastUpdated: '2026-01-01',
  },
  {
    slug: 'glance',
    name: 'Glance',
    category: 'widgets',
    tagline: 'Your day, at a glance.',
    description:
      'Beautiful home-screen widgets for weather, calendar, and to-dos — glanceable, customizable, and fast.',
    icon: '/placeholders/icon.svg',
    splash: '/placeholders/splash.svg',
    playUrl: 'https://play.google.com/store/apps/details?id=com.example.glance',
    appStoreUrl: '',
    webAppUrl: '',
    screenshots: [
      { src: '/placeholders/screenshot.svg', alt: 'Glance widgets on a home screen' },
      { src: '/placeholders/screenshot.svg', alt: 'Glance widget customization' },
    ],
    legalLastUpdated: '2026-01-01',
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
