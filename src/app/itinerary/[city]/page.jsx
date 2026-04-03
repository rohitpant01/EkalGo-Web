import { fetchItineraryById } from '@/utils/itineraryPersistence';
import SharedItineraryView from '@/components/views/SharedItineraryView';
import destinationsData from '@/data/destinations.json';

export async function generateMetadata({ params }) {
  const { city: cityId } = await params;
  const itineraryData = await fetchItineraryById(cityId);

  if (!itineraryData) {
    return {
      title: 'Itinerary Not Found | EkalGo',
      description: 'The requested travel plan could not be found or has expired.'
    };
  }

  const title = itineraryData.title || `Shared Trip to ${itineraryData.location || 'Legendary Spot'}`;
  const description = `Check out this AI-generated travel plan for ${itineraryData.location || 'an amazing destination'} on EkalGo. Personalized, optimized, and ready for adventure.`;

  return {
    title: `${title} | EkalGo`,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: ['/logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo.png'],
    }
  };
}

export default async function SharedItineraryPage({ params }) {
  const { city: cityId } = await params;
  
  // Server-side fetch to avoid client-side loading flickers
  const itineraryData = await fetchItineraryById(cityId);
  const error = !itineraryData;

  // SEO: FAQ Schema Extraction
  let jsonLd = null;
  if (itineraryData) {
    const currentDest = destinationsData.destinations.find(
      d => d.name.toLowerCase() === itineraryData.location?.toLowerCase() || 
           d.slug.toLowerCase() === itineraryData.location?.toLowerCase() ||
           d.name.toLowerCase() === itineraryData.title?.toLowerCase()
    );

    if (currentDest?.faq) {
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": currentDest.faq.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      };
    }
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <SharedItineraryView 
        itineraryData={itineraryData} 
        cityId={cityId} 
        error={error} 
      />
    </>
  );
}
