import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, MapPin, Coffee, MountainSnow } from 'lucide-react';

const ITINERARY_STEPS = [
  { icon: MapPin, color: 'text-blue-400', label: 'Day 1: Arrival in Delhi', delay: 1000 },
  { icon: Coffee, color: 'text-amber-400', label: 'Hidden Cafe at Majnu Ka Tilla', delay: 2500 },
  { icon: ArrowRight, color: 'text-white/40', label: 'Overnight bus to Manali', delay: 4000 },
  { icon: MountainSnow, color: 'text-teal-400', label: 'Day 2: Secret Trek to Jogni Falls', delay: 6000 }
];

export default function LiveBuilder({ onSearch }) {
  const [activeSteps, setActiveSteps] = useState([]);
  const [typedText, setTypedText] = useState("");
  const targetText = "Curating a 3-day itinerary...";

  useEffect(() => {
    // Start typing animation
    let currentIndex = 0;
    const interval = setInterval(() => {
      setTypedText(targetText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === targetText.length) {
        clearInterval(interval);
      }
    }, 50);

    // Sequence steps
    const timeouts = ITINERARY_STEPS.map((step, index) => {
      return setTimeout(() => {
        setActiveSteps(prev => [...prev, index]);
      }, step.delay);
    });

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <section className="py-24 bg-ocean-950 relative overflow-hidden border-t border-white/5">
      {/* Abstract background map lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
         </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
        {/* Left Side: Mock Search / Generation Input */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 glass-light border-teal-500/20 shadow-glow-ocean">
            <Sparkles size={14} className="text-teal-400 animate-pulse" />
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-teal-300">
              Live Intelligence
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-8 leading-tight">
            We build the perfect plan in <span className="text-gradient-ocean italic">seconds</span>
          </h2>

          <div className="w-full relative glass rounded-3xl p-6 border border-white/10 shadow-2xl overflow-hidden mt-4 group">
            {/* Pulsing indicator */}
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-teal-500 via-amber-400 to-blue-500 opacity-50 blur-[4px] group-hover:opacity-100 transition-opacity" />

            {/* Editor Area */}
            <div className="flex gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-ocean-800 flex items-center justify-center shrink-0">
                <span className="font-display font-black text-amber-400">AI</span>
              </div>
              <div className="flex flex-col flex-1 gap-4">
                 <div className="font-mono text-sm text-blue-200">
                    <span className="text-teal-400 mr-2">❯</span>
                    {typedText}
                    <span className="animate-pulse shadow-glow-ocean text-white">|</span>
                 </div>

                 {/* Simulated Builder Stack */}
                 <div className="space-y-3 pl-6 border-l border-white/10 pt-4">
                    <AnimatePresence>
                      {ITINERARY_STEPS.map((step, idx) => (
                        activeSteps.includes(idx) && (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            className="flex items-center gap-3 backdrop-blur-md bg-white/[0.03] border border-white/10 px-4 py-3 rounded-xl shadow-lg"
                          >
                             <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.color.replace('text-', 'bg-').replace('-400', '-500/20')}`}>
                                <step.icon size={12} className={step.color} />
                             </div>
                             <span className="font-body text-sm font-medium text-white/90">
                                {step.label}
                             </span>
                          </motion.div>
                        )
                      ))}
                    </AnimatePresence>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Map Canvas Mock */}
        <div className="w-full md:w-1/2 h-[500px] relative">
          <div className="absolute inset-0 rounded-[2.5rem] glass border border-white/10 shadow-glow-ocean overflow-hidden flex items-center justify-center">
             
             {/* Dynamic Location Map Placeholder */}
             <motion.div 
                className="w-full h-full relative"
                animate={{ rotate: activeSteps.length * 2 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
             >
                <div className="absolute inset-0 bg-[#061524] opacity-80" />
                
                {/* Simulated Path on Map */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                  {activeSteps.length > 0 && (
                    <motion.circle initial={{ r: 0 }} animate={{ r: 8 }} cx="120" cy="280" fill="#2099E3" className="shadow-[0_0_15px_#2099E3]" />
                  )}
                  {activeSteps.length > 1 && (
                    <motion.circle initial={{ r: 0 }} animate={{ r: 8 }} cx="150" cy="240" fill="#F9A826" />
                  )}
                  {activeSteps.length > 2 && (
                    <motion.path 
                       initial={{ pathLength: 0 }}
                       animate={{ pathLength: 1 }}
                       transition={{ duration: 2 }}
                       d="M150,240 C180,200 220,150 240,100" fill="none" stroke="rgba(20,184,166,0.5)" strokeWidth="3" strokeDasharray="5 5" 
                    />
                  )}
                  {activeSteps.length > 3 && (
                    <motion.circle initial={{ r: 0 }} animate={{ r: 12 }} cx="240" cy="100" fill="#2DD4BF" className="shadow-[0_0_20px_#2DD4BF]" />
                  )}
                </svg>

                {/* Overlays */}
                <div className="absolute bottom-6 right-6 backdrop-blur-xl bg-black/60 border border-white/20 p-3 rounded-2xl flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                   <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">Syncing Data</span>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
