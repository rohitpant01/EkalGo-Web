import React from 'react';
import { Camera, Compass, MapPin, Sparkles, Shield, Clock, TrendingUp, HelpCircle, ArrowRight, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaitlistCTA from '@/components/WaitlistCTA';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import LiveSocialProof from '@/components/LiveSocialProof';
import destinationsData from '@/data/destinations.json';

export async function generateStaticParams() {
  return destinationsData.destinations.map((city) => ({
    city: `from-${city.slug}`,
  }));
}

export async function generateMetadata({ params }) {
  const { city: cityParam } = await params;
  const citySlug = cityParam.replace('from-', '').toLowerCase();
  const city = destinationsData.destinations.find(d => d.slug === citySlug) || { name: citySlug.charAt(0).toUpperCase() + citySlug.slice(1), getaways: [] };
  const topGetaway = city.getaways?.[0] || 'nearby spots';
  
  return {
    title: `15+ Weekend Getaways from ${city.name} (Short Trips 2026) | EkalGo`,
    description: `Ultimate list of best weekend getaways from ${city.name} - including ${topGetaway} and other hill stations and heritage spots for your next quick escape.`,
    alternates: {
       canonical: `https://ekalgo.com/getaways/from-${citySlug}`
    }
  };
}

export default async function GetawaysPage({ params }) {
  const { city: cityParam } = await params;
  const citySlug = cityParam.replace('from-', '').toLowerCase();
  const city = destinationsData.destinations.find(d => d.slug === citySlug);

  if (!city) {
    return <div className="min-h-screen bg-brand-900 flex items-center justify-center text-white">Base city not found for getaways generation.</div>;
  }

  return (
    <div className="min-h-screen bg-brand-900 text-white selection:bg-accent-gold/30">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-teal/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs 
            items={[
              { label: 'Explore', href: '/explore' },
              { label: city.name, href: `/explore/${citySlug}` },
              { label: 'Getaways', href: `/getaways/from-${citySlug}` }
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
               Escaping {city.name} for the weekend? AI has curated the top proximity-vetted destinations for your next 48-hour adventure.
            </p>
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
                      {getaway.tagline}. Perfect for a 2-day escape from {city.name}.
                    </p>
                    <div className="flex flex-wrap gap-4">
                       <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
                          <Clock size={16} className="text-accent-teal" />
                          <span className="text-xs font-bold text-blue-100/60 uppercase tracking-widest text-[10px]">Optimal Timing: {getaway.best_time || 'Weekend'}</span>
                       </div>
                    </div>
                    <div className="pt-6">
                       <Link 
                         href={`/explore/${getawaySlug.toLowerCase().replace(/\s+/g, '-')}`}
                         className="btn-primary py-3 px-8 rounded-full font-bold inline-flex items-center gap-3 transition-transform group-hover:scale-105"
                       >
                         View Full 2-Day Itinerary
                         <ArrowRight size={18} />
                       </Link>
                    </div>
                  </div>
                  <div className="lg:w-1/3 w-full aspect-square md:aspect-video lg:aspect-square rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-accent-gold/20 transition-all">
                     <Sparkles size={48} className="text-white/10 group-hover:text-accent-gold/20 transition-all duration-700" />
                     <div className="absolute inset-0 bg-gradient-to-t from-brand-900 to-transparent" />
                     <div className="absolute bottom-6 left-6 flex items-center gap-2">
                        <TrendingUp size={16} className="text-accent-neon" />
                        <span className="text-[10px] font-bold text-accent-neon uppercase tracking-widest">Trending Choice</span>
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
               url={`/getaways/from-${citySlug}`} 
               title={`15+ Weekend Getaways from ${city.name}`} 
               city={city.name} 
            />
          </div>
        </div>
      </section>

      <LiveSocialProof city={city.name} />
      <WaitlistCTA />
    </div>
  );
}
