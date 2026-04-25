import destinationsData from '../data/destinations.json';

export default function sitemap() {
  const baseUrl = 'https://ekalgo.com';
  const destinations = destinationsData.destinations;

  // 1. Static Routes
  const staticRoutes = [
    '',
    '/explore',
    '/ai-planner',
    '/features',
    '/how-it-works',
    '/top-destinations-2026',
    '/demo',
    '/contact',
    '/about',
    '/pricing',
    '/safety',
    '/terms',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. City Explore Guides (High Priority)
  const cityExploreRoutes = destinations.map((d) => ({
    url: `${baseUrl}/explore/${d.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 3. Vibe-Based Silos (Medium Priority)
  const vibes = ['budget', 'solo', 'romantic'];
  const vibeRoutes = destinations.flatMap((d) => 
    vibes.map((vibe) => ({
      url: `${baseUrl}/explore/${d.id}/${vibe}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  );

  // 4. Hidden Gems Silos
  const hiddenGemsRoutes = destinations.map((d) => ({
    url: `${baseUrl}/hidden-gems/${d.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // 5. Weekend Getaways Silos
  const getawaysRoutes = destinations.map((d) => ({
    url: `${baseUrl}/getaways/${d.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // 6. Safety Report Silos
  const safetyRoutes = destinations.map((d) => ({
    url: `${baseUrl}/safety/${d.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...cityExploreRoutes,
    ...vibeRoutes,
    ...hiddenGemsRoutes,
    ...getawaysRoutes,
    ...safetyRoutes,
  ];
}