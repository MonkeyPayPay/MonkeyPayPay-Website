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
