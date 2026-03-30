import React, { useRef, useState } from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import TravelQuiz from '../components/TravelQuiz';
import HiddenGems from '../components/HiddenGems';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Itinerary from '../components/Itinerary';
import AppCTA from '../components/AppCTA';
import { SkeletonItinerary } from '../components/SkeletonCard';
import ErrorState from '../components/ErrorState';

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

  const scrollToSearch = () => {
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero
        onSearch={onSearch}
        onWaitlistOpen={onWaitlistOpen}
      />

      {/* NEW: Lead Magnet - Travel Persona Quiz */}
      <TravelQuiz onComplete={scrollToSearch} />

      {/* AI Search */}
      <div ref={searchSectionRef} id="search" className="pt-10">
        <SearchBar onSearch={onSearch} loading={loading} />
      </div>

      {/* Results: loading / error / itinerary */}
      <div id="itinerary">
        {loading && <SkeletonItinerary />}

        {!loading && error && (
          <ErrorState error={error} onRetry={onRetry} />
        )}

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

      {/* NEW: Lead Magnet - Hidden Gems Gallery */}
      <HiddenGems onUnlock={onWaitlistOpen} />

      {/* Features Section */}
      <Features />

      {/* How It Works */}
      <HowItWorks />

      {/* App Download CTA */}
      <AppCTA onWaitlistOpen={onWaitlistOpen} />
    </>
  );
}
