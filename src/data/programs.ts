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

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
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
  /** Square brand mark (path under /public). Falls back to a letter monogram. */
  logo?: string;
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
  /** Product screenshots for the detail-page gallery. */
  screenshots?: Screenshot[];
}

export const programCategories: ProgramCategory[] = [
  { slug: 'restaurant', name: 'Restaurant' },
  { slug: 'developer', name: 'Developer Tools' },
  // Future categories go here (retail, healthcare, logistics, …).
];

export const programs: Program[] = [
  {
    slug: 'mise',
    name: 'Mise',
    category: 'restaurant',
    tagline: 'The restaurant operating system.',
    logo: '/software/mise/mark.webp',
    description:
      'One platform that runs the whole restaurant in real time — reservations, floor, private events, online orders, inventory, scheduling, procurement, a live P&L, team comms, and guest marketing — every module reading and writing the same live data, so a check closed on the POS moves sales, depletes stock, and updates the guest across every screen within the same second.',
    status: 'in-development',
    // url: 'https://mise.example.com',      // ← set when there's a marketing site
    // demoUrl: 'https://demo.mise.example', // ← set when the live demo is deployed
    highlights: [
      'Reservations, live floor plan & a guest CRM that builds itself',
      'Private events & catering — proposals, BEOs & online e-signature',
      'Online orders, live inventory with auto-86 & menu engineering',
      'Scheduling & labor against a live demand forecast',
      'A live, computed P&L — for one location or the whole group',
      'HACCP checklists, team comms & self-computing guest marketing',
    ],
    overview: [
      'Most restaurants run on seven tabs and seven subscriptions — a POS back office, reservations, a scheduler, procurement, accounting, checklists, and a group chat — none of which talk to each other. Mise replaces the whole stack with one platform, one login, and one source of truth, from the host stand to the pass to the office.',
      'Everything is connected. A single closed check on your POS flows straight into Mise: it adds to today’s sales and P&L, depletes inventory through recipe costing (auto-86’ing a dish the instant an ingredient hits zero), posts that 86 to the kitchen channel, and updates the guest’s profile — all in real time, with no nightly exports and no re-keying invoices.',
      'It reaches past the back office, too: a private-events pipeline with banquet event orders and e-signed proposals, an online-order queue, a fee-free trilingual (English, Spanish & French) booking widget, guest marketing that segments itself, menu engineering, and a multi-location portfolio that puts every P&L side by side.',
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
      { name: 'Reservations & Guests', desc: 'Table-availability engine, waitlist with quotes, one-tap confirms, reminder texts, and a guest CRM that builds itself — visits, lifetime spend, allergies, VIP tags.' },
      { name: 'Live Floor Plan', desc: 'A real-time floor color-coded by table status (seated / seating soon / free), with a drag-and-drop room editor and a printable pre-shift brief for the pass.' },
      { name: 'Private Events & Catering', desc: 'A lead→proposal→confirmed pipeline, a space calendar with double-booking protection, banquet event orders, kitchen production sheets, and client proposals accepted with an online e-signature and deposit.' },
      { name: 'Online Orders', desc: 'A live pickup/delivery queue fed by partner webhooks or manual entry — 86’ed dishes refused up front, a per-location throttle, and completed orders posting sales like any POS check.' },
      { name: 'Guest Marketing', desc: 'Segments that compute themselves from the guest graph (VIPs, lapsed regulars, first-timers, big spenders), personalized campaigns through an auditable outbox, and one-click duplicate merging.' },
      { name: 'Inventory', desc: 'Live depletion from POS sales, plate & recipe costing that moves with vendor prices, barcode counts, cross-location transfers, a prep plan from demand forecasts, and auto-86 at zero stock.' },
      { name: 'Menu Engineering', desc: 'Every item plotted by popularity × margin into stars, plowhorses, puzzles & dogs — with real plate costs and contribution margins.' },
      { name: 'Scheduling & Labor', desc: 'Draft→publish schedules, a shift-swap marketplace with approvals, time clock, a demand forecast that suggests hours by role, overtime flagged before it’s worked, plus tip pooling and break-compliance tracking from the same punches.' },
      { name: 'Procurement & Vendors', desc: 'Vendor catalogs with price-change tracking, suggested orders from live stock, receiving that updates cost & stock, and paste-an-email invoice capture that drafts a PO.' },
      { name: 'Financials & P&L', desc: 'A live, computed prime cost (accrual COGS + labor with burden), a daily flash, budget-vs-actual, gift cards & house accounts, server-performance reports, CSV/GL export, and a multi-location portfolio putting every P&L side by side.' },
      { name: 'Checklists & HACCP', desc: 'Opening/closing/HACCP checklists with temperature capture (an out-of-range reading alerts managers instantly), photo verification, and corrective actions.' },
      { name: 'Team, Comms & Integrations', desc: 'Channels and a manager logbook with automated posts, PIN + authenticator MFA, device management and SSO (Google, Entra, Okta), plus webhook adapters for Toast, Square, Lightspeed, Lavu, Olo & QuickBooks — each with its own signed secret and kill-switch.' },
    ],
    pricing: [
      { name: 'Prep', price: '$149', for: 'Single concepts: inventory, checklists, team comms.' },
      { name: 'Service', price: '$329', for: 'Full house: adds reservations/CRM, scheduling & labor.' },
      { name: 'Prime', price: '$549', for: 'Operators who run on numbers: adds procurement, live P&L, API access.' },
      { name: 'Enterprise', price: 'Custom', for: 'Groups of 10+: SSO, data-warehouse feed, dedicated success manager.' },
    ],
    screenshots: [
      { src: '/software/mise/screens/02-dashboard-live-flash.webp', alt: 'Mise dashboard showing the daily flash', caption: 'The daily flash — net sales, labor %, covers and the live 86 board, every number updating over a socket.' },
      { src: '/software/mise/screens/03-reservations-and-guest-crm.webp', alt: 'Reservations and guest CRM', caption: 'Tonight’s book with VIP and allergy flags from a guest CRM that builds itself.' },
      { src: '/software/mise/screens/04-floor-plan-live.webp', alt: 'Live floor plan', caption: 'A live floor plan color-coded by table status, with a drag-and-drop editor.' },
      { src: '/software/mise/screens/06-events-pipeline-and-calendar.webp', alt: 'Events pipeline and calendar', caption: 'Private events: a lead→proposal→confirmed pipeline with a double-booking-proof space calendar.' },
      { src: '/software/mise/screens/07-event-BEO-and-production.webp', alt: 'Banquet event order and production sheet', caption: 'Banquet event orders and kitchen production sheets that scale the menu to the guest count.' },
      { src: '/software/mise/screens/27-client-proposal-esignature.webp', alt: 'Client proposal with e-signature', caption: 'The client’s own proposal page — review, accept with an e-signature, and pay the deposit online.' },
      { src: '/software/mise/screens/08-online-order-queue.webp', alt: 'Online order queue', caption: 'A live online-order queue that refuses 86’ed dishes and posts sales like any POS check.' },
      { src: '/software/mise/screens/09-marketing-segments-campaigns.webp', alt: 'Marketing segments and campaigns', caption: 'Guest marketing: segments that compute themselves, campaigns through an auditable outbox.' },
      { src: '/software/mise/screens/10-inventory-and-prep-plan.webp', alt: 'Inventory and prep plan', caption: 'Live on-hand with auto-86, plate costs that move with vendor prices, and a demand-driven prep plan.' },
      { src: '/software/mise/screens/11-menu-engineering-quadrants.webp', alt: 'Menu engineering quadrants', caption: 'Menu engineering: every item plotted by popularity × margin into stars, plowhorses, puzzles & dogs.' },
      { src: '/software/mise/screens/12-scheduling-labor-forecast.webp', alt: 'Scheduling and labor forecast', caption: 'Scheduled vs. actual labor against a demand forecast, with overtime warnings and a swap board.' },
      { src: '/software/mise/screens/13-procurement-vendors-POs.webp', alt: 'Procurement, vendors and purchase orders', caption: 'Vendors, catalog SKUs with price tracking, POs with receiving, and paste-an-email invoice capture.' },
      { src: '/software/mise/screens/14-financials-live-pnl.webp', alt: 'Live profit and loss statement', caption: 'A live, computed P&L — accrual COGS, labor with burden, prime cost and net margin, none of it typed in.' },
      { src: '/software/mise/screens/16-multi-location-portfolio.webp', alt: 'Multi-location portfolio', caption: 'The portfolio: every location’s P&L side by side, plus the consolidated line and budget pace.' },
      { src: '/software/mise/screens/17-haccp-checklists.webp', alt: 'HACCP checklists', caption: 'Opening/closing/HACCP checklists with temperature capture and instant out-of-range alerts.' },
      { src: '/software/mise/screens/25-public-booking-widget.webp', alt: 'Public booking widget', caption: 'An embeddable, fee-free booking widget — real-time availability, deposits and waitlist, in English, Spanish & French.' },
      { src: '/software/mise/screens/28-gift-cards-and-house-accounts.webp', alt: 'Gift cards and house accounts', caption: 'Gift cards and house accounts — issued, redeemed, and reconciled inside the same ledger.' },
      { src: '/software/mise/screens/30-reports-heatmap-server-performance.webp', alt: 'Server performance heatmap report', caption: 'Server-performance reports — sales, covers and upsells by server, shift and section.' },
      { src: '/software/mise/screens/31-tip-pool-and-break-compliance.webp', alt: 'Tip pool and break compliance', caption: 'Tip pooling and break-compliance tracking, computed from the same punches that drive labor.' },
    ],
  },
  {
    slug: 'prometheus',
    name: 'Prometheus',
    category: 'developer',
    tagline: 'A language where whole classes of bugs can’t exist.',
    description:
      'A pure, statically-typed functional language designed so that entire categories of software failure — memory corruption, data races, null, hidden side effects, missing cases — are unrepresentable by construction rather than merely discouraged. It now compiles through three native backends (C, JavaScript, and WebAssembly), with algebraic effect handlers, traits, and a browser playground running the real toolchain.',
    status: 'in-development',
    highlights: [
      'No null, no shared mutable state, no manual memory',
      'Object-capability effects — a function’s type proves what it can touch',
      'Algebraic effect handlers with resumable control',
      'Traits with functional dependencies; full type inference',
      'Total pattern matching + executable `check` specifications',
      'Compiles to C, JavaScript & WebAssembly (WasmGC)',
    ],
    overview: [
      'Prometheus is built around a small number of load-bearing ideas, each chosen because it deletes a category of bugs rather than merely discouraging it. Pure value semantics remove memory corruption, dangling pointers, and leaks. No shared mutable state means data races and deadlocks simply can’t be written, and parallelism stays deterministic. An object-capability model makes side effects require an unforgeable capability value — so a function’s signature proves exactly what it can touch, closing the door on hidden effects and supply-chain “phone home.”',
      'On top of that: pattern matches are checked for totality at compile time (no missing-case bugs), `null` doesn’t exist (partial operations return an ordinary Option type), and full Hindley–Milner-style inference keeps annotations optional. Executable specifications — `check`, with property-based generation and shrinking — are a language construct that doubles as living documentation, and machine-readable `intent` metadata keeps docs from going stale.',
      'It has grown from a bootstrap interpreter into a real toolchain: three native compiler backends (C, JavaScript, and WebAssembly/WasmGC), algebraic effect handlers with `resume`, traits with functional dependencies, generator-fusion optimizations, a `prom lsp` language server, and a browser playground that runs the actual compiler via WebAssembly. Latest release: v0.13 “Prism.” A personal research project exploring how much safety a language can guarantee before you ever run it.',
    ],
  },
];

export function getProgram(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}

export function programCategoryName(slug: string): string {
  return programCategories.find((c) => c.slug === slug)?.name ?? slug;
}
