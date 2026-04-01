import React from 'react';
import Hero from '../components/Hero';
import FeaturesGrid from '../components/FeaturesGrid';
import HowItWorks from '../components/HowItWorks';
import CuriosityExplore from '../components/CuriosityExplore';
import SafetySection from '../components/SafetySection';
import WaitlistCTA from '../components/WaitlistCTA';

export default function Home({ onWaitlistOpen }) {
  return (
    <>
      {/* 1. Immersive Hero */}
      <div id="hero">
        <Hero onWaitlistOpen={onWaitlistOpen} />
      </div>
      
      {/* 2. Features Grid */}
      <div id="features">
        <FeaturesGrid />
      </div>

      {/* 3. How It Works Steps */}
      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* 4. Explore Preview (Curiosity Driven) */}
      <div id="explore-preview">
        <CuriosityExplore onWaitlistOpen={onWaitlistOpen} />
      </div>

      {/* 5. Safety & Trust */}
      <div id="safety">
        <SafetySection />
      </div>

      {/* 6. Waitlist & CTA */}
      <div id="cta">
        <WaitlistCTA />
      </div>
    </>
  );
}
