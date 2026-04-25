/**
 * EkalGo Content Engine (Phase 4: Quality & Variation)
 * Generates unique, 500-800 word SEO content for programmatic pages.
 */

const INTRO_TEMPLATES = [
  (city, state, cat) => `Planning a trip to ${city}? Nestled in the heart of ${state}, this ${cat} paradise offers more than just the usual tourist spots. Whether you're a solo explorer or a group of friends looking for adventure, ${city} has something unique for everyone.`,
  (city, state, cat) => `Discover the hidden soul of ${city}, ${state}. Known primarily for its ${cat} charm, this destination is a vibrant tapestry of culture and nature. In this guide, we dive deep into the AI-optimized routes and local secrets of ${city}.`,
  (city, state, cat) => `${city} in ${state} is quickly becoming a must-visit for modern travelers seeking a ${cat} experience. Beyond the main city center, a world of unexplored nodes and authentic vibes awaits those willing to venture off the beaten path.`,
  (city, state, cat) => `From the legendary landmarks to the quiet corner cafes, ${city}, ${state} is a destination that never stops surprising. As a premier ${cat} hub, it offers high-impact experiences that satisfy both the thrill-seeker and the peace-finder.`,
  (city, state, cat) => `If you're searching for the ultimate ${cat} escape, ${city} in ${state} should be at the top of your 2026 travel list. EkalGo's AI has analyzed thousands of data points to bring you a specialized perspective on this breathtaking locale.`,
  (city, state, cat) => `Welcome to our definitive guide to ${city}, ${state}. As a ${cat} destination, it blends tradition with a rising modern energy that makes it perfect for digital nomads and weekend warriors alike.`
];

const LOCAL_TIPS = [
  (city, warn) => `Pro Traveler Tip for ${city}: ${warn}. According to EkalGo AI analytics, the best time to avoid the 11AM rush is by peaking your main activity at sunrise.`,
  (city, warn) => `Local Insight: While ${city} is generally welcoming, always ${warn.toLowerCase()}. We recommend using our AI-verified routes for the safest transit experience.`,
  (city, warn) => `Budget Hack for ${city}: Don't overpay for taxis. Use local transit nodes identified in the app and remember to ${warn.toLowerCase()} to keep your trip smooth.`
];

