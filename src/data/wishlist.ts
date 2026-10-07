// Family Christmas wish lists — powers the unlisted /north-pole page.
//
// TEMPORARY + SECRET: nothing else on the site links here (not the nav, footer,
// ⌘K palette, or sitemap) and the page is noindex. To retire it after the
// holidays, delete src/pages/north-pole.astro and this file.
//
// Family video: drop an .mp4 into public/north-pole/ and set `familyVideo.src`
// (e.g. '/north-pole/family.mp4'), OR paste an unlisted YouTube video's id into
// `youtubeId`. Until one is set, the page shows a "coming soon" screen.
//
// To add a gift: push an item onto a person's `items`. Each item can list
// several places to buy it (`links`); the first one is shown as the main button.

export interface WishLink {
  /** Store name shown on the button, e.g. "Amazon". */
  label: string;
  href: string;
}

export interface WishItem {
  title: string;
  /** Emoji shown on the gift tag. */
  icon: string;
  /** One short line of context. */
  note?: string;
  /** Size / colour / spec chips. */
  details?: string[];
  links: WishLink[];
}

export interface WishPerson {
  /** URL-safe id, used for the tab + #anchor. */
  id: string;
  name: string;
  /** Short line under the name on the gift tag. */
  tagline: string;
  /** Ribbon colour for this person's presents. */
  ribbon: string;
  /** 8-bit sprite strip (4 frames: idle, bob, wave, wave) in public/north-pole/sprites/. */
  sprite: string;
  /** Optional animated photo strip used instead of `sprite` (see scripts/north-pole-photo-sprite.cjs). */
  photoSprite?: {
    src: string;
    frames: number;
    /** Frame width ÷ height. */
    aspect: number;
    /** On-screen height in "sprite pixels" (×2–4 by context). Default 42; grown-ups taller. */
    height?: number;
  };
  items: WishItem[];
}

