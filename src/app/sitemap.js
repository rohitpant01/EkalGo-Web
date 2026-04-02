import destinationsData from '@/data/destinations.json';

const BASE_URL = 'https://ekalgo.com';

const STATIC_ROUTES = [
  '',
  '/explore',
  '/ai-planner',
  '/safety',
  '/pricing',
  '/privacy',
  '/security',
  '/top-destinations-2026',

  // 🔥 ADD HUB PAGES
  '/hidden-gems-india',
  '/itineraries-india',
  '/weekend-getaways-india'
];

export default async function sitemap() {
  const now = new Date().toISOString();

  // Static routes
  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const destinations = destinationsData.destinations;

  // Explore pages
  const destinationRoutes = destinations.map((city) => ({
    url: `${BASE_URL}/explore/${city.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Hidden gems
  const hiddenGemsRoutes = destinations.map((city) => ({
    url: `${BASE_URL}/hidden-gems/${city.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // ✅ FIXED getaways (match your actual routes)
  const getawaysRoutes = destinations.map((city) => ({
    url: `${BASE_URL}/getaways/from-${city.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Itineraries (multi-duration)
  const durations = ['2-day-trip', '3-day-trip', '5-day-trip'];

  const itineraryRoutes = destinations.flatMap((city) =>
    durations.map((duration) => ({
      url: `${BASE_URL}/itinerary/${city.slug}/${duration}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    }))
  );

  return [
    ...staticRoutes,
    ...destinationRoutes,
    ...hiddenGemsRoutes,
    ...getawaysRoutes,
    ...itineraryRoutes,
  ];
}