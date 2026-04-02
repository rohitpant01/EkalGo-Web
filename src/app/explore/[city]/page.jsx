import React from 'react';
import { Compass, MapPin, Sparkles, Shield, Clock, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaitlistCTA from '@/components/WaitlistCTA';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import LiveSocialProof from '@/components/LiveSocialProof';

export async function generateMetadata({ params }) {
  const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  return {
    title: `${city} AI Travel Guide — Hidden Gems & 3-Day Itinerary | EkalGo`,
    description: `Discover the best hidden gems and AI-optimized travel routes for ${city}. Plan your perfect trip with EkalGo's advanced travel intelligence.`,
  };
}

export default function CityPage({ params }) {
  const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  
  // Simulated dynamic city data
  const cityData = {
    Goa: { tag: 'Coastal Escape', vibe: 'Chill & Party', hidden: 'Cola Beach, Butterfly Beach', budget: '₹2,500 - ₹8,000 / day' },
    Manali: { tag: 'Mountain Highs', vibe: 'Adventure & Peace', hidden: 'Jogini Falls, Old Manali Trails', budget: '₹1,500 - ₹5,000 / day' },
    Leh: { tag: 'Extreme Frontier', vibe: 'Spiritual & Rugged', hidden: 'Turtuk Village, Pangong Remote Hubs', budget: '₹3,000 - ₹10,000 / day' },
    // Default for pSEO
    default: { tag: 'Legendary Route', vibe: 'Discovery & Culture', hidden: 'Secret local trails & unmapped cafes', budget: 'Moderate' }
  };

  const data = cityData[city] || cityData.default;

  return (
    <div className="min-h-screen bg-brand-900 text-white selection:bg-accent-gold/30">
      
      {/* Dynamic Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-neon/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-6">
              <Sparkles size={14} className="text-accent-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-gold">{data.tag}</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight mb-6">
              Explore <span className="text-gradient-gold">{city}.</span>
            </h1>
            <p className="text-blue-100/40 text-lg md:text-xl max-w-2xl mx-auto font-body mb-10 leading-relaxed">
               AI-optimized routes and hidden discovery for {city}. {data.vibe} centered intelligence for the modern explorer.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
               <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
                  <TrendingUp size={16} className="text-accent-teal" />
                  <span className="text-xs font-bold text-blue-100/60 uppercase tracking-widest">{data.budget}</span>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
                  <Shield size={16} className="text-green-400" />
                  <span className="text-xs font-bold text-blue-100/60 uppercase tracking-widest">AI Verified</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programmatic Content Blocks */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-16">
            <div className="space-y-6">
               <h2 className="text-3xl font-display font-bold flex items-center gap-4">
                  <Compass className="text-accent-gold" />
                  Why Visit {city}?
               </h2>
               <div className="glass-panel p-8 space-y-4">
                 <p className="text-blue-100/60 leading-relaxed">
                   {city} is more than just a destination; it's a dynamic hub of {data.vibe.toLowerCase()}. 
                   EkalGo AI has identified 12+ optimized routes ranging from heritage trails to modern niches.
                 </p>
                 <div className="p-4 rounded-xl bg-accent-gold/5 border border-accent-gold/20 flex items-start gap-4">
                    <Sparkles className="text-accent-gold shrink-0 mt-1" size={20} />
                    <p className="text-sm text-accent-gold font-medium italic">
                       "AI Insider Insight: Don't miss {data.hidden.split(',')[0]} for the best sunset views in {city}. Most tourists overlook this spot."
                    </p>
                 </div>
               </div>
            </div>

            <div className="space-y-6">
               <h2 className="text-3xl font-display font-bold flex items-center gap-4">
                  <MapPin className="text-accent-neon" />
                  The Legendary {city} 3-Day Path
               </h2>
               <div className="relative border-l border-white/10 ml-4 pb-4 space-y-12">
                  {[1,2,3].map(day => (
                    <div key={day} className="relative pl-10 group">
                      <div className="absolute left-[-17px] top-0 w-8 h-8 rounded-full bg-brand-800 border border-white/10 flex items-center justify-center text-xs font-bold text-accent-neon group-hover:bg-accent-neon group-hover:text-brand-900 transition-all z-10">
                        {day}
                      </div>
                      <h3 className="text-xl font-bold mb-3">Day {day}: AI Optimized {day === 1 ? 'Heritage' : day === 2 ? 'Niches' : 'Off-beat'}</h3>
                      <p className="text-blue-100/40 text-sm max-w-xl">
                        {day === 1 ? `Land in ${city} and take the AI-vetted route to the city center. Avoid the standard 11AM traffic peak.` : 
                         day === 2 ? `Dedicated time for ${data.hidden.split(',')[day-1] || 'Secret Trails'}. Optimized for the best lighting.` : 
                         `Transition to the final segment. Best time to visit the local markets is suggested as 4PM.`}
                      </p>
                    </div>
                  ))}
               </div>
               <div className="pt-6">
                  <Link 
                    href={`/explore/${city.toLowerCase()}/itinerary/3-day`}
                    className="btn-primary py-4 px-10 rounded-full font-bold inline-flex items-center gap-3 shadow-glow-gold"
                  >
                    Unlock Full Detailed Itinerary
                    <Clock size={18} />
                  </Link>
               </div>
            </div>
          </div>

          {/* Sidebar / Stats */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-8 space-y-6">
               <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent-gold">Quick Facts</h4>
               <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                     <span className="text-sm text-blue-100/40">Vibe Check</span>
                     <span className="text-sm font-bold">{data.vibe}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                     <span className="text-sm text-blue-100/40">Hidden Gem</span>
                     <span className="text-sm font-bold">{data.hidden.split(',')[0]}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                     <span className="text-sm text-blue-100/40">Safety Index</span>
                     <span className="text-sm font-bold text-green-400">9.2 / 10</span>
                  </div>
               </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-800 to-brand-900 border border-accent-gold/20 relative overflow-hidden group">
               <div className="relative z-10 space-y-4">
                  <h4 className="text-lg font-bold">Plan with EkalGo App</h4>
                  <p className="text-sm text-blue-100/40">Get real-time alerts and unmapped pins for {city} directly on your phone.</p>
                  <button className="w-full btn-secondary py-3 rounded-xl text-sm font-bold group-hover:bg-accent-gold group-hover:text-brand-900 transition-all">
                    Download for {city}
                  </button>
               </div>
               <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-gold/10 blur-[40px] rounded-full" />
            </div>
          </div>

        </div>
      </section>

      {/* Viral Sharing */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center border-t border-white/5">
        <div className="space-y-8">
          <h3 className="text-xl font-bold font-display">Share this {city} Guide</h3>
          <div className="flex justify-center">
            <ShareButtons 
               url={`/explore/${params.city}`} 
               title={`AI Travel Guide for ${city}`} 
               city={city} 
            />
          </div>
        </div>
      </section>

      <LiveSocialProof city={city} />
      <WaitlistCTA />
    </div>
  );
}
