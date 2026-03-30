import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Sparkles, Heart, Zap } from 'lucide-react';

const NOTIFICATIONS = [
  { id: 1, text: "Rahul just planned a Ladakh trip", icon: <Zap size={14} className="text-amber-400" /> },
  { id: 2, text: "12 people exploring solo in Goa now", icon: <Users size={14} className="text-teal-400" /> },
  { id: 3, text: "Aisha unlocked a secret beach in Varkala", icon: <Sparkles size={14} className="text-blue-400" /> },
  { id: 4, text: "Someone just matched for a Spiti trek", icon: <Heart size={14} className="text-pink-400" /> },
  { id: 5, text: "New offbeat route revealed for Rajasthan", icon: <Sparkles size={14} className="text-amber-400" /> },
  { id: 6, text: "5 travelers just joined the Manali waitlist", icon: <Users size={14} className="text-teal-400" /> },
];

export default function LiveSocialProof() {
  const [current, setCurrent] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const showNext = () => {
      setCurrent(NOTIFICATIONS[index]);
      setIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
      
      // Stay visible for 4 seconds
      setTimeout(() => {
        setCurrent(null);
      }, 4000);
    };

    // Initial delay
    const initialTimeout = setTimeout(showNext, 3000);

    // Loop every 8-12 seconds
    const interval = setInterval(() => {
      showNext();
    }, 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [index]);

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none select-none hidden md:block">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ x: -100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -20, opacity: 0, scale: 0.9 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl glass shadow-2xl border border-white/10"
            style={{ minWidth: '240px' }}
          >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              {current.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-widest text-blue-200/40 leading-none mb-1">
                Live Activity
              </span>
              <span className="text-sm font-medium text-white/90 leading-tight">
                {current.text}
              </span>
            </div>
            
            {/* Pulsing indicator */}
            <div className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