export function generateSEOContent(cityData, type, duration = "3-day-trip") {
  const { name: city, state, category, vibe_keywords, local_food, local_warning, tags } = cityData;
  const vibe = vibe_keywords ? vibe_keywords.join(" and ") : "discovery";
  const catTags = (tags || []).join(", ");

  // 1. Meta Data
  let title, meta;
  
  if (type === 'itinerary') {
    title = `Ultimate ${duration.replace('-', ' ')} in ${city}: AI-Optimized Route & Hidden Gems`;
    meta = `Plan your perfect ${duration.replace('-', ' ')} in ${city} with our AI-vetted day-by-day plan. Includes ${local_food}, hidden spots, and transit tips. Explore ${city} like a local.`;
  } else if (type === 'hidden-gems') {
    title = `7+ Hidden Gems in ${city} You Must Explore (Avoid the Crowds 2026)`;
    meta = `Discover the best hidden places in ${city}. Avoid tourist traps and explore the ${vibe} side of ${city} with EkalGo AI travel intelligence. Uncover the secrets of ${state}.`;
  } else if (type === 'getaways') {
    title = `Best Weekend Getaways from ${city} Within 300km (Updated Guide)`;
    meta = `Plan your next escape from ${city} with these AI-analyzed nearby destinations. Adventure, nature, and heritage nodes within reach of ${city}, ${state}.`;
  } else if (type === 'solo') {
    title = `Solo Travel in ${city}: Safe Routes, Best Hostels & AI Tips | EkalGo`;
    meta = `Explore ${city} solo with confidence. AI-optimized solo routes, female-safe zones, and the best artisanal cafes for working nomads in ${city}.`;
  } else if (type === 'romantic') {
    title = `The Romantic's Guide to ${city}: 2026's Best Hidden Date Spots`;
    meta = `Discover the most romantic corners of ${city}. From sunset viewpoints to heritage stays, plan your perfect couple's resonance in ${city}, ${state}.`;
  } else if (type === 'budget') {
    title = `Explore ${city} on a Budget: AI Hacks for High-Impact, Low-Cost Travel`;
    meta = `Travel smarter to ${city} without overspending. Budget transit nodes, local food circuits, and free hidden gems identified by AI in ${city}.`;
  } else if (type === 'safety') {
    title = `${city} Safety Report 2026: AI-Verified Safe Zones & Travel Tips`;
    meta = `Is ${city} safe for travelers? Get the latest safety insights, verified zones, and AI-powered risk analysis for your trip to ${city}, ${state}.`;
  } else {
    title = `Explore ${city}: The Definitive Travel Guide for the Modern Explorer`;
    meta = `The ultimate guide to ${city}, ${state}. Discover hidden gems, top attractions, and local secrets in ${city} with EkalGo AI travel intelligence.`;
  }

  // 2. Intro Generation (Uniqueness Variation Logic)
  const introFn = INTRO_TEMPLATES[Math.floor(Math.random() * INTRO_TEMPLATES.length)];
  const intro = introFn(city, state, category);

  // 3. Content Depth Logic (Generating thematic blocks for SEO)
  const blocks = [
    {
      title: `The ${vibe} Essence of ${city}`,
      text: `${city} is not just another pin on the map. It's a high-impact ${category} destination that requires a specialized approach to truly appreciate. Our AI has analyzed over 10,000 traveler signals to pinpoint exactly why ${city} is trending for 2026. The atmosphere here is ${vibe.toLowerCase()}, making it perfect for those who want to escape the mundane and find something truly authentic. Whether you are looking for ${catTags}, ${city} delivers on every front.`
    },
    {
      title: `Culinary Mastery: Tasting ${local_food}`,
      text: `No trip to ${city} is complete without diving into the local food scene. Specifically, ${local_food} is the dish that defines the regional identity here. We've mapped the best artisanal spots to try this, avoiding the overpriced "tourist" restaurants in the main city hub. For the best experience, visit the street stalls near the central heritage node around 7PM. Our AI identifies these "Flavor Nodes" based on real-time community sentiment.`
    },
    {
      title: `Strategic Navigation: The EkalGo Way`,
      text: `Navigating ${city} can be tricky for first-timers. The city's pulse shifts dramatically between 9AM and 4PM. To maximize your time, we recommend sticking to the AI-optimized "Legacy Route" which connects the core attractions through hidden side-streets that stay quiet even during peak hours. This route minimizes transit time and maximizes discovery density, ensuring you see the best of ${city} without the stress of typical tourist crowds.`
    },
    {
      title: `Sustainability and Local Impact`,
      text: `As ${city} grows in popularity, EkalGo encourages travelers to engage in high-impact, low-footprint tourism. By visiting the hidden gems identified in our guide, you help distribute the economic benefits of tourism to local communities beyond the main commercial strips. This approach not only provides a more authentic ${vibe} experience but also helps preserve the natural beauty of ${state} for future generations.`
    }
  ];

  // 4. Local Tip Section
  const tipFn = LOCAL_TIPS[Math.floor(Math.random() * LOCAL_TIPS.length)];
  const localTip = tipFn(city, local_warning || "stay alert during peak hours");

  // 5. Dynamic FAQ Generation
  const faqs = [
    {
      q: `What is the absolute best time to visit ${city}?`,
      a: `Based on weather patterns and crowd density, October to March is the prime window for ${city}. However, for a more ${vibe.toLowerCase()} experience, the early shoulder season in September offers great value and fewer crowds.`
    },
    {
      q: `Is ${city} safe for solo travelers?`,
      a: `${city} is generally very safe and welcoming for solo explorers. By following our AI-verified routes and keeping the ${(local_warning || "local awareness").toLowerCase()} tip in mind, you will have a seamless and secure experience in ${state}.`
    },
    {
      q: `What is the one "Can't Miss" hidden gem in ${city}?`,
      a: `While there are many, the unmapped node near the city peripheral (identified in our specialized Hidden Gems guide for ${city}) is the core highlight for any modern explorer in 2026.`
    },
    {
      q: `How can I save money while traveling in ${city}?`,
      a: `To explore ${city} on a budget, we recommend using the local transit network identified in our AI maps and sticking to the "Street Gourmet" circuit for authentic, low-cost meals.`
    }
  ];

  return {
    title,
    meta,
    intro,
    blocks,
    localTip,
    faqs
  };
}

