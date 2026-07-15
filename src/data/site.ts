// Brand-wide settings. Edit these and they update everywhere on the site.

export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  name: 'MonkeyPayPay',
  /** Short line shown in the hero eyebrow and footer. */
  tagline: 'Apps that respect your time.',
  /** One or two sentences — used for SEO and the hero subhead. */
  description:
    'MonkeyPayPay designs and curates a family of mobile apps — across fitness, games, widgets, and more — built to be fast, focused, and a little bit delightful.',
  /** Final production domain. Update when you go live. */
  url: 'https://monkeypaypay.com',
  /** Legal entity / developer name used in the auto-generated legal pages. */
  developer: 'MonkeyPayPay',
  /** Contact address shown in the footer and legal pages. */
  contactEmail: 'hello@monkeypaypay.com',
  /** Add or remove as you like; delete all to hide the social row. */
  social: [
    // { label: 'X', href: 'https://x.com/monkeypaypay' },
    // { label: 'GitHub', href: 'https://github.com/monkeypaypay' },
  ] as SocialLink[],
};

export type Site = typeof site;
