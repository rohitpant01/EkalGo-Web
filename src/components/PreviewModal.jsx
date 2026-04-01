import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Download, Sparkles, MapPin, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import PlaceCard from './PlaceCard';

export default function PreviewModal({ isOpen, onClose, itinerary, onWaitlistOpen }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sent, setSent] = useState(false);

  if (!itinerary) return null;

  const day1 = itinerary.days?.[0];
  const remainingDaysCount = (itinerary.days?.length || 1) - 1;

  const handleSendToPhone = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ocean-950/90 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto lg:overflow-hidden rounded-[2rem] sm:rounded-[3rem] glass shadow-3xl border border-white/10 flex flex-col lg:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all z-20"
            >
              <X size={20} />
            </button>

            {/* Left Side: Teaser Content */}
            <div className="lg:w-1/3 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5 bg-gradient-to-b from-white/5 to-transparent flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <div className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-400" />
                  <span className="text-[10px] font-bold text-teal-300 uppercase tracking-widest">
                     Day 1 Revealed
                  </span>
                </div>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl text-white font-bold mb-4 leading-tight text-center lg:text-left">
                {itinerary.title}
              </h2>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6 text-[10px] font-bold text-blue-200/40 uppercase tracking-widest">
                  <span>{itinerary.duration}</span>
                  <span className="opacity-20">•</span>
                  <span>{itinerary.difficulty}</span>
              </div>

              <p className="text-blue-200/60 text-sm leading-relaxed mb-8 italic text-center lg:text-left">
                "{itinerary.summary}"
              </p>

              <div className="space-y-4 flex-1 hidden lg:block">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500/60">Highlights Included:</p>
                 {itinerary.highlights?.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-white/80">
                       <MapPin size={14} className="text-amber-400" />
                       {h}
                    </div>
                 ))}
                 <div className="flex items-center gap-3 text-sm text-blue-300/40 italic">
                    <Lock size={14} />
                    And 15+ more secret spots...
                 </div>
              </div>

              <div className="mt-8 lg:mt-12 space-y-6">
                 <div>
                    <button
                      onClick={onWaitlistOpen}
                      className="w-full group flex items-center justify-center gap-3 px-6 py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm text-ocean-900 transition-all duration-300 hover:scale-105 active:scale-95 shadow-glow-amber mb-3"
                      style={{ background: 'linear-gradient(135deg, #F9A826 0%, #F59E0B 100%)' }}
                    >
                      Unlock Full Itinerary
                      <Download size={18} />
                    </button>
                    <p className="text-center text-[10px] text-blue-200/30">
                       Join 10k+ explorers on the waitlist
                    </p>
                 </div>

                 <div className="pt-6 border-t border-white/5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200/40 mb-3 text-center lg:text-left">Or send to your phone</p>
                    <form onSubmit={handleSendToPhone} className="flex gap-2">
                       <input 
                          type="tel" 
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+91 Phone Number" 
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-blue-200/20 outline-none focus:border-amber-400/50 transition-colors"
                       />
                       <button type="submit" className={`px-4 py-3 rounded-xl transition-all ${sent ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20'}`}>
                          {sent ? <CheckCircle2 size={16} /> : <Zap size={16} />}
                       </button>
                    </form>
                 </div>
              </div>
            </div>

            {/* Right Side: Day 1 Reveal */}
            <div className="flex-1 overflow-y-auto lg:overflow-y-auto p-6 sm:p-8 md:p-12 custom-scrollbar">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-display font-bold text-ocean-900 shadow-xl flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #F9A826, #F59E0B)' }}>
                      1
                    </div>
                    <div>
                       <h3 className="text-white font-bold text-lg sm:text-xl">{day1?.theme || "Day 1 Discovery"}</h3>
                       <p className="text-[10px] text-blue-200/40 uppercase tracking-widest font-bold">Unlocking the Journey</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    <Sparkles size={14} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">AI Top Picks</span>
                 </div>
              </div>

              {/* Day 1 Places */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                 {day1?.places?.slice(0, 2).map((place, i) => (
                    <PlaceCard key={i} place={place} />
                 ))}
              </div>

              {/* Locked Remaining Days Section */}
              <div className="relative rounded-[2rem] sm:rounded-[2.5rem] border border-dashed border-white/10 p-8 sm:p-10 text-center bg-white/[0.02]">
                 <div className="mb-6 flex justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/5 flex items-center justify-center relative">
                       <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 animate-pulse" />
                       <Lock size={20} className="text-amber-500" />
                    </div>
                 </div>
                 <h4 className="text-white font-bold text-lg sm:text-xl mb-2">Wait... there's so much more</h4>
                 <p className="text-blue-200/40 text-xs sm:text-sm max-w-md mx-auto mb-8">
                    We've hidden the remaining <span className="text-white font-bold">{remainingDaysCount} days</span> and the full interactive map.
                 </p>
                 
                 <button
                  onClick={onWaitlistOpen}
                  className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm hover:text-amber-300 transition-colors group"
                >
                  Unlock the full trip
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              
              {/* FOMO Section */}
              <div className="mt-8 p-4 rounded-xl sm:rounded-2xl bg-teal-500/5 border border-teal-500/10 flex flex-wrap items-center justify-between gap-4">
                 <div className="flex items-center gap-3">
                    <div className="flex -space-x-1.5 sm:-space-x-2">
                       {[1,2,3].map(i => (
                          <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-ocean-950 bg-ocean-800 flex items-center justify-center text-[8px] sm:text-[10px] font-bold text-white">
                             {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
                          </div>
                       ))}
                    </div>
                    <span className="text-[10px] sm:text-xs text-teal-300/80 font-medium italic">"8 travelers already exploring this route"</span>
                 </div>
                 <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-teal-400 animate-pulse uppercase tracking-widest bg-teal-500/10 px-2 py-0.5 rounded-md">
                    <Zap size={10} fill="currentColor" /> Live
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
