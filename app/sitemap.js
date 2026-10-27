const routes = ['', '/about', '/services', '/gallery', '/reviews', '/contact'];

export const dynamic = 'force-static';

export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (!siteUrl) return [];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
