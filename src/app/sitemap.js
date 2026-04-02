import destinationsData from '@/data/destinations.json';

const BASE_URL = 'https://ekalgo.com';

const STATIC_ROUTES = [
  '',
  '/explore',
  '/ai-planner',
  '/safety',
  '/pricing',
  '/privacy',
  '/security'
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

  // 4. Weekend Getaways Silo (/getaways/from-[city])
  const getawaysRoutes = destinations.map((city) => ({
    url: `${BASE_URL}/getaways/from-${city.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // 5. Advanced Itinerary Silo (/itinerary/[city]/[duration])
  const itineraryRoutes = destinations.map((city) => ({
    url: `${BASE_URL}/itinerary/${city.slug}/3-day-trip`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...destinationRoutes,
    ...hiddenGemsRoutes,
    ...getawaysRoutes,
    ...itineraryRoutes
  ];
}
