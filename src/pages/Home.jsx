import React, { useRef } from 'react';
import Hero from '../components/Hero';
import LiveBuilder from '../components/LiveBuilder';
import ScrollStory from '../components/ScrollStory';
import HiddenGems from '../components/HiddenGems';
import Travelers from '../components/Travelers';
import AppCTA from '../components/AppCTA';
import SearchBar from '../components/SearchBar';
import Itinerary from '../components/Itinerary';
import ErrorState from '../components/ErrorState';
import { SkeletonItinerary } from '../components/SkeletonCard';

export default function Home({ 
  itinerary, 
  loading, 
  error, 
  enriching, 
  onSearch, 
  onWaitlistOpen, 
  onLockedOpen,
  onShare,
  onRetry
}) {
  const searchSectionRef = useRef(null);

  return (
    <>
      {/* 1. Hero (animated map, typing, parallax) */}
      <Hero
        onSearch={onSearch}
        onWaitlistOpen={onWaitlistOpen}
      />

      {/* Actual App Search functionality placed here so users can try it.
          It transitions into the live builder conceptually. */}
      <div ref={searchSectionRef} id="search" className="relative z-20 -mt-10 pb-20 bg-transparent px-4">
         <div className="max-w-4xl mx-auto">
           <SearchBar onSearch={onSearch} loading={loading} />
         </div>
      </div>

      {/* Search Results Area */}
      <div id="itinerary" className="bg-ocean-950">
        {loading && <SkeletonItinerary />}
        {!loading && error && <ErrorState error={error} onRetry={onRetry} />}
        {!loading && !error && itinerary && (
          <Itinerary
            itinerary={itinerary}
            enriching={enriching}
            onLockedFeatureClick={onLockedOpen}
            onShare={onShare}
            onWaitlistOpen={onWaitlistOpen}
          />
        )}
      </div>

      {/* 2. AI Itinerary Live Builder (Showcase) */}
      {!itinerary && !loading && (
        <LiveBuilder />
      )}

      {/* 3. Scroll Story (The Game Changer) */}
      {!itinerary && !loading && (
        <ScrollStory />
      )}

      {/* 4. Hidden Places (Blurred mystery cards) */}
      <HiddenGems onUnlock={onWaitlistOpen} />

      {/* 5. Travelers Section (Social Feel) */}
      <Travelers onWaitlistOpen={onWaitlistOpen} />

      {/* 6. FOMO Section / CTA */}
      <AppCTA onWaitlistOpen={onWaitlistOpen} />
    </>
  );
}
