'use client';

import React from 'react';
import Hero from '@/components/Hero';
import FeaturesGrid from '@/components/FeaturesGrid';
import Testimonials from '@/components/Testimonials';
import BudgetDemo from '@/components/BudgetDemo';
import SmartTravel from '@/components/SmartTravel';
import SampleItinerary from '@/components/SampleItinerary';
import AppShowcase from '@/components/AppShowcase';
import FinalCTA from '@/components/FinalCTA';
import TrustBar from '@/components/TrustBar';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <Hero />
      
      {/* 2. Trust Bar (Social Proof) */}
      <TrustBar />

      {/* 3. Features Grid */}
      <FeaturesGrid />

      {/* 4. Smart Travel (Tabbed UI) */}
      <SmartTravel />

      {/* 5. Sample Itinerary (Manali Example) */}
      <SampleItinerary />

      {/* 6. App Showcase Carousel (Primary Discovery) */}
      <AppShowcase />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Final CTA */}
      <FinalCTA />
    </main>
  );
}
