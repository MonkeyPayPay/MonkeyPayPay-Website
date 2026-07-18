// ─────────────────────────────────────────────────────────────────────────────
// "Software" section — business/professional software (separate from the Google
// Play apps in apps.ts). Add a program here and it appears on /software under
// its category, gets a detail page at /software/<slug>, and (when demoUrl is
// set) a live "Try the demo" button.
// ─────────────────────────────────────────────────────────────────────────────

export interface ProgramCategory {
  slug: string;
  name: string;
  blurb?: string;
}

export interface ProgramModule {
  name: string;
  desc: string;
}

export interface PricingTier {
  name: string;
  price: string;
  for: string;
}

export interface Program {
  /** URL-safe id, used in /software/<slug>. */
  slug: string;
  name: string;
  /** Must match a category slug below. */
  category: string;
  tagline: string;
  /** Short blurb for the card + detail intro. */
  description: string;
  status: 'in-development' | 'beta' | 'live';
  /** Public marketing/site link, if any. */
  url?: string;
  /** Live interactive demo. Leave undefined for a "coming soon" state. */
  demoUrl?: string;
  /** A few headline capabilities (shown on the card). */
  highlights?: string[];
  /** Longer paragraphs for the detail page. */
  overview?: string[];
  /** Founder / credibility story shown as a callout on the detail page. */
  story?: { heading: string; body: string[]; signoff?: string };
  /** Full module/feature breakdown for the detail page. */
  modules?: ProgramModule[];
  /** Pricing tiers for the detail page. */
  pricing?: PricingTier[];
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
    // url: 'https://mise.example.com',      // ← set when there's a marketing site
    // demoUrl: 'https://demo.mise.example', // ← set when the live demo is deployed
    highlights: [
      'Reservations, waitlist & a guest CRM that builds itself',
      'Scheduling & labor with live labor % vs. sales',
      'Live inventory with auto-86 the moment stock hits zero',
      'Procurement, receiving & vendor price-drift alerts',
      'Computed prime cost and a live 30-day P&L',
      'Checklists, HACCP logs & built-in team comms',
    ],
    overview: [
      'Most restaurants run on seven tabs and seven subscriptions — a POS back office, a reservations tool, a scheduler, procurement, accounting, checklists, and a group chat — none of which talk to each other. Mise replaces the whole stack with one platform, one login, and one source of truth.',
      'Everything is connected. A single closed check on your POS flows straight into Mise: it adds to today’s sales and P&L, depletes inventory through recipe costing (auto-86’ing a dish the instant an ingredient hits zero), posts that 86 to the kitchen channel, and updates the guest’s profile — all in real time, with no nightly exports and no re-keying invoices.',
    ],
    story: {
      heading: 'Built by an operator, because I lived the problem',
      body: [
        'I’ve worked nearly every role in this industry — from the host stand to Director of Operations of a multi-million-dollar restaurant company. I’ve seated guests, run the line, built the schedules, counted inventory long after close, and answered for the P&L.',
        'So I know the frustration firsthand: seven systems that don’t talk to each other, invoices re-keyed by hand, an 86 the floor hears about too late, labor that blows past budget before anyone notices. The software was supposed to make it easier — mostly it just added another login.',
        'Mise is my answer to all of it — everything I ever wished I’d had, in one connected place, running in real time. I built it to solve the exact problems I lived with for years, from someone who’s actually run the shift. And it does.',
      ],
      signoff: '— Jordan O’Brien, founder of Mise',
    },
    modules: [
      { name: 'Inventory', desc: 'Live depletion from POS sales, plate & recipe costing, waste log, variance counts, and auto-86 at zero stock.' },
      { name: 'Reservations & Guests', desc: 'Table-availability engine, waitlist with quotes, and a guest CRM that builds itself — visits, lifetime spend, allergies, VIP tags.' },
      { name: 'Scheduling & Labor', desc: 'Draft→publish schedules, a shift-swap marketplace with approvals, time clock, and overtime flagged before it’s worked.' },
      { name: 'Procurement & Vendors', desc: 'Vendor catalogs, suggested orders from live stock, receiving that updates cost & stock, and price-drift alerts.' },
      { name: 'Financials & P&L', desc: 'Computed prime cost (COGS + labor), a daily flash, a live 30-day P&L, and GL-categorized accounts payable.' },
      { name: 'Checklists & Ops', desc: 'Opening/closing templates, HACCP logs with captured values (temps, ppm), and a completion audit trail.' },
      { name: 'Team & Comms', desc: 'Channels, a manager logbook, read receipts, and automated posts (86 alerts, schedule published, price alerts).' },
      { name: 'Integrations', desc: 'Webhook adapters for Toast, Square & Lightspeed (Lavu, Olo, QuickBooks planned) — one sale event fans out to every module.' },
    ],
    pricing: [
      { name: 'Prep', price: '$149', for: 'Single concepts: inventory, checklists, team comms.' },
      { name: 'Service', price: '$329', for: 'Full house: adds reservations/CRM, scheduling & labor.' },
      { name: 'Prime', price: '$549', for: 'Operators who run on numbers: adds procurement, live P&L, API access.' },
      { name: 'Enterprise', price: 'Custom', for: 'Groups of 10+: SSO, data-warehouse feed, dedicated success manager.' },
    ],
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function programCategoryName(slug: string): string {
  return programCategories.find((c) => c.slug === slug)?.name ?? slug;
}
