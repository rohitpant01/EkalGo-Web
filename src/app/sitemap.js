import destinationsData from '@/data/destinations.json';

export default function sitemap() {
  const baseUrl = 'https://ekalgo.com';
  const durations = ['2-day-trip', '3-day-trip', '5-day-trip'];

  // Base pages
  const staticPages = [
    '',
    '/explore',
    '/how-it-works',
    '/safety',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  }));

  // Programmatic Itinerary Pages
  const itineraryPages = destinationsData.destinations.flatMap((city) =>
    durations.map((duration) => ({
      url: `${baseUrl}/itinerary/${city.slug}/${duration}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  );

  // Vibe Pages (Phase B - Index Explosion)
  const vibes = ['solo', 'romantic', 'budget'];
  const vibePages = destinationsData.destinations.flatMap((city) =>
    vibes.map((vibe) => ({
      url: `${baseUrl}/explore/${city.slug}/${vibe}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }))
  );

  // Pillar City Pages
  const cityPages = destinationsData.destinations.map((city) => ({
    url: `${baseUrl}/explore/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticPages, ...cityPages, ...vibePages, ...itineraryPages];
}