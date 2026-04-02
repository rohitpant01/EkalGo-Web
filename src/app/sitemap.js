const BASE_URL = 'https://ekalgo.com';

const DESTINATIONS = [
  'goa', 'varkala', 'gokarna', 'manali', 'ladakh', 'spiti-valley',
  'udaipur', 'jaipur', 'hampi', 'munnar', 'waynad', 'coorg',
  'delhi', 'agra', 'mumbai', 'bangalore', 'rishikesh', 'pondicherry'
];

export default async function sitemap() {
  const staticRoutes = ['', '/explore', '/ai-planner', '/safety', '/pricing', '/privacy', '/security'].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const destinationRoutes = DESTINATIONS.map((city) => ({
    url: `${BASE_URL}/explore/${city}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const itineraryRoutes = DESTINATIONS.map((city) => ({
    url: `${BASE_URL}/explore/${city}/itinerary/3-day`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...destinationRoutes, ...itineraryRoutes];
}
