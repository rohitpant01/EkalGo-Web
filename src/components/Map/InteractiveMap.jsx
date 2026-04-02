'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Compass, Loader2 } from 'lucide-react';

// Dynamic Import for GoogleMapEngine to bypass Turbopack SSR resolution issues
const GoogleMapEngine = dynamic(() => import('./GoogleMapEngine'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#020C16] flex flex-col items-center justify-center p-12 text-center">
       <div className="w-16 h-16 rounded-[2rem] bg-accent-gold/10 flex items-center justify-center text-accent-gold mb-6 border border-accent-gold/20 shadow-glow-gold/10">
          <Loader2 size={32} className="animate-spin" />
       </div>
       <div className="space-y-1">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Google Resonance Sync</h3>
          <p className="text-[10px] text-white/40 italic font-medium">Orchestrating Places & Terrain nodes...</p>
       </div>
    </div>
  )
});

export default function InteractiveMap() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#020C16]">
       <GoogleMapEngine />
       
       {/* Global Overlay Utilities */}
       <div className="absolute top-6 left-6 z-10 pointer-events-none">
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-brand-900/40 backdrop-blur-3xl border border-white/5 shadow-2xl">
             <div className="w-2 h-2 rounded-full bg-accent-gold animate-pulse shadow-glow-gold" />
             <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Map Live</span>
          </div>
       </div>

       {/* Distance Grid Overlay */}
       <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    </div>
  );
}