export const wishlists: WishPerson[] = [
  {
    id: 'dad',
    name: 'Paisley’s Dad',
    tagline: 'Desk upgrades & sharp shirts',
    ribbon: '#e23a4a',
    sprite: '/north-pole/sprites/dad.png',
    // Cut from Dad's 6-frame floss-dance sheet (Santa hat, open black shirt, jeans).
    photoSprite: { src: '/north-pole/sprites/dad-photo.webp', frames: 6, aspect: 259 / 300, height: 58 },
    items: [
      {
        title: 'Gift cards',
        icon: '🎁',
        note: 'Any of these, any amount, always a hit.',
        links: [
          { label: 'The Grotto Menswear', href: 'https://thegrottomenswear.com/' },
          {
            label: 'State & Liberty',
            href: 'https://stateandliberty.com/pages/search?q=state%20%26%20liberty%20gift%20card',
          },
          { label: 'Costco', href: 'https://www.costco.com/cash-cards-gift-certificates.html' },
          {
            label: 'Amazon',
            href: 'https://www.amazon.com/s?k=gift+card&i=gift-cards&rh=n%3A2238192011%2Cp_123%3A323125',
          },
          { label: 'Claude', href: 'https://claude.ai/gift' },
        ],
      },
      {
        title: 'Non-iron dress shirts',
        icon: '👔',
        note: 'Charles Tyrwhitt Non-Iron Stretch Poplin, one white and one black.',
        details: ['White & Black', 'Slim fit', '17.5 neck', '36 sleeve', 'Button'],
        links: [
          {
            label: 'White · Charles Tyrwhitt',
            href: 'https://share.google/gtKy0ucsMYrEDMNWK',
          },
          {
            label: 'Black · Charles Tyrwhitt',
            href: 'https://www.charlestyrwhitt.com/us/non-iron-stretch-poplin-shirt---black/FON0709BLK.html',
          },
        ],
      },
      {
        title: 'Grunt Style American Flag shirt',
        icon: '🇺🇸',
        note: 'The patriotic flag tee, in white and in black.',
        details: ['White', 'Black'],
        links: [{ label: 'Grunt Style', href: 'https://share.google/1xorKN3HLTSRHgYD9' }],
      },
      {
        title: 'Grunt Style “Still Standing” flag shirt',
        icon: '🦅',
        note: 'The Still Standing American Flag shirt.',
        links: [{ label: 'Grunt Style', href: 'https://share.google/xIY55Bm79lusZZtge' }],
      },
      {
        title: 'Dell UltraSharp 40" curved monitor',
        icon: '🖥️',
        note: 'Model U4025QW. The 5K2K Thunderbolt hub one.',
        details: ['U4025QW'],
        links: [
          {
            label: 'Dell',
            href: 'https://www.dell.com/en-us/shop/monitors/apd/dell-ultrasharp-40-curved-thunderbolt-hub-monitor-u4025qw/u4025qw_monitor/-',
          },
          { label: 'Amazon', href: 'https://www.amazon.com/dp/B0D1TX35MQ' },
          {
            label: 'Micro Center',
            href: 'https://www.microcenter.com/product/678791/dell-u4025qw-397-5k-wqhd-(5120-x-2160)-120hz-wide-curved-screen-monitor',
          },
        ],
      },
      {
        title: 'Logitech MX Mechanical keyboard',
        icon: '⌨️',
        note: 'Wireless, backlit, full size.',
        links: [
          { label: 'Logitech', href: 'https://www.logitech.com/en-us/shop/p/mx-mechanical' },
          { label: 'Amazon', href: 'https://www.amazon.com/dp/B09LK1P1RD' },
          {
            label: 'Micro Center',
            href: 'https://www.microcenter.com/product/649519/logitech-mx-illuminated-mechanical-wireless-performance-keyboard',
          },
        ],
      },
      {
        title: 'Logitech MX Master 4 mouse',
        icon: '🖱️',
        note: 'The new one (Master 4, not 3S).',
        links: [
          { label: 'Logitech', href: 'https://www.logitech.com/en-us/shop/p/mx-master-4.910-007558' },
          {
            label: 'Micro Center',
            href: 'https://www.microcenter.com/product/700888/logitech-mx-master-4-for-mac-wireless-mouse-black',
          },
          { label: 'Amazon', href: 'https://www.amazon.com/dp/B0FC5X4F8G' },
        ],
      },
    ],
  },
  {
    id: 'mom',
    name: 'Paisley’s Mom',
    tagline: 'Treat yourself, Mama',
    ribbon: '#e0218a',
    sprite: '/north-pole/sprites/mom.png',
    // Cut from Mom's 6-frame dance sheet (Santa hat, silver boots).
    photoSprite: { src: '/north-pole/sprites/mom-photo.webp', frames: 6, aspect: 214 / 300, height: 56 },
    items: [
      {
        title: 'Target gift card',
        icon: '🎯',
        note: 'Any amount, for whatever she wants.',
        links: [{ label: 'Target', href: 'https://share.google/tbdksKbYzdBOzW30h' }],
      },
      {
        title: 'Nails',
        icon: '💅',
        note: 'A nail appointment or gift card at her spot: 1160 E Imperial Hwy, Placentia, CA 92870.',
        links: [
          {
            label: 'Find it on Maps',
            href: 'https://www.google.com/maps/search/?api=1&query=1160+E+Imperial+Hwy%2C+Placentia%2C+CA+92870',
          },
        ],
      },
      {
        title: 'MacBook Pro',
        icon: '💻',
        links: [{ label: 'Apple', href: 'https://share.google/GuZAtZ5nopRknjoAm' }],
      },
      {
        title: 'New iPhone',
        icon: '📱',
        note: 'iPhone 18 Pro Max.',
        details: ['256GB', 'Silver'],
        links: [{ label: 'Apple', href: 'https://share.google/u7zpsbVbjgEu9A6Mv' }],
      },
      {
        title: 'Coffee',
        icon: '☕',
        note: 'A Coffee Bean & Tea Leaf eGift card.',
        links: [{ label: 'Coffee Bean & Tea Leaf', href: 'https://share.google/Z3hYARLjt8N7tOuql' }],
      },
    ],
  },
  {
    id: 'paisley',
    name: 'Paisley',
    tagline: 'Dear Santa…',
    ribbon: '#2fb36b',
    sprite: '/north-pole/sprites/paisley.png',
    // Cut from the owner's 6-frame sheet of Paisley standing, jumping + cheering.
    photoSprite: { src: '/north-pole/sprites/paisley-photo.webp', frames: 6, aspect: 203 / 300 },
    items: [],
  },
];

export const familyVideo: {
  /** Self-hosted file, e.g. '/north-pole/family.mp4' (keep it under ~50 MB). */
  src?: string;
  /** Optional WebM fallback for browsers without H.264. */
  webm?: string;
  /** Optional still shown before it plays, e.g. '/north-pole/family-poster.jpg'. */
  poster?: string;
  /** Or an unlisted YouTube video id (the part after watch?v=). */
  youtubeId?: string;
  title: string;
} = {
  title: 'Merry Christmas from Paisley’s family',
  // Owner's five clips joined back to back (49 s, 720p) with an ElevenLabs
  // music + sound-effects track. Re-make: see public/north-pole/video/README.md.
  src: '/north-pole/video/family.mp4',
  webm: '/north-pole/video/family.webm',
  poster: '/north-pole/video/poster.webp',
};
