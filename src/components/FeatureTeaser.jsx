import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, Map, Wallet, Zap } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

const FEATURES = [
  {
    title: "Full Itinerary Generator",
    desc: "Day-wise plan with hidden nearby destinations",
    icon: <Sparkles size={20} />
  },
  {
    title: "Best Time to Visit",
    desc: "Based on weather, crowd & local insights",
    icon: <Zap size={20} />
  },
  {
    title: "Budget Optimization",
    desc: "Smart cost planning for your trip",
    icon: <Wallet size={20} />
  },
  {
    title: "Hidden Places Discovery",
    desc: "Explore places tourists miss",
    icon: <Map size={20} />
  }
];

export default function FeatureTeaser() {
  const { openWaitlist } = useModal();
  return (
    <div 
      className="w-full overflow-x-auto pb-8 no-scrollbar"
      data-lenis-prevent
    >
      <div className="flex gap-6 min-w-max px-4">
        {FEATURES.map((feature, idx) => (
          <motion.div
            key={feature.title}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={openWaitlist}
            className="w-72 glass-panel p-6 border border-white/5 cursor-pointer group relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-brand-900/40 backdrop-blur-md opacity-60 pointer-events-none" />
             
             <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                   <div className="w-10 h-10 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold border border-accent-gold/20">
                      {feature.icon}
                   </div>
                   <motion.div 
                     animate={{ opacity: [0.4, 1, 0.4] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="text-accent-gold/60"
                   >
                     <Lock size={16} />
                   </motion.div>
                </div>

                <div className="space-y-2">
                   <h5 className="text-white font-bold text-sm tracking-wide blur-[2px] group-hover:blur-[1px] transition-all">
                      {feature.title}
                   </h5>
                   <p className="text-xs text-blue-100/40 leading-relaxed blur-[3px] group-hover:blur-[2px] transition-all">
                      {feature.desc}
                   </p>
                </div>

                <div className="pt-2">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-accent-gold/40 group-hover:text-accent-gold transition-colors">
                      Unlock Feature
                   </span>
                </div>
             </div>

             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
               style={{
                 background: 'radial-gradient(circle at top right, rgba(245, 185, 66, 0.1), transparent 70%)',
               }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
