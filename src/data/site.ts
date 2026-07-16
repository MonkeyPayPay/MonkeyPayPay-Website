// Brand-wide settings. Edit these and they update everywhere on the site.

export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  name: 'MonkeyPayPay',
  /** Short line shown in the hero eyebrow and footer. */
  tagline: 'Apps made with love, for Paisley.',
  /** One or two sentences — used for SEO and the hero subhead. */
  description:
    'MonkeyPayPay is a family of mobile apps — across fitness, games, widgets, and more — built by one dad to help give his daughter Paisley the best life possible.',
  /** Final production domain. Update when you go live. */
  url: 'https://monkeypaypay.com',
  /** Legal entity / developer name used in the auto-generated legal pages. */
  developer: 'MonkeyPayPay',
  /** Contact address shown in the footer and legal pages. */
  contactEmail: 'support@monkeypaypay.com',
  /**
   * "Support Paisley" donation link.
   * Paste your PayPal.me / Ko-fi / Buy Me a Coffee URL below. Until you add a
   * real https link, the site invites visitors to reach out by email instead —
   * so there's never a broken button on the live site.
   */
  donate: {
    label: 'Support Paisley',
    url: 'https://www.paypal.com/ncp/payment/RX7XKC9W7XGWL', // PayPal "Support Paisley" (customer-set amount)
  },
  /** Add or remove as you like; delete all to hide the social row. */
  social: [
    // { label: 'X', href: 'https://x.com/monkeypaypay' },
    // { label: 'GitHub', href: 'https://github.com/monkeypaypay' },
  ] as SocialLink[],
};

/** True only when a real donation link has been set. */
export const donateReady =
  site.donate.url.trim().length > 0 && site.donate.url.startsWith('http');

export type Site = typeof site;
