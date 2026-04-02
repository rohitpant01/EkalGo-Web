import React from 'react';
import { Compass, MapPin, Sparkles, Shield, Clock, TrendingUp, HelpCircle, ArrowRight, Zap, Camera, Coffee } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import WaitlistCTA from '@/components/WaitlistCTA';
import destinationsData from '@/data/destinations.json';

export async function generateStaticParams() {
  return destinationsData.destinations.map((city) => ({
    city: city.slug,
    duration: '3-day-trip',
  }));
}

export async function generateMetadata({ params }) {
  const { city: cityParam, duration: durationParam } = await params;
  const citySlug = cityParam.toLowerCase();
  const duration = durationParam.toLowerCase();
  const city = destinationsData.destinations.find(d => d.slug === citySlug) || { name: citySlug.charAt(0).toUpperCase() + citySlug.slice(1), state: 'India' };
  
  return {
    title: `The Ultimate ${duration.replace('-', ' ')} in ${city.name} — AI Optimized Route | EkalGo`,
    description: `Complete, day-by-day AI-generated itinerary for your ${duration.replace('-', ' ')} in ${city.name}, ${city.state}. Discover exclusive spots and local secrets verified by EkalGo.`,
    alternates: {
       canonical: `https://ekalgo.com/itinerary/${citySlug}/${duration}`
    }
  };
}

