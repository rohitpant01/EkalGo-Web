import React from 'react';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import FeaturesGrid from '@/components/FeaturesGrid';
import HowItWorks from '@/components/HowItWorks';
import AppCTA from '@/components/AppCTA';
import Testimonials from '@/components/Testimonials';
import WaitlistCTA from '@/components/WaitlistCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturesGrid />
      <HowItWorks />
      <Testimonials />
      <AppCTA />
      <WaitlistCTA />
    </>
  );
}
