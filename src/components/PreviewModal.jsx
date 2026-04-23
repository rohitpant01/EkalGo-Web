'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Lock, Map, Wallet, Zap, Calendar, MapPin, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { generatePreviewTeaser } from '../services/api';
import { useModal } from '@/context/ModalContext';

const THINKING_STEPS = [
  "Connecting to AI Engine...",
  "Scanning route for hidden gems...",
  "Analyzing local data...",
  "Optimizing travel logistics...",
  "Finalizing itinerary..."
];

export default function PreviewModal({ isOpen, onClose, destination, itinerary }) {
  const { openWaitlist } = useModal();
  const [status, setStatus] = useState('thinking');
  const [stepIndex, setStepIndex] = useState(0);
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    if (isOpen) {
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
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6" data-lenis-prevent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white border border-slate-100 rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        >

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10">
            {status === 'thinking' || !previewData ? (
              <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-8">
                <div className="relative">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     className="w-20 h-20 rounded-full border-2 border-dashed border-primary-200"
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="text-primary-500 animate-pulse" size={28} />
                   </div>
                </div>
                
                <div className="space-y-3">
                   <h3 className="text-xl font-display font-bold text-slate-900 tracking-tight">AI is Planning...</h3>
                   <div className="h-6">
                     <motion.p 
                       key={stepIndex}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="text-primary-500 text-sm font-medium"
                     >
                       {THINKING_STEPS[stepIndex]}
                     </motion.p>
                   </div>
                </div>
              </div>
            ) : (
              <div className="space-y-10 animate-fadeIn">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Optimized</span>
                     </div>
                     <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Users size={12} /> Personalized
                     </div>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
                    {destination?.name} <span className="text-gradient-primary">AI Plan</span>
                  </h2>
                  <div className="flex flex-wrap gap-4 text-sm font-medium">
                     <span className="flex items-center gap-2 text-slate-600">
                        <Sparkles size={16} className="text-accent-500" /> {previewData.hiddenGemsCount || '10'} Hidden Gems
                     </span>
                     <span className="flex items-center gap-2 text-slate-600">
                        <Wallet size={16} className="text-emerald-500" /> Saves ~₹{previewData.savingsAmount || '2,400'}
                     </span>
                  </div>
                </div>

                {/* Visible Itinerary Preview */}
                <div className="space-y-6">
                  <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                     <Calendar size={14} /> Quick Preview
                  </h4>
                  
                  <div className="space-y-8 relative">
                    <div className="absolute left-[11px] top-4 bottom-4 w-px bg-slate-200" />
                    
                    <div className="relative pl-10">
                       <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center text-[10px] font-bold text-primary-600 z-10">1</div>
                       <div className="space-y-1.5">
                          <p className="text-slate-900 font-bold">{previewData.day1Title}</p>
                          <p className="text-sm text-slate-500 leading-relaxed">{previewData.day1Desc}</p>
                       </div>
                    </div>

                    <div className="relative pl-10">
                       <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center text-[10px] font-bold text-primary-600 z-10">2</div>
                       <div className="space-y-1.5">
                          <p className="text-slate-900 font-bold">{previewData.day2Title}</p>
                          <p className="text-sm text-slate-500 leading-relaxed">{previewData.day2Desc}</p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Blurred/Locked Section */}
                <div className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 mt-8">
                   <div className="p-8 space-y-6 blur-[6px] opacity-40 select-none pointer-events-none">
                      <div className="space-y-3">
                         <div className="h-4 w-1/3 bg-slate-300 rounded" />
                         <div className="h-16 w-full bg-slate-200 rounded-xl" />
                      </div>
                      <div className="flex gap-4">
                         <div className="h-24 w-1/2 bg-slate-200 rounded-xl" />
                         <div className="h-24 w-1/2 bg-slate-200 rounded-xl" />
                      </div>
                   </div>

                   <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                       <div className="w-14 h-14 rounded-full bg-accent-50 text-accent-500 flex items-center justify-center mb-4 shadow-soft">
                           <Lock size={24} />
                       </div>
                       <h3 className="text-xl font-display font-bold text-slate-900 mb-2">Unlock Full Itinerary</h3>
                       <p className="text-sm text-slate-500 max-w-xs mx-auto mb-6">
                          Get access to the complete day-by-day plan, hidden trails, and interactive maps.
                       </p>
                       
                       <button
                          onClick={() => { onClose(); openWaitlist(); }}
                          className="btn-primary w-full sm:w-auto px-8"
                        >
                           Join Waitlist to Unlock <ArrowRight size={16} />
                        </button>
                   </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[200] p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          >
            <X size={20} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
