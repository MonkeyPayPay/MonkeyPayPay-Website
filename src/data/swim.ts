// bASS SWIM — two lines, one house.
//
// The chooser landing page (/bass-swim) sends visitors to each line's own
// brand page. When the real, standalone brand URLs are ready, just set
// `href` to the external URL (and flip `external: true`) — the chooser and
// every link updates automatically.
//
// SHOP (Shopify embedded): each brand page shows its own shop, right on the
// page, via Shopify's Buy Button. It stays "coming soon" until `shop` is
// filled in below. To go live, create a Shopify store + a collection per
// line, turn on the "Buy Button" sales channel, and drop the three values
// (store domain, Storefront access token, collection ID) into `shop` here —
// the embed appears automatically, styled in each brand's colors.

export interface SwimShop {
  /** e.g. 'bass-swim.myshopify.com' (the permanent .myshopify.com domain) */
  domain: string;
  /** Storefront API access token from the Buy Button channel */
  storefrontAccessToken: string;
  /** The Shopify collection ID to show as this line's shop */
  collectionId: string;
}

export interface SwimBrand {
  key: 'bass' | 'riverrapps';
  name: string;
  href: string;
  external: boolean;
  /** Buy-button accent color (matches each line's identity) */
  accent: string;
  accentText: string;
  /** Fill in to turn the on-page shop live; null = "Shop · coming soon" */
  shop: SwimShop | null;
}

export const swimBrands: Record<'bass' | 'riverrapps', SwimBrand> = {
  bass: {
    key: 'bass',
    name: 'bASS SWIM',
    href: '/bass-swim/bass', // ← swap to the live bASS SWIM URL later
    external: false,
    accent: '#e0218a',
    accentText: '#ffffff',
    shop: null, // ← paste { domain, storefrontAccessToken, collectionId } to go live
  },
  riverrapps: {
    key: 'riverrapps',
    name: 'American RiverRapps',
    href: '/bass-swim/riverrapps', // ← swap to the live RiverRapps URL later
    external: false,
    accent: '#b3202e',
    accentText: '#ffffff',
    shop: null, // ← paste { domain, storefrontAccessToken, collectionId } to go live
  },
};

export const swimLinkAttrs = (b: SwimBrand) =>
  b.external ? { target: '_blank', rel: 'noopener' } : {};
