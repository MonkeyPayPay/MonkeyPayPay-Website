// ─────────────────────────────────────────────────────────────────────────────
// "Software" section — business/professional software (separate from the Google
// Play apps in apps.ts). Add a program here and it appears on /software under
// its category. Categories render in declared order; empty ones are hidden.
// ─────────────────────────────────────────────────────────────────────────────

export interface ProgramCategory {
  slug: string;
  name: string;
  blurb?: string;
}

export interface Program {
  /** URL-safe id. */
  slug: string;
  name: string;
  /** Must match a category slug below. */
  category: string;
  tagline: string;
  description: string;
  /** Where it is in its lifecycle. */
  status: 'in-development' | 'beta' | 'live';
  /** Public site / app link when there is one. Leave undefined for "coming soon". */
  url?: string;
  /** A few headline capabilities. */
  highlights?: string[];
}

export const programCategories: ProgramCategory[] = [
  { slug: 'restaurant', name: 'Restaurant' },
  // Future categories go here (retail, healthcare, logistics, …).
];

export const programs: Program[] = [
  {
    slug: 'mise',
    name: 'Mise',
    category: 'restaurant',
    tagline: 'The restaurant operating system.',
    description:
      'One platform that replaces the seven-app stack — POS back office, reservations, scheduling, procurement, accounting, checklists, and team chat — with one login and one source of truth, synced in real time from the host stand to the pass to the office.',
    status: 'in-development',
    highlights: [
      'Reservations, waitlist & a guest CRM that builds itself',
      'Scheduling & labor with live labor % vs. sales',
      'Live inventory with auto-86 the moment stock hits zero',
      'Procurement, receiving & vendor price-drift alerts',
      'Computed prime cost and a live 30-day P&L',
      'Checklists, HACCP logs & built-in team comms',
    ],
  },
];
