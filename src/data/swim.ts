// bASS SWIM — two lines, one house.
//
// The chooser landing page (/bass-swim) sends visitors to each line's own
// brand page. When the real, standalone brand URLs are ready, just set
// `href` to the external URL (and flip `external: true`) — the chooser and
// every link updates automatically.

export interface SwimBrand {
  key: 'bass' | 'riverrapps';
  name: string;
  href: string;
  external: boolean;
}

export const swimBrands: Record<'bass' | 'riverrapps', SwimBrand> = {
  bass: {
    key: 'bass',
    name: 'bASS SWIM',
    href: '/bass-swim/bass', // ← swap to the live bASS SWIM URL later
    external: false,
  },
  riverrapps: {
    key: 'riverrapps',
    name: 'American RiverRapps',
    href: '/bass-swim/riverrapps', // ← swap to the live RiverRapps URL later
    external: false,
  },
};

export const swimLinkAttrs = (b: SwimBrand) =>
  b.external ? { target: '_blank', rel: 'noopener' } : {};
