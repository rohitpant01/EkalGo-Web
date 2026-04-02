'use client';

import React, { useState } from 'react';
import ActionSearch from '@/components/ActionSearch';
import FeaturesGrid from '@/components/FeaturesGrid';
import SafetySection from '@/components/SafetySection';
import CuriosityExplore from '@/components/CuriosityExplore';
import WaitlistCTA from '@/components/WaitlistCTA';
import SplitShell from '@/components/layout/SplitShell';
import { generateGroqItinerary } from '@/services/groq';
import { useModal } from '@/context/ModalContext';
import { Sparkles, MapPin, TrendingUp, Compass, Zap, Lock, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTabStore } from '@/context/tabStore';
import { cn } from '@/utils/cn';
import NearbyTravelers from '../social/NearbyTravelers';
import SmartInsights from '../social/SmartInsights';

export default function DiscoverView() {
  const { openWaitlist } = useModal();
  const { addTab, setActiveTab } = useTabStore();
  const [searchState, setSearchState] = useState({ location: '', mood: null, active: false });
  const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false);

  // Suggestions for the current trending location or search
  const suggestionLocation = searchState.location || 'Jaipur';

  const handleGenerateItinerary = async (providedData = null) => {
    const loc = providedData?.location || searchState.location;
    const mood = providedData?.mood || searchState.mood;
    
    if (!loc || !mood) return;
    
    setIsGeneratingItinerary(true);
    const result = await generateGroqItinerary(`${mood} trip in ${loc}`);
    if (result.success) {
      const newTabId = `trip-${Date.now()}`;
      addTab({
        id: newTabId,
        title: `${loc} (${mood})`,
        type: 'trip',
        data: result.data
      });
      // Automatically switch to the map/itinerary view
      setActiveTab(newTabId);
    }
    setIsGeneratingItinerary(false);
  };

  const handleSearch = (data) => {
    setSearchState({ ...data, active: true });
    
    // Automatically trigger generation if both are present
    if (data.location && data.mood) {
       handleGenerateItinerary(data);
    }
  };

  return (
    <div className="w-full space-y-12 pb-32">
      {/* Search Header */}
      <section id="discovery-search-header" className="px-8 pt-8 space-y-6 text-center sm:text-left scroll-mt-20">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20">
            <Sparkles size={14} className="text-accent-gold" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent-gold">AI Discovery Engine v2</span>
         </div>
         <ActionSearch onSearch={handleSearch} />
      </section>

      {/* Smart AI Insights (Gemini) */}
      <section className="px-8">
         <SmartInsights destination={suggestionLocation} />
      </section>

      {/* Social Pulse Section (Nearby Travelers) */}
      <section className="px-8">
         <div className="glass-panel p-6 border-white/5 bg-brand-900/40 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 blur-[80px] pointer-events-none" />
            <NearbyTravelers />
         </div>
      </section>

      {/* Discovery Results State (Only for partial searches without mood) */}
      <AnimatePresence mode="wait">
        {searchState.active && !searchState.mood && !isGeneratingItinerary && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-8"
          >
             <button 
               onClick={handleGenerateItinerary}
               disabled={isGeneratingItinerary}
               className="w-full h-24 rounded-3xl bg-white/5 border border-white/10 hover:border-accent-gold/40 hover:bg-white/[0.08] transition-all flex items-center justify-center gap-6 group overflow-hidden relative"
             >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                  isGeneratingItinerary ? "bg-accent-gold shadow-glow-gold scale-90" : "bg-white/10 text-white/40 group-hover:text-accent-gold group-hover:bg-accent-gold/20"
                )}>
                  {isGeneratingItinerary ? <Loader2 className="animate-spin text-brand-900" size={24} /> : <Sparkles size={24} />}
                </div>
                <div className="text-left">
                   <p className="text-sm font-bold text-white group-hover:text-accent-gold transition-colors italic">
                     {isGeneratingItinerary ? 'Orchestrating Legendary Route...' : `EkalGo Intelligence: ${searchState.mood || 'AI'} trip to ${searchState.location}`}
                   </p>
                   <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-1">
                     {isGeneratingItinerary ? 'Vetting hidden nodes & timings' : 'AI-POWERED • 14 SECONDS'}
                   </p>
                </div>
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="px-8">
        <FeaturesGrid />
      </section>
      
      <section className="px-8">
        <SafetySection />
      </section>

      <section className="px-8">
        <CuriosityExplore onExplore={(dest) => {
          handleSearch({ location: dest.name, mood: dest.type });
          document.getElementById('discovery-search-header')?.scrollIntoView({ behavior: 'smooth' });
        }} />
      </section>

      <section className="px-8">
        <WaitlistCTA />
      </section>
    </div>
  );
}
