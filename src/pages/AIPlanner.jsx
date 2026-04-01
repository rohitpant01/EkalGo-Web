import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, MapPin, Calendar, Wallet, Loader2, ArrowRight, Share2, RefreshCcw } from 'lucide-react';
import { useItinerary } from '../hooks/useItinerary';
import Itinerary from '../components/Itinerary';
import SearchBar from '../components/SearchBar';
import WaitlistModal from '../components/WaitlistModal';

export default function AIPlanner() {
  const { itinerary, loading, error, query, enriching, search, reset } = useItinerary();
  const [showInput, setShowInput] = useState(true);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  useEffect(() => {
    if (itinerary) {
      setShowInput(false);
    }
  }, [itinerary]);

  const handleSearch = (q) => {
    search(q);
  };

  const handleReset = () => {
    reset();
    setShowInput(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: itinerary?.title || 'My EkalGo Trip',
      text: `Check out my AI-planned trip to ${itinerary?.title}: ${itinerary?.summary}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-brand-900 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent-gold/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent-neon/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <AnimatePresence mode="wait">
          {showInput ? (
            <motion.div
              key="input-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-4xl mx-auto py-12"
            >
              <div className="text-center mb-16 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-accent-gold/20 mb-4"
                >
                  <Sparkles size={16} className="text-accent-gold" />
                  <span className="text-xs font-bold tracking-widest uppercase text-accent-gold">
                    Next-Gen AI Curation
                  </span>
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight">
                  Your Journey, <br />
                  <span className="text-gradient-gold">Reimagined.</span>
                </h1>
                <p className="text-blue-100/60 text-lg max-w-2xl mx-auto font-body">
                  Our dual-AI engine orchestrates Groq for speed and Gemini for premium curation to build your perfect path in seconds.
                </p>
              </div>

              <div className="glass-panel p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent" />
                
                <SearchBar onSearch={handleSearch} isLoading={loading} />
                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-gold">
                       <MapPin size={18} />
                    </div>
                    <span>India-Specific Intelligence</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-gold">
                       <Calendar size={18} />
                    </div>
                    <span>3-14 Day Custom Planning</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-gold">
                       <Wallet size={18} />
                    </div>
                    <span>Budget & Difficulty Aware</span>
                  </div>
                </div>

                {error && (
                   <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                      {error}
                   </div>
                )}
              </div>

              <div className="mt-12 flex justify-center gap-8 text-gray-500 font-mono text-[10px] uppercase tracking-widest">
                 <span>Groq-Powered Orchestration</span>
                 <span>Gemini-Infused Curation</span>
                 <span>Real-Time Google Context</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
               <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                  <div>
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">{itinerary?.title}</h1>
                    <p className="text-blue-100/60 ">{itinerary?.duration} Expedition • {itinerary?.difficulty} Difficulty</p>
                  </div>
                  <div className="flex items-center gap-3">
                     <button 
                       onClick={handleReset}
                       className="px-6 py-2 rounded-full border border-white/10 hover:border-white/20 text-white flex items-center gap-2 transition-all hover:bg-white/5"
                     >
                        <RefreshCcw size={16} /> New Plan
                     </button>
                  </div>
               </div>

               <div id="itinerary">
                  <Itinerary 
                    itinerary={itinerary} 
                    enriching={enriching} 
                    onWaitlistOpen={() => setIsWaitlistOpen(true)} 
                    onLockedOpen={() => setIsWaitlistOpen(true)} 
                    onShare={handleShare} 
                  />
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="fixed inset-0 z-[60] bg-brand-900/80 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
           >
              <div className="relative">
                 <Loader2 className="text-accent-gold animate-spin" size={64} />
                 <Compass className="absolute inset-0 m-auto text-accent-gold animate-bounce" size={24} />
              </div>
              <div className="text-center space-y-2">
                 <p className="text-xl font-display font-medium text-white tracking-wide uppercase">Orchestrating AI Engines...</p>
                 <p className="text-gray-400 font-mono text-sm tracking-widest animate-pulse uppercase">Building {query} Path</p>
              </div>
           </motion.div>
        )}

        <WaitlistModal 
          isOpen={isWaitlistOpen}
          onClose={() => setIsWaitlistOpen(false)}
        />

      </div>
    </div>
  );
}
