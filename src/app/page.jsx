'use client';

import React from 'react';
import Hero from '@/components/Hero';
import FeaturesGrid from '@/components/FeaturesGrid';
import HowItWorks from '@/components/HowItWorks';
import CuriosityExplore from '@/components/CuriosityExplore';
import SafetySection from '@/components/SafetySection';
import WaitlistCTA from '@/components/WaitlistCTA';
import { useModal } from '@/context/ModalContext';

export default function Home() {
  const { openWaitlist } = useModal();
  return (
    <div className="page-transition-wrapper">
      {/* 1. Immersive Hero */}
      <section id="hero">
        <Hero />
      </section>
      
      {/* 2. Features Grid */}
      <section id="features">
        <FeaturesGrid />
      </section>

      {/* 3. How It Works Steps */}
      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* 4. Explore Preview (Curiosity Driven) */}
      <section id="explore-preview">
        <CuriosityExplore />
      </section>

      {/* 5. Safety & Trust */}
      <section id="safety">
        <SafetySection />
      </section>

      {/* 6. Waitlist & CTA */}
      <section id="cta">
        <WaitlistCTA />
      </section>
    </div>
  );
}
