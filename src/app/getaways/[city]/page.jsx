import React from 'react';
import { MapPin, Zap, Clock, ArrowRight, Shield, Compass, Camera } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import LiveSocialProof from '@/components/LiveSocialProof';
import WaitlistCTA from '@/components/WaitlistCTA';
import { generateSEOContent } from '@/utils/contentEngine';
import destinationsData from '@/data/destinations.json';
import Link from 'next/link';

export async function generateStaticParams() {
  // Phase A Rollout: First 30 Priority Cities
  return destinationsData.destinations.slice(0, 30).map((city) => ({
    city: city.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { city: cityParam } = await params;
  const citySlug = cityParam.toLowerCase();
  const city = destinationsData.destinations.find(d => d.slug === citySlug) || { name: citySlug.charAt(0).toUpperCase() + citySlug.slice(1), getaways: [] };
  const topGetaway = city.getaways?.[0] || 'nearby spots';
  
  return {
    title: `15+ Weekend Getaways from ${city.name} (Short Trips 2026) | EkalGo`,
    description: `Ultimate list of best weekend getaways from ${city.name} - including ${topGetaway} and other hill stations and heritage spots for your next quick escape.`,
    alternates: {
       canonical: `https://ekalgo.com/getaways/${citySlug}`
    }
  };
}

export default async function GetawaysPage({ params }) {
  const { city: cityParam } = await params;
  const citySlug = cityParam.toLowerCase();
  const city = destinationsData.destinations.find(d => d.slug === citySlug);

  if (!city) {
    return <div className="min-h-screen bg-brand-900 flex items-center justify-center text-white">Base city not found for getaways generation.</div>;
  }

  // Phase 4: Dynamic Quality Content Engine
  const seo = generateSEOContent(city, 'getaways');

  return (
    <div className="min-h-screen bg-brand-900 text-white selection:bg-accent-gold/30">
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-teal/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs 
            items={[
              { label: 'Explore', href: '/explore' },
              { label: city.name, href: `/explore/${citySlug}` },
              { label: 'Getaways', href: `/getaways/${citySlug}` }
            ]} 
          />
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-teal/10 border border-accent-teal/20">
              <Zap size={14} className="text-accent-teal" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-teal">Short Escapes</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight">
              Getaways from <span className="text-gradient-gold">{city.name}.</span>
            </h1>
            <p className="text-blue-100/40 text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed">
               {seo.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Content Depth Section (Phase 4 Addition) */}
      <section className="py-24 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <div className="space-y-4">
             <h2 className="text-3xl font-display font-bold">{seo.blocks[1].title}</h2>
             <p className="text-lg text-blue-100/60 leading-relaxed font-body">
                {seo.blocks[1].text}
             </p>
          </div>

          <div className="p-8 rounded-[2rem] bg-accent-teal/5 border border-accent-teal/20 flex flex-col md:flex-row items-center gap-8 group">
             <div className="w-16 h-16 rounded-2xl bg-accent-teal flex items-center justify-center shrink-0 shadow-glow-teal">
                <Shield size={32} className="text-brand-900" />
             </div>
             <div className="space-y-2">
                <h4 className="text-accent-teal font-bold uppercase tracking-widest text-xs">Verified Local Insight</h4>
                <p className="text-blue-100/80 font-medium italic">"{seo.localTip}"</p>
             </div>
          </div>
        </div>
      </section>

      {/* Getaway List */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="space-y-12">
          {city.getaways.map((getawaySlug, idx) => {
            const getaway = destinationsData.destinations.find(d => d.slug === getawaySlug.toLowerCase().replace(/\s+/g, '-')) || { name: getawaySlug, tagline: 'Explore the unexplored route.' };
            return (
              <div key={idx} className="glass-panel p-1 group hover:border-accent-gold/30 transition-all duration-500 rounded-[2rem] overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-8 p-10 bg-brand-800/20 items-center">
                  <div className="lg:w-2/3 space-y-6">
                    <div className="flex items-center gap-2 text-accent-gold">
                       <MapPin size={24} />
                       <h3 className="text-3xl font-display font-bold">{getaway.name}</h3>
                    </div>
                    <p className="text-blue-100/40 text-lg">
                      {getaway.tagline}. Perfect for a quick recharge escape from {city.name}.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-6">
                       <Link 
                         href={`/explore/${getawaySlug.toLowerCase().replace(/\s+/g, '-')}`}
                         className="btn-primary py-3 px-8 rounded-full font-bold inline-flex items-center gap-3 transition-transform group-hover:scale-105"
                       >
                         View Full Guide
                         <ArrowRight size={18} />
                       </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Internal Linking Bridge */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
         <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
            <h2 className="text-3xl font-display font-bold">More Discovery Silos for {city.name}</h2>
            <div className="grid md:grid-cols-2 gap-6">
               <Link href={`/hidden-gems/${citySlug}`} className="glass-panel p-10 hover:border-accent-gold/40 transition-all group">
                  <Camera size={32} className="text-accent-gold mx-auto mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-3">Hidden Gems near {city.name}</h3>
                  <p className="text-xs text-blue-100/30">Avoid the crowds with AI-pinpointed secret nodes near the city.</p>
               </Link>
               <Link href={`/explore/${citySlug}`} className="glass-panel p-10 hover:border-accent-teal/40 transition-all group">
                  <Compass size={32} className="text-accent-teal mx-auto mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-3">Complete {city.name} Guide</h3>
                  <p className="text-xs text-blue-100/30">The central authority hub for culture, history and daily vibes.</p>
               </Link>
            </div>
         </div>
      </section>

      {/* Viral Sharing */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center border-t border-white/5">
        <div className="space-y-8">
          <h3 className="text-xl font-bold font-display">Share these Getaways</h3>
          <div className="flex justify-center">
            <ShareButtons 
               url={`/getaways/${citySlug}`} 
               title={`15+ Weekend Getaways from ${city.name}`} 
               city={city.name} 
            />
          </div>
        </div>
      </section>

      <LiveSocialProof city={city.name} />
      <WaitlistCTA />
      <Footer />
    </div>
  );
}
