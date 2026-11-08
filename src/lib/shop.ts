// The home Shop row's products, read from the Shopify store at build time.
// First the store-wide feed (/products.json); where that is off (it answers 404 on this store
// today), each product's own feed (/products/<handle>.js). Anything that fails is left out, and
// if nothing comes back the row renders nothing: no placeholders.
import { shopUrl, shopFeatured } from '../data/site';

export type ShopProduct = {
  title: string;
  url: string;
  price: string; // "$30"
  image: string | null; // https://cdn.shopify.com/... (no size param)
};

const TIMEOUT_MS = 8000;

async function getJson(url: string): Promise<unknown | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS), headers: { accept: 'application/json' } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// "30.00" (products.json) or 3000 cents (product .js) -> "$30" / "$32.50".
function money(value: unknown, cents: boolean): string | null {
  const n = typeof value === 'number' ? value : Number.parseFloat(String(value));
  if (!Number.isFinite(n)) return null;
  const dollars = cents ? n / 100 : n;
  return `$${Number.isInteger(dollars) ? dollars : dollars.toFixed(2)}`;
}

const absolute = (src: unknown) =>
  typeof src === 'string' && src ? (src.startsWith('//') ? `https:${src}` : src) : null;

type FeedProduct = { title?: string; handle?: string; variants?: { price?: unknown }[]; images?: { src?: string }[] };
type OneProduct = { title?: string; handle?: string; price?: unknown; featured_image?: string };

let cache: Promise<ShopProduct[]> | null = null;

// SHOP_FEED_URL points the build at another host, e.g. an unreachable one to check that the row
// renders nothing when the store can't be read. Product links always go to the real store.
const feedBase = process.env.SHOP_FEED_URL || shopUrl;

async function load(): Promise<ShopProduct[]> {
  const feed = (await getJson(`${feedBase}/products.json?limit=250`)) as { products?: FeedProduct[] } | null;
  const found: (ShopProduct | null)[] = [];
  for (const want of shopFeatured) {
    const fromFeed = feed?.products?.find(
      (p) => p.handle === want.handle || p.title?.trim().toLowerCase() === want.title.toLowerCase(),
    );
    if (fromFeed) {
      const price = money(fromFeed.variants?.[0]?.price, false);
      found.push(
        price
          ? { title: fromFeed.title ?? want.title, url: `${shopUrl}/products/${fromFeed.handle}`, price, image: absolute(fromFeed.images?.[0]?.src) }
          : null,
      );
      continue;
    }
    const one = (await getJson(`${feedBase}/products/${want.handle}.js`)) as OneProduct | null;
    const price = one ? money(one.price, true) : null;
    found.push(
      one && price
        ? { title: one.title ?? want.title, url: `${shopUrl}/products/${one.handle ?? want.handle}`, price, image: absolute(one.featured_image) }
        : null,
    );
  }
  return found.filter((p): p is ShopProduct => p !== null);
}

export function shopProducts(): Promise<ShopProduct[]> {
  cache ??= load();
  return cache;
}

// A Shopify CDN image at a given width.
export function shopImage(src: string, width: number): string {
  const url = new URL(src);
  url.searchParams.set('width', String(width));
  return url.href;
}
