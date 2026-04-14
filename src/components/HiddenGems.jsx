'use client';

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

// Custom shaking animation for blurred cards
const shakeAnimation = {
  hover: {
    x: [0, -4, 4, -4, 4, 0],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  }
};

export default function HiddenGems({ onUnlock }) {
  return (
    <section className="py-24 px-4 bg-ocean-900 border-t border-white/5 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
          <div className="max-w-xl">
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
            <p className="font-body text-blue-200/50 text-lg leading-relaxed mb-6">
              We've curated a list of the most gate-kept locations in India. 
              The names and coordinates are locked—available exclusively to verified EkalGo users.
            </p>
            
            {/* Gamification Progress Bar */}
            <div className="w-full bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center w-full">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Unlock Progress</span>
                <span className="text-xs font-mono text-teal-400">3/50 Discovered</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '6%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-teal-500 to-teal-300 shadow-[0_0_10px_#2DD4BF] rounded-full"
                />
              </div>
            </div>
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

        {/* Gems Container */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-hidden sm:px-0">
          {GEMS.map((gem, index) => {
            const isClear = index === 0;
            return (
              <motion.div
                key={gem.id}
                variants={!isClear ? shakeAnimation : undefined}
                whileHover={isClear ? { y: -10, scale: 1.02 } : "hover"}
                className={`group relative w-[85vw] md:w-auto shrink-0 h-[28rem] sm:h-[32rem] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden glass border border-white/10 cursor-pointer shadow-2xl transition-transform ${
                  !isClear ? 'opacity-80' : 'w-full md:w-auto'
                }`}
                onClick={onUnlock}
              >
                {/* Image */}
                <div className={`absolute inset-0 w-full h-full transition-all duration-700 ${!isClear ? 'blur-[8px] scale-110 saturate-50' : 'group-hover:scale-105 saturate-[0.8] brightness-75 group-hover:brightness-100'}`}>
                   <img
                     src={gem.image}
                     alt="Hidden Gem"
                     className="w-full h-full object-cover"
                   />
                </div>
                
                {/* Overlay for all */}
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/90 via-ocean-950/40 to-transparent z-10" />

                {/* Big Lock Icon for blurred cards */}
                {!isClear && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/20 pointer-events-none group-hover:bg-black/40 transition-colors">
                    <motion.div 
                      className="w-16 h-16 rounded-full glass-light flex items-center justify-center shadow-glow-amber border border-amber-500/50"
                      whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                    >
                      <Lock size={24} className="text-amber-400" />
                    </motion.div>
                    <span className="mt-4 font-mono text-sm tracking-widest text-white/80 uppercase">Tap to Unlock</span>
                  </div>
                )}
                
                {/* Content Overlay */}
                <div className={`absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end z-20 ${!isClear ? 'opacity-30' : ''}`}>
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <span className="px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-amber-900 bg-amber-400">
                      {gem.vibe}
                    </span>
                    <div className="flex items-center gap-1 text-white/60">
                      <Star size={10} fill="currentColor" />
                      <span className="text-[9px] sm:text-[10px] font-bold">Secret</span>
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-6">
                     <h3 className={`text-white font-bold text-lg sm:text-xl mb-1 ${!isClear ? 'blur-sm' : ''}`}>
                        {gem.name}
                     </h3>
                     <div className="flex items-center gap-1.5 text-blue-200/40">
                        <MapPin size={12} />
                        <span className="text-xs">{!isClear ? '???, ????' : gem.location}</span>
                     </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-white/5">
                     <div className="flex items-center justify-between text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] text-amber-500/60">
                        <span>Coordinates</span>
                        <Lock size={12} />
                     </div>
                     <div className="text-xs sm:text-sm font-mono text-white/20 select-none blur-[4px]">
                        {gem.coords}
                     </div>
                     
                     {isClear && (
                       <button className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-[10px] sm:text-xs hover:bg-amber-400 hover:text-ocean-900 transition-all flex items-center justify-center gap-2 group-hover:shadow-glow-amber">
                          Unlock exact location
                          <ChevronRight size={14} />
                       </button>
                     )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global CTA */}
        <div className="mt-16 text-center">
           <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onUnlock}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-[1.5rem] font-bold text-ocean-900 shadow-glow-amber transition-all btn-glow"
              style={{ background: 'linear-gradient(135deg, #F9A826 0%, #F59E0B 100%)' }}
            >
              Access the Master Database
           </motion.button>
        </div>
      </div>
    </section>
  );
}
