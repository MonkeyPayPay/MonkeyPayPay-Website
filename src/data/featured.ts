// The featured flagship game — showcased on its own band on the homepage,
// above the app directory. When it's deployed, set `playUrl` to the live URL
// and the "Play" chip turns into a live button automatically.

export interface Fighter {
  name: string;
  img: string;
}

export interface FeaturedGame {
  name: string;
  tagline: string;
  blurb: string;
  logo: string;
  hero: string;
  icon: string;
  /** Live URL to play in the browser. Leave '' for a "coming soon" state. */
  playUrl: string;
  /** Apple App Store URL. Leave '' for "coming soon". */
  appStoreUrl: string;
  /** Google Play URL. Leave '' for "coming soon". */
  playStoreUrl: string;
  status: string;
  highlights: string[];
  fighters: Fighter[];
}

export const featuredGame: FeaturedGame = {
  name: 'Cuddle Crush',
  tagline: 'Squeeze first. Ask questions never.',
  blurb:
    'Our flagship game: a browser-based, top-down multiplayer arena brawler. Twin-stick movement and aim, 2½-minute matches with sudden-death overtime, and a roster of 15 original fighters. Practice against bots offline, queue into server-authoritative matches, or party up with friends over voice chat.',
  logo: '/games/cuddle-crush/logo.webp',
  hero: '/games/cuddle-crush/hero.webp',
  icon: '/games/cuddle-crush/icon.webp',
  playUrl: '', // ← set to the live game URL once deployed
  appStoreUrl: '', // ← set to the App Store link once published
  playStoreUrl: '', // ← set to the Google Play link once published
  status: 'in-development',
  highlights: [
    '15 original fighters, each with a kit, special & passive',
    'Four modes — Rumble, Skirmish 3v3, Shardfall & Duel',
    'Server-authoritative play with client-side prediction',
    'Parties with live lobby, text & voice chat',
    'Progression, a cosmetic shop & a monthly season pass',
  ],
  fighters: [
    { name: 'Bram', img: '/games/cuddle-crush/fighter-bram.webp' },
    { name: 'Finn', img: '/games/cuddle-crush/fighter-finn.webp' },
    { name: 'Vex', img: '/games/cuddle-crush/fighter-vex.webp' },
    { name: 'Thornroot', img: '/games/cuddle-crush/fighter-thornroot.webp' },
    { name: 'Lumen', img: '/games/cuddle-crush/fighter-lumen.webp' },
    { name: 'Liria', img: '/games/cuddle-crush/fighter-liria.webp' },
  ],
};
