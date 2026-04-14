import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Lock, Map, Wallet, Zap, Calendar, MapPin, Users, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { generatePreviewTeaser } from '../services/api';
import { useModal } from '@/context/ModalContext';
import { redirectToAPK } from '@/utils/redirect';

const THINKING_STEPS = [
  "Connecting to EkalGo Intelligence...",
  "Scanning route for hidden gems...",
  "Analyzing local weather & crowd data...",
  "Optimizing travel logistics...",
  "Finalizing your premium itinerary..."
];
export default function PreviewModal({ isOpen, onClose, destination, itinerary }) {
  const { openWaitlist } = useModal();
  const [status, setStatus] = useState('thinking');
  const [stepIndex, setStepIndex] = useState(0);
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      // If we already have the itinerary, use it directly
      if (itinerary) {
        setPreviewData({
          day1Title: itinerary.days?.[0]?.theme || "The Journey Begins",
          day1Desc: itinerary.days?.[0]?.places?.[0]?.description || itinerary.summary,
          day2Title: itinerary.days?.[1]?.theme || "Deep Exploration",
          day2Desc: itinerary.days?.[1]?.places?.[0]?.description || "Unlocking the hidden soul of the destination.",
          savingsAmount: itinerary.estimatedCost?.split(' ')[0] || "2,400",
          hiddenGemsCount: "9"
        });
        setStatus('preview');
        return;
      }

      // Otherwise, fetch teaser data (from explore page clicks)
      if (destination) {
        setStatus('thinking');
        setStepIndex(0);
        setPreviewData(null);
        
        const interval = setInterval(() => {
          setStepIndex(prev => (prev < THINKING_STEPS.length - 1 ? prev + 1 : prev));
        }, 700);

        const fetchData = async () => {
          try {
            const result = await generatePreviewTeaser(destination.name);
            if (result.success) {
              setPreviewData(result.data);
            }
          } catch (err) {
            console.error("Failed to fetch preview:", err);
            setPreviewData({
              day1Title: "Arrival & Local Exploration",
              day1Desc: `Welcome to ${destination.name}. Settle in and explore the historic heart of the city with our curated local guide.`,
              day2Title: "Hidden Gems Discovery",
              day2Desc: "Head off the beaten path to discover secret spots known only to the EkalGo explorer community.",
              savingsAmount: "2,100",
              hiddenGemsCount: "7"
            });
          } finally {
            setTimeout(() => setStatus('preview'), 1500);
            if (interval) clearInterval(interval);
          }
        };

        fetchData();
        return () => clearInterval(interval);
      }
    }
  }, [isOpen, destination, itinerary]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-[120px] outline-none overflow-y-auto"
        data-lenis-prevent
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-900/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          className="relative w-full max-w-2xl max-h-[calc(100vh-120px)] overflow-hidden glass-panel border border-white/10 shadow-3xl shadow-glow-gold/10 flex flex-col pt-4 mx-4"
        >

          <div 
            data-lenis-prevent
            className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10 pb-32"
          >
            {status === 'thinking' || !previewData ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-8 py-12">
                <div className="relative">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     className="w-24 h-24 rounded-full border-2 border-dashed border-accent-gold/30"
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="text-accent-gold animate-pulse" size={32} />
                   </div>
                </div>
                
                <div className="space-y-4 max-w-sm">
                   <h3 className="text-xl font-display font-bold text-white tracking-tight">AI is Orchestrating...</h3>
                   <div className="h-6">
                     <motion.p 
                       key={stepIndex}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="text-accent-gold/80 font-mono text-sm uppercase tracking-widest"
                     >
                       {THINKING_STEPS[stepIndex]}
                     </motion.p>
                   </div>
                </div>

                <div className="flex gap-2">
                   {[0,1,2].map(i => (
                     <motion.div 
                       key={i}
                       animate={{ opacity: [0.3, 1, 0.3] }}
                       transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                       className="w-1.5 h-1.5 rounded-full bg-accent-gold"
                     />
                   ))}
                </div>
              </div>
            ) : (
              <div className="space-y-10 animate-fadeIn">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-green-400" />
                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Optimized & Ready</span>
                     </div>
                     <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-100/40 uppercase tracking-widest">
                        <Users size={12} /> Personalized for you
                     </div>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                    {destination?.name} <span className="text-gradient-gold">AI Travel Plan</span>
                  </h2>
                  <div className="flex flex-wrap gap-4 text-sm">
                     <span className="flex items-center gap-2 text-blue-100/60">
                        <Sparkles size={14} className="text-accent-gold" /> +{previewData.hiddenGemsCount || '10'} Hidden Gems Discovered
                     </span>
                     <span className="flex items-center gap-2 text-blue-100/60">
                        <Wallet size={14} className="text-accent-teal" /> Potential Savings: ₹{previewData.savingsAmount || '2,400'}
                     </span>
                  </div>
                </div>

                {/* Section 1: Visible */}
                <div className="space-y-6">
                  <h4 className="text-accent-gold text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                     <Calendar size={14} /> Quick Preview (Day 1 & 2)
                  </h4>
                  
                  <div className="space-y-8 relative">
                    <div className="absolute left-[11px] top-4 bottom-4 w-[1px] bg-white/10" />
                    
                    <div className="relative pl-10">
                       <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-brand-800 border border-white/20 flex items-center justify-center text-[10px] font-bold text-white z-10">01</div>
                       <div className="space-y-2">
                          <p className="text-white font-bold">{previewData.day1Title}</p>
                          <p className="text-sm text-blue-100/40 leading-relaxed font-body">{previewData.day1Desc}</p>
                       </div>
                    </div>

                    <div className="relative pl-10">
                       <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-brand-800 border border-white/20 flex items-center justify-center text-[10px] font-bold text-white z-10">02</div>
                       <div className="space-y-2">
                          <p className="text-white font-bold">{previewData.day2Title}</p>
                          <p className="text-sm text-blue-100/40 leading-relaxed font-body">{previewData.day2Desc}</p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Section: Hidden Places Intelligence Teaser */}
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <h4 className="text-accent-gold text-xs font-bold uppercase tracking-widest flex-1 flex items-center gap-2">
                         <Sparkles size={14} className="animate-pulse" /> Secret Locations & Hidden Trails
                      </h4>
                      <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/20">
                         <Lock size={10} className="text-red-400" />
                         <span className="text-[8px] font-bold text-red-400 uppercase tracking-widest">
                            Restricted
                         </span>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="group relative rounded-2xl border border-white/10 bg-brand-800 overflow-hidden aspect-[4/3]">
                           {/* Blurred Background Image */}
                           <img 
                             src={i === 1 
                               ? "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400" 
                               : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400"
                             }
                             className="absolute inset-0 w-full h-full object-cover blur-[8px] opacity-40 grayscale-[0.3]"
                             alt="Hidden"
                           />
                           
                           {/* Dark Overlay */}
                           <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent" />

                           {/* Content Overlay */}
                           <div className="absolute inset-0 p-4 flex flex-col justify-end space-y-2">
                              <div className="space-y-1 relative">
                                 {/* Blurred Text simulation */}
                                 <div className="h-4 w-3/4 bg-white/30 rounded blur-[3px]" />
                                 <div className="h-3 w-1/2 bg-white/10 rounded blur-[2px]" />
                              </div>
                              
                              <div className="flex items-center gap-2 opacity-40">
                                 <MapPin size={10} className="text-accent-neon" />
                                 <div className="h-2 w-16 bg-blue-100/20 rounded blur-[2px]" />
                              </div>
                           </div>

                           {/* Interaction Overlay */}
                           <div className="absolute inset-0 bg-brand-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center backdrop-blur-sm">
                              <div className="w-10 h-10 rounded-full bg-accent-gold/20 flex items-center justify-center mb-2 border border-accent-gold/40">
                                 <Zap size={18} className="text-accent-gold" />
                              </div>
                              <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-tight">
                                 Unlock to <br /> Reveal Details
                              </span>
                           </div>
                        </div>
                      ))}
                   </div>
                   
                   <p className="text-[10px] text-blue-100/30 text-center font-mono uppercase tracking-[0.2em] pt-2">
                      +9 more hidden trails found near this route
                   </p>
                </div>

                {/* Section 2: Blurred AI Path */}
                <div className="relative rounded-2xl border border-white/5 overflow-hidden group/lock min-h-[380px] sm:min-h-0">
                   <div className="p-8 space-y-8 blur-md select-none pointer-events-none opacity-20">
                      <div className="space-y-4 text-left">
                         <div className="h-4 w-1/3 bg-white/20 rounded-full" />
                         <div className="h-12 w-full bg-white/10 rounded-2xl" />
                      </div>
                      <div className="flex gap-4">
                         <div className="h-24 w-1/2 bg-white/10 rounded-2xl border border-white/5" />
                         <div className="h-24 w-1/2 bg-white/10 rounded-2xl border border-white/5" />
                      </div>
                   </div>

                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-900/60 to-brand-900/90 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
                       <motion.div 
                         animate={{ y: [0, -4, 0] }}
                         transition={{ duration: 3, repeat: Infinity }}
                         className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-accent-gold/10 border border-accent-gold/30 flex items-center justify-center text-accent-gold mb-4 sm:mb-6 shadow-glow-gold/20"
                       >
                          <Lock size={22} className="sm:hidden" />
                           <Lock size={26} className="hidden sm:block" />
                       </motion.div>
                       <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">AI Optimized Full Path</h3>
                       <p className="text-xs sm:text-sm text-blue-100/50 max-w-[280px] sm:max-w-xs mx-auto mb-6 sm:mb-8 font-body leading-relaxed">
                          The complete <span className="text-white">Day 3-5</span> route, secret beach access points, and smart budget distributions are coming soon.
                       </p>
                       
                       <button
                          onClick={() => { onClose(); openWaitlist(); }}
                          className="btn-primary py-3 sm:py-4 px-8 sm:px-10 flex items-center gap-3 sm:gap-4 font-bold group shadow-2xl relative overflow-hidden text-sm sm:text-base"
                        >
                           <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                           <ArrowRight size={18} className="relative z-10" />
                           <span className="relative z-10">Join Waitlist to Unlock</span>
                           <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform relative z-10" />
                        </button>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4">
                   <div className="p-5 rounded-2xl glass-panel border border-white/5 opacity-30 select-none flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent-neon/10 flex items-center justify-center text-accent-neon">
                         <Map size={20} />
                      </div>
                      <div className="space-y-2 flex-1">
                         <div className="h-2 w-full bg-white/20 rounded-full" />
                         <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                      </div>
                   </div>
                   <div className="p-5 rounded-2xl glass-panel border border-white/5 opacity-30 select-none flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                         <Zap size={20} />
                      </div>
                      <div className="space-y-2 flex-1">
                         <div className="h-2 w-full bg-white/20 rounded-full" />
                         <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                      </div>
                   </div>
                </div>
              </div>
            )}
          </div>

          {/* Close Button moved to end for stacking */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[200] p-2.5 rounded-full bg-black/60 hover:bg-white/10 text-white transition-all backdrop-blur-md border border-white/10 shadow-xl"
          >
            <X size={24} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