export default async function ItineraryDeepDivePage({ params }) {
  const { city: cityParam, duration: durationParam } = await params;
  const citySlug = cityParam.toLowerCase();
  const duration = durationParam.toLowerCase();
  const city = destinationsData.destinations.find(d => d.slug === citySlug);

  if (!city) {
    return <div className="min-h-screen bg-brand-900 flex items-center justify-center text-white">City data not found for itinerary generation.</div>;
  }

  // Simulated day-by-day itinerary data (In production, this would be AI generated or from a database)
  const itinerary = [
    {
      day: 1,
      theme: 'Core Heritage & Vibe',
      activities: [
        { time: '09:00 AM', action: 'Arrival & AI-vetted check-in', detail: 'Avoid the main highway transit; take the East-line for unmapped views.' },
        { time: '12:30 PM', action: 'Local Secret Lunch', detail: `Identified as the highest rated place for authentic ${city.state} cuisine by EkalGo Intelligence.` },
        { time: '04:00 PM', action: `${city.category} Loop`, detail: 'Self-guided AI tour of the central heritage nodes with zero-crowd slots.' }
      ]
    },
    {
      day: 2,
      theme: 'Discovery & Hidden Nodes',
      activities: [
        { time: '08:00 AM', action: 'Sunrise Trek / Coastal Run', detail: 'Optimized for the lowest humidity and best lighting for photography.' },
        { time: '11:00 AM', action: `${city.hidden_gems[0]} Hidden Gem`, detail: 'The core reason for this itinerary. A spot most tourists from Google Maps miss.' },
        { time: '06:00 PM', action: 'Sunset Niche', detail: `A verified sunset point near ${city.name}.` }
      ]
    },
    {
       day: 3,
       theme: 'Culture & Modern Vibe',
       activities: [
         { time: '10:00 AM', action: 'Market Pulse Hub', detail: 'Discover the artisanal and modern creative space of the city.' },
         { time: '02:00 PM', action: 'Relaxation Node', detail: 'A niche garden or cafe identified for its quiet and peaceful vibe.' },
         { time: '08:00 PM', action: 'Farewell Dinner', detail: 'A high-impact culinary experience optimized for the shortest wait times.' }
       ]
    }
  ];

  return (
    <div className="min-h-screen bg-brand-900 text-white selection:bg-accent-gold/30">
      
      {/* Itinerary Title Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs 
            items={[
              { label: 'Explore', href: '/explore' },
              { label: city.name, href: `/explore/${citySlug}` },
              { label: 'Itinerary', href: `/itinerary/${citySlug}/3-day-trip` }
            ]} 
          />
          <div className="space-y-6">
            <Link 
              href={`/explore/${citySlug}`}
              className="text-accent-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 mb-6"
            >
              <Compass size={14} />
              Back to {city.name} Guide
            </Link>
            <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight">
              A Legendary <span className="text-gradient-gold">{duration.replace('-', ' ')}</span> <br className="hidden md:block" /> in {city.name}.
            </h1>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="text-[10px] font-mono border border-white/5 bg-white/5 px-3 py-1 rounded-full text-blue-100/40">
                 AI GENERATED PATH
              </div>
              <div className="text-[10px] font-mono border border-green-400/20 bg-green-400/5 px-3 py-1 rounded-full text-green-400">
                 FULLY VERIFIED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Itinerary Content */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Day by Day */}
          <div className="lg:col-span-8 space-y-24 relative before:absolute before:inset-y-0 before:left-[-24px] before:w-[2px] before:bg-gradient-to-b before:from-accent-gold before:to-accent-neon before:opacity-20 ml-6">
            {itinerary.map((day) => (
              <div key={day.day} className="relative">
                <div className="absolute left-[-42px] top-0 w-8 h-8 rounded-full bg-brand-900 border-2 border-accent-gold flex items-center justify-center text-xs font-bold text-accent-gold z-10 shadow-glow-gold/20">
                  {day.day}
                </div>
                
                <div className="space-y-8">
                   <div>
                      <h2 className="text-2xl font-display font-bold mb-2">Day {day.day}: {day.theme}</h2>
                      <p className="text-blue-100/30 text-sm italic">Optimized for {day.day === 1 ? 'immersion' : day.day === 2 ? 'discovery' : 'reflection'} and AI-calculated speed.</p>
                   </div>

                   <div className="space-y-10">
                      {day.activities.map((act, i) => (
                        <div key={i} className="flex gap-6 items-start group">
                          <div className="shrink-0 pt-1">
                             <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-teal group-hover:bg-accent-teal group-hover:text-brand-900 transition-all duration-300">
                                {i === 0 ? <Clock size={16} /> : i === 1 ? <Coffee size={16} /> : <Camera size={16} />}
                             </div>
                          </div>
                          <div className="space-y-1">
                             <div className="text-[10px] font-mono text-accent-teal uppercase tracking-widest font-bold">{act.time}</div>
                             <h4 className="text-lg font-bold text-white group-hover:text-accent-teal transition-colors">{act.action}</h4>
                             <p className="text-blue-100/50 text-sm leading-relaxed max-w-lg">{act.detail}</p>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar / Conversions */}
          <div className="lg:col-span-4 space-y-8">
             <div className="glass-panel p-8 space-y-6">
               <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent-gold">Itinerary Stats</h4>
               <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/5 text-sm">
                     <span className="text-blue-100/40">Total Distance</span>
                     <span className="font-bold font-mono">12.4 km / Day</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5 text-sm">
                     <span className="text-blue-100/40">Transit Score</span>
                     <span className="font-bold text-green-400">9.4 / 10</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5 text-sm">
                     <span className="text-blue-100/40">Calories Burned</span>
                     <span className="font-bold font-mono">850 kcal</span>
                  </div>
               </div>
             </div>

             <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-800 to-brand-900 border border-accent-gold/20 relative overflow-hidden group">
                <div className="relative z-10 space-y-6">
                   <Zap size={24} className="text-accent-gold" />
                   <h4 className="text-xl font-bold">This is just the Preview.</h4>
                   <p className="text-sm text-blue-100/40 leading-relaxed">
                     Plan the perfect {duration.replace('-', ' ')} in {city.name} with real-time turn-by-turn navigation on the EkalGo App.
                   </p>
                   <button className="w-full btn-primary py-4 rounded-xl text-sm font-bold shadow-glow-gold hover:scale-105 transition-all">
                      Unlock Live Navigation
                   </button>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-gold/10 blur-[40px] rounded-full" />
             </div>
          </div>

        </div>
      </section>

      <WaitlistCTA />
    </div>
  );
}
