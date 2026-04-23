'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, Navigation, Check, ChevronRight, Zap, TrendingUp, Shield, Search, Loader2, ArrowRight } from 'lucide-react';
import { extractSearchIntent } from '@/services/groq';

const MOODES = [
  { id: 'adventure', label: 'Adventure', icon: '🔥', color: 'orange' },
  { id: 'romantic', label: 'Romantic', icon: '❤️', color: 'pink' },
  { id: 'solo', label: 'Solo', icon: '🧘', color: 'teal' },
  { id: 'budget', label: 'Budget', icon: '💸', color: 'green' },
  { id: 'hidden', label: 'Hidden Gems', icon: '🧭', color: 'gold' }
];

export default function ActionSearch({ onSearch }) {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState('');
  const [mood, setMood] = useState(null);
  const [naturalQuery, setNaturalQuery] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNaturalSearch = async () => {
    if (!naturalQuery) return;
    
    setIsExtracting(true);
    const result = await extractSearchIntent(naturalQuery);
    
    if (result.success && result.data) {
      const { location: loc, mood: m } = result.data;
      if (loc) setLocation(loc);
      if (m && MOODES.find(x => x.id === m)) setMood(m);
      
      // If we have both, we can skip directly to generation
      if (loc && m) {
        setIsGenerating(true);
        setTimeout(() => {
          setIsGenerating(false);
          onSearch({ location: loc, mood: m, query: naturalQuery });
          // Reset for next use
          setStep(1);
          setMood(null);
        }, 2000);
        return;
      }
      
      // If missing something, go to the structured steps
      setStep(loc ? 2 : 1);
    } else {
      // Fallback: stay on current step or show error
      setStep(1);
    }
    setIsExtracting(false);
  };

  const handleNext = () => {
    if (step === 1 && location) setStep(2);
    if (step === 2 && mood) {
       setIsGenerating(true);
       setTimeout(() => {
          setIsGenerating(false);
          onSearch({ location, mood });
          // Reset for next use
          setStep(1);
          setMood(null);
       }, 2500);
    }
  };

  return (
    <div className="w-full space-y-4">
      
      {/* 1. Progress / Mode Toggle */}
      <div className="flex items-center justify-between mb-4">
         <div className="flex gap-2">
            {[1, 2].map((s) => (
               <div 
                 key={s} 
                 className={`h-1 rounded-full transition-all duration-500 ${
                   step >= s ? 'w-8 bg-accent-gold' : 'w-4 bg-white/10'
                 }`} 
               />
            ))}
         </div>
         <span className="text-[10px] font-bold uppercase tracking-widest text-blue-100/20">EkalGo Discovery Engine</span>
      </div>

      <AnimatePresence mode="wait">
        {isExtracting || isGenerating ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="glass-panel p-10 border-accent-gold/20 flex flex-col items-center text-center gap-6"
          >
             <div className="relative">
                <Loader2 size={64} className="text-accent-gold animate-spin opacity-20" />
                <Sparkles size={28} className="absolute inset-0 m-auto text-accent-gold animate-pulse" />
             </div>
             <div className="space-y-2">
                <h3 className="text-xl font-display font-bold">
                   {isExtracting ? "Extracting Intent..." : "Orchestrating AI Route..."}
                </h3>
                <p className="text-blue-100/40 text-xs italic">
                   {isExtracting ? "Parsing your request for vibes & nodes." : "Vetting 50+ nearby nodes for optimal corridor density."}
                </p>
             </div>
          </motion.div>
        ) : step === 1 ? (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="space-y-3">
               <h2 className="text-2xl font-display font-bold leading-tight">
                  Where's the <br /> <span className="text-gradient-gold">destination?</span>
               </h2>
               <p className="text-blue-100/40 text-xs font-medium">Or type naturally: "Romantic weekend in Manali"</p>
            </div>

            {/* AI Search Bar */}
            <div className="relative group">
               <div className="absolute inset-y-0 left-5 md:left-6 flex items-center text-accent-gold group-focus-within:scale-110 transition-transform">
                  <Search size={18} className="md:w-[22px] md:h-[22px]" />
               </div>
               <input 
                 type="text" 
                 value={naturalQuery || location}
                 onChange={(e) => {
                    setNaturalQuery(e.target.value);
                    setLocation(e.target.value);
                 }}
                 onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                       naturalQuery.split(' ').length > 2 ? handleNaturalSearch() : handleNext();
                    }
                 }}
                 placeholder="Search city or vibe..."
                 className="w-full bg-white/[0.04] border border-white/10 rounded-xl md:rounded-2xl py-4 md:py-5 pl-12 md:pl-16 pr-14 md:pr-16 text-sm md:text-base font-medium outline-none focus:border-accent-gold/40 focus:bg-white/[0.08] transition-all shadow-inner"
               />
               <button 
                 onClick={() => {
                    naturalQuery.split(' ').length > 2 ? handleNaturalSearch() : handleNext();
                 }}
                 className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-2.5 rounded-lg md:rounded-xl bg-accent-gold/10 text-accent-gold hover:bg-accent-gold/20 transition-all border border-accent-gold/20"
               >
                 <ArrowRight size={18} className="md:w-5 md:h-5" />
               </button>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1">
               {['Goa', 'Manali', 'Leh', 'Rishikesh'].map((c) => (
                 <button 
                   key={c}
                   onClick={() => {
                      setLocation(c);
                      setStep(2);
                   }}
                   className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-blue-100/40 hover:border-accent-gold/30 hover:text-white transition-all uppercase tracking-widest"
                 >
                   {c}
                 </button>
               ))}
            </div>

            <div className="pt-2 flex items-center gap-3 px-5 py-4 rounded-2xl bg-accent-gold/[0.03] border border-accent-gold/10">
               <div className="w-8 h-8 rounded-full border border-accent-gold/20 flex items-center justify-center text-accent-gold">
                  <Zap size={14} />
               </div>
               <p className="text-[10px] font-medium text-blue-100/50 leading-relaxed italic">
                  "Try: Hidden gems in Delhi for weekend"
               </p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="space-y-1">
               <h2 className="text-xl font-display font-bold leading-tight uppercase tracking-wide">
                  Select <span className="text-accent-gold">Vibe</span>
               </h2>
               <p className="text-blue-100/30 text-[10px] font-bold uppercase tracking-widest leading-none">Intelligence parameters for {location}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
               {MOODES.map((m) => (
                  <button 
                    key={m.id}
                    onClick={() => setMood(m.id)}
                    className={`p-4 rounded-2xl border transition-all duration-300 text-left space-y-2 group overflow-hidden relative ${
                      mood === m.id 
                      ? 'bg-accent-gold/10 border-accent-gold shadow-glow-gold/10' 
                      : 'bg-white/5 border-white/5 hover:border-white/10'
                    }`}
                  >
                     <div className="text-xl grayscale group-hover:grayscale-0 transition-all">{m.icon}</div>
                     <div className={`font-bold text-[10px] uppercase tracking-[0.1em] ${mood === m.id ? 'text-accent-gold' : 'text-blue-100/40'}`}>{m.label}</div>
                     
                     {mood === m.id && (
                        <div className="absolute top-4 right-4 text-accent-gold">
                           <Check size={18} />
                        </div>
                     )}
                  </button>
               ))}
            </div>

            <div className="flex items-center justify-between pt-4">
               <button onClick={() => setStep(1)} className="px-4 py-2 text-blue-100/40 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all bg-white/5 rounded-xl border border-white/5">
                  Back
               </button>
               <button 
                 disabled={!mood}
                 onClick={handleNext}
                 className="btn-primary py-3 px-8 rounded-xl flex items-center gap-2 text-xs font-bold disabled:opacity-30 transition-all shadow-glow-gold"
               >
                  Generate Plan
                  <Sparkles size={16} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
