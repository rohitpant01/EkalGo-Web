import React from 'react';
import { Camera, Coffee, Compass, MapPin, Sparkles, Shield, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  const slug = params.slug.replace(/-/g, ' ');
  return {
    title: `Full ${slug} in ${city} — AI Optimized Route & Hidden Gems | EkalGo`,
    description: `The complete, day-by-day AI-generated itinerary for your ${slug} in ${city}. Discover exclusive spots, smart routes, and local secrets with EkalGo.`,
  };
}

export default function ItineraryPage({ params }) {
  const city = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  const slug = params.slug.replace(/-/g, ' ');
  
  // Simulated day-by-day itinerary data
  const itinerary = [
    {
      day: 1,
      theme: 'City Core & Hidden Transit',
      activities: [
        { time: '09:00 AM', action: 'Arrival & AI-vetted check-in', detail: 'Avoid the main highway transit; take the East-line for unmapped views.' },
        { time: '12:30 PM', action: 'Local Secret Lunch', detail: 'Identified as the highest rated place for authentic local cuisine by EkalGo Intelligence.' },
        { time: '04:00 PM', action: 'Heritage Loop', detail: 'Self-guided AI tour of the central heritage nodes with zero-crowd slots.' }
      ]
    },
    {
      day: 2,
      theme: 'The Untouched Frontier',
      activities: [
        { time: '08:00 AM', action: 'Sunrise Trek / Coastal Run', detail: 'Optimized for the lowest humidity and best lighting for photography.' },
        { time: '11:00 AM', action: 'Hidden Gem Discovery', detail: 'The core reason for this itinerary. A spot most tourists from Google Maps miss.' },
        { time: '06:00 PM', action: 'Sunset Niche', detail: 'A verified sunset point with community-driven trust score of 9.8.' }
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
    <div className="min-h-screen bg-brand-900 text-white selection:bg-accent-gold/30 pt-32 pb-20">
      
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Itinerary Header */}
        <div className="mb-16 space-y-4">
           <Link 
             href={`/explore/${params.city}`}
             className="text-accent-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 mb-6"
           >
             <Compass size={14} />
             Back to {city} Guide
           </Link>
           <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight">
             Detailed <span className="text-gradient-gold">{slug}.</span>
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

        {/* Day by Day Breakdown */}
        <div className="space-y-24 relative before:absolute before:inset-y-0 before:left-[-24px] before:w-[2px] before:bg-gradient-to-b before:from-accent-gold before:to-accent-neon before:opacity-20 ml-6">
          {itinerary.map((day) => (
            <div key={day.day} className="relative">
              <div className="absolute left-[-42px] top-0 w-8 h-8 rounded-full bg-brand-900 border-2 border-accent-gold flex items-center justify-center text-xs font-bold text-accent-gold z-10 shadow-glow-gold/20">
                {day.day}
              </div>
              
              <div className="space-y-8">
                 <div>
                    <h2 className="text-2xl font-display font-bold mb-2">Day {day.day}: {day.theme}</h2>
                    <p className="text-blue-100/30 text-sm">Focused on {day.day === 1 ? 'immersion' : day.day === 2 ? 'discovery' : 'reflection'} and AI-calculated speed.</p>
                 </div>

                 <div className="space-y-10">
                    {day.activities.map((act, i) => (
                      <div key={i} className="flex gap-6 items-start group">
                        <div className="shrink-0 pt-1">
                           <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-teal group-hover:bg-accent-teal group-hover:text-brand-900 transition-all duration-300">
                              {i === 0 ? <Clock size={18} /> : i === 1 ? <Coffee size={18} /> : <Camera size={18} />}
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

        {/* Final CTA */}
        <div className="mt-32 p-12 rounded-[2.5rem] bg-gradient-to-br from-brand-800 to-brand-900 border border-white/5 relative overflow-hidden text-center space-y-8 group">
          <div className="absolute inset-0 bg-accent-gold/5 blur-[80px] rounded-full translate-y-1/2 group-hover:translate-y-0 transition-transform duration-1000" />
          <div className="relative z-10 max-w-xl mx-auto space-y-6">
             <div className="w-16 h-16 rounded-3xl bg-accent-gold/10 border border-accent-gold/20 mx-auto flex items-center justify-center text-accent-gold shadow-glow-gold/10">
                <Sparkles size={32} />
             </div>
             <h2 className="text-3xl font-display font-bold">This is just the <span className="text-accent-gold">Preview.</span></h2>
             <p className="text-blue-100/40 leading-relaxed">
               Ready to plan your trip to {city} for real? Download the EkalGo App to get unmapped turn-by-turn navigation, budget tracking, and real-time hidden gem alerts.
             </p>
             <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <button className="btn-primary py-4 px-10 rounded-full font-bold shadow-glow-gold">
                   Join Waitlist
                </button>
                <button className="btn-secondary py-4 px-10 rounded-full font-bold border-white/10 hover:bg-white/5">
                   View Live Map
                </button>
             </div>
          </div>
        </div>

      </div>

    </div>
  );
}
