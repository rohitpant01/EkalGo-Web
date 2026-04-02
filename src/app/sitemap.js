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
  '/top-destinations-2026'
];

export default async function sitemap() {
  // 1. Core Static Pages
  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const destinations = destinationsData.destinations;

  // 2. City Explore Hubs (/explore/[city])
  const destinationRoutes = destinations.map((city) => ({
    url: `${BASE_URL}/explore/${city.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 3. Hidden Gems Silo (/hidden-gems/[city])
  const hiddenGemsRoutes = destinations.map((city) => ({
    url: `${BASE_URL}/hidden-gems/${city.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // 4. Weekend Getaways Silo (/getaways/[city]) (Fixed prefix)
  const getawaysRoutes = destinations.map((city) => ({
    url: `${BASE_URL}/getaways/${city.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // 5. Multi-Duration Itinerary Silo (/itinerary/[city]/[duration])
  const durations = ['2-day-trip', '3-day-trip', '5-day-trip'];
  const itineraryRoutes = destinations.flatMap((city) =>
    durations.map((duration) => ({
      url: `${BASE_URL}/itinerary/${city.slug}/${duration}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    }))
  );

  return [
    ...staticRoutes,
    ...destinationRoutes,
    ...hiddenGemsRoutes,
    ...getawaysRoutes,
    ...itineraryRoutes
  ];
}
