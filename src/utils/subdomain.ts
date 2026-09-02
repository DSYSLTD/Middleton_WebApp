export type SubdomainType = 'sympathygifts' | 'memorialessentials' | 'blog' | null;

export const DOMAINS = {
  main: 'middletonfuneralservices.com',
  sympathygifts: 'sympathygifts.middletonfuneralservices.com',
  memorialessentials: 'memorialessentials.middletonfuneralservices.com',
  blog: 'blog.middletonfuneralservices.com',
};

/**
 * Detects active subdomain from window.location.hostname or URL search parameter.
 */
export function getActiveSubdomain(): SubdomainType {
  if (typeof window === 'undefined') return null;

  const hostname = window.location.hostname.toLowerCase();
  
  // 1. Check hostname
  if (hostname.includes('sympathygifts.middletonfuneralservices.com') || hostname.startsWith('sympathygifts.')) {
    return 'sympathygifts';
  }
  if (hostname.includes('memorialessentials.middletonfuneralservices.com') || hostname.startsWith('memorialessentials.')) {
    return 'memorialessentials';
  }
  if (hostname.includes('blog.middletonfuneralservices.com') || hostname.startsWith('blog.')) {
    return 'blog';
  }

  // 2. Check URL search parameters or hash params for preview/testing support
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

  // Check hash params if HashRouter is used
  if (window.location.hash.includes('subdomain=sympathygifts')) {
    return 'sympathygifts';
  }
  if (window.location.hash.includes('subdomain=memorialessentials')) {
    return 'memorialessentials';
  }
  if (window.location.hash.includes('subdomain=blog')) {
    return 'blog';
  }

  return null;
}

/**
 * Returns the target full domain URL or route path depending on environment.
 */
export function getSubdomainUrl(
  subdomain: 'sympathygifts' | 'memorialessentials' | 'blog' | 'main',
  internalFallbackPath: string
): string {
  if (typeof window === 'undefined') return internalFallbackPath;

  const hostname = window.location.hostname.toLowerCase();
  const isCustomDomainEnv = hostname.includes('middletonfuneralservices.com');

  if (subdomain === 'sympathygifts') {
    if (isCustomDomainEnv) {
      return `https://${DOMAINS.sympathygifts}`;
    }
    return internalFallbackPath;
  }

  if (subdomain === 'memorialessentials') {
    if (isCustomDomainEnv) {
      return `https://${DOMAINS.memorialessentials}`;
    }
    return internalFallbackPath;
  }

  if (subdomain === 'blog') {
    if (isCustomDomainEnv) {
      return `https://${DOMAINS.blog}`;
    }
    return internalFallbackPath;
  }

  if (subdomain === 'main') {
    if (isCustomDomainEnv) {
      return `https://${DOMAINS.main}`;
    }
    return '/';
  }

  return internalFallbackPath;
}
