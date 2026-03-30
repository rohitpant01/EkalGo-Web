import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Lock, ChevronRight, Sparkles, Star, Users } from 'lucide-react';

const GEMS = [
  {
    id: 1,
    name: "The 'Invisible' Monastery",
    location: "Spiti Valley, HP",
    coords: "32.2276° N, 78.0349° E",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop",
    vibe: "Spiritual",
    distance: "12km from Kaza"
  },
  {
    id: 2,
    name: "Secret Floating Cafe",
    location: "Alleppey, Kerala",
    coords: "9.4981° N, 76.3329° E",
    image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?q=80&w=2070&auto=format&fit=crop",
    vibe: "Romantic",
    distance: "Boat access only"
  },
  {
    id: 3,
    name: "Neon Forest Basecamp",
    location: "Coorg, Karnataka",
    coords: "12.4244° N, 75.7382° E",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1950&auto=format&fit=crop",
    vibe: "Adventure",
    distance: "Hidden in deep jungle"
  },
  {
    id: 4,
    name: "Crystal Cliff Edge",
    location: "Varkala, Kerala",
    coords: "8.7379° N, 76.7031° E",
    image: "https://images.unsplash.com/photo-1544161515-4af6b1d462c2?q=80&w=2070&auto=format&fit=crop",
    vibe: "Chill",
    distance: "Private path access"
  }
];

export default function HiddenGems({ onUnlock }) {
  return (
    <section className="py-24 px-4 bg-ocean-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(228,178,80,0.1)', border: '1px solid rgba(228,178,80,0.2)' }}>
              <Lock size={13} className="text-amber-400" />
              <span className="text-xs font-mono font-medium tracking-widest uppercase text-amber-300">
                Exclusive Discovery
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
              Places that <span className="text-gradient-amber italic">aren't on the map</span>
            </h2>
            <p className="font-body text-blue-200/50 text-lg leading-relaxed">
              We've curated a list of the most gate-kept locations in India. 
              The names and coordinates are locked—available exclusively to verified EkalGo users.
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-mono text-blue-300/40">
             <div className="flex items-center gap-2">
                <Users size={16} /> 4.2k Unlocked
             </div>
             <div className="w-1 h-1 rounded-full bg-blue-300/20" />
             <div className="flex items-center gap-2">
                <Sparkles size={16} /> New gems daily
             </div>
          </div>
        </div>

        {/* Gems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GEMS.map((gem) => (
            <motion.div
              key={gem.id}
              whileHover={{ y: -10 }}
              className="group relative h-[32rem] rounded-[2.5rem] overflow-hidden glass border border-white/10 cursor-pointer shadow-2xl"
              onClick={onUnlock}
            >
              {/* Image */}
              <img
                src={gem.image}
                alt="Hidden Gem"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 saturate-[0.8] brightness-75 group-hover:brightness-100"
              />
              
              {/* Blur Overlay - The Lock */}
              <div className="absolute inset-0 bg-ocean-950/40 backdrop-blur-[2px] transition-all duration-500 group-hover:backdrop-blur-0" />
              
              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end bg-gradient-to-t from-ocean-950/90 via-ocean-950/40 to-transparent">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest text-amber-900 bg-amber-400">
                    {gem.vibe}
                  </span>
                  <div className="flex items-center gap-1 text-white/60">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-bold">Secret</span>
                  </div>
                </div>

                <div className="mb-6">
                   <h3 className="text-white font-bold text-xl mb-1 blur-md transition-all group-hover:blur-sm">
                      {gem.name}
                   </h3>
                   <div className="flex items-center gap-1.5 text-blue-200/40">
                      <MapPin size={12} />
                      <span className="text-xs">{gem.location}</span>
                   </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/5">
                   <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-[0.2em] text-amber-500/60">
                      <span>Coordinates</span>
                      <Lock size={12} />
                   </div>
                   <div className="text-sm font-mono text-white/20 blur-[6px] select-none">
                      {gem.coords}
                   </div>
                   
                   <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-amber-400 hover:text-ocean-900 transition-all flex items-center justify-center gap-2 group-hover:shadow-glow-amber">
                      Unlock exact location
                      <ChevronRight size={14} />
                   </button>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-6 right-6">
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white">
                    <Users size={12} className="text-teal-400" />
                    {Math.floor(Math.random() * 50) + 10} verified explorers
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global CTA */}
        <div className="mt-16 text-center">
           <p className="text-blue-200/30 text-sm italic mb-8">
              "I found a waterfall in Spiti that wasn't on any blog. EkalGo is a cheat code." – <span className="text-white font-bold">Vikram</span>
           </p>
           <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onUnlock}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-[1.5rem] font-bold text-ocean-900 shadow-2xl transition-all"
              style={{ background: 'linear-gradient(135deg, #E4B250 0%, #FF6B35 100%)' }}
            >
              Access the Master Database
           </motion.button>
        </div>
      </div>
    </section>
  );
}
