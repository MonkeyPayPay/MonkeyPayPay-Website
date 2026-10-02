// Family Christmas wish lists — powers the unlisted /north-pole page.
//
// TEMPORARY + SECRET: nothing else on the site links here (not the nav, footer,
// ⌘K palette, or sitemap) and the page is noindex. To retire it after the
// holidays, delete src/pages/north-pole.astro and this file.
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
  items: WishItem[];
}

export const wishlists: WishPerson[] = [
  {
    id: 'dad',
    name: 'Dad',
    tagline: 'Desk upgrades & sharp shirts',
    ribbon: '#e23a4a',
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
        note: 'Charles Tyrwhitt Trafalgar weave, one white and one black.',
        details: ['White & Black', 'Slim fit', '17.5 neck', '36 sleeve', 'Button'],
        links: [
          {
            label: 'Charles Tyrwhitt',
            href: 'https://www.charlestyrwhitt.com/us/non-iron-stretch-trafalgar-weave-shirt---white/FOA0019WHT.html',
          },
        ],
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
    name: 'Mom',
    tagline: 'List coming soon',
    ribbon: '#e0218a',
    items: [],
  },
  {
    id: 'paisley',
    name: 'Paisley',
    tagline: 'Dear Santa…',
    ribbon: '#2fb36b',
    items: [],
  },
];
