export type SubdomainType = 'sympathygifts' | 'memorialessentials' | 'blog' | null;

export const DOMAINS = {
  main: 'middletonfuneralservices.com',
  sympathygifts: 'sympathygifts.middletonfuneralservices.com',
  memorialessentials: 'memorialessentials.middletonfuneralservices.com',
  blog: 'blog.middletonfuneralservices.com',
};

/**
 * Detects active subdomain from window.location.hostname, URL search parameter, or hash parameters.
 */
export function getActiveSubdomain(): SubdomainType {
  if (typeof window === 'undefined') return null;

  const hostname = window.location.hostname.toLowerCase();
  
  // 1. Check hostname for subdomains (supporting any parent domain like middletonfuneralservices.com, middletonfunerals.com, or local/staging)
  if (
    hostname.startsWith('sympathygifts.') ||
    hostname.startsWith('flowers.') ||
    hostname.includes('.sympathygifts.') ||
    hostname.includes('.flowers.')
  ) {
    return 'sympathygifts';
  }
  if (
    hostname.startsWith('memorialessentials.') ||
    hostname.startsWith('shop.') ||
    hostname.includes('.memorialessentials.') ||
    hostname.includes('.shop.')
  ) {
    return 'memorialessentials';
  }
  if (
    hostname.startsWith('blog.') ||
    hostname.includes('.blog.')
  ) {
    return 'blog';
  }

  // 2. Check URL search parameters for preview, testing, or query-based routing
  const urlParams = new URLSearchParams(window.location.search);
  const paramSub = urlParams.get('subdomain')?.toLowerCase();
  if (paramSub === 'sympathygifts' || paramSub === 'flowers') {
    return 'sympathygifts';
  }
  if (paramSub === 'memorialessentials' || paramSub === 'shop') {
    return 'memorialessentials';
  }
  if (paramSub === 'blog') {
    return 'blog';
  }

  // 3. Check hash params if HashRouter is used (e.g., #/?subdomain=blog or #/blog)
  const hash = window.location.hash.toLowerCase();
  if (hash.includes('subdomain=sympathygifts') || hash.includes('subdomain=flowers') || hash.startsWith('#/flowers') || hash.startsWith('#/sympathy-gifts')) {
    return 'sympathygifts';
  }
  if (hash.includes('subdomain=memorialessentials') || hash.includes('subdomain=shop') || hash.startsWith('#/shop') || hash.startsWith('#/memorial-essentials')) {
    return 'memorialessentials';
  }
  if (hash.includes('subdomain=blog') || hash.startsWith('#/blog')) {
    return 'blog';
  }

  return null;
}

/**
 * Returns the route path so that all pages attached to subdomains open directly
 * and seamlessly within the web application.
 */
export function getSubdomainUrl(
  subdomain: 'sympathygifts' | 'memorialessentials' | 'blog' | 'main',
  internalFallbackPath: string
): string {
  // Always return the internal route path (e.g. /blog, /flowers, /shop)
  // so that clicking any subdomain-associated link opens directly in the application
  // rather than failing on unconfigured external DNS/subdomains.
  return internalFallbackPath;
}
