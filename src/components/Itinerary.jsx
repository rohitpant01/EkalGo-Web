import React, { useState } from 'react';
import {
  Calendar, Clock, DollarSign, Thermometer, Zap,
  ChevronDown, ChevronUp, Lock, Share2, Download,
  Sparkles, MapPin, Info, Eye, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PlaceCard from './PlaceCard';
import PreviewModal from './PreviewModal';

const DIFF_COLORS = {
  Easy: { bg: 'rgba(46,204,113,0.15)', text: '#2ECC71' },
  Moderate: { bg: 'rgba(228,178,80,0.15)', text: '#E4B250' },
  Challenging: { bg: 'rgba(255,107,53,0.15)', text: '#FF6B35' },
};

export default function Itinerary({ itinerary, enriching, onLockedFeatureClick, onShare, onWaitlistOpen }) {
  const [previewOpen, setPreviewOpen] = useState(false);

  if (!itinerary) return null;

  const diffStyle = DIFF_COLORS[itinerary.difficulty] || DIFF_COLORS.Easy;

  return (
    <section id="itinerary" className="py-12 px-4 scroll-mt-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        {/* ── Trip Overview Card ── */}
        <motion.div 
          className="relative rounded-[2.5rem] overflow-hidden mb-12 p-8 md:p-12 glass shadow-2xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          {/* Decorative glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 opacity-20 pointer-events-none blur-[100px]"
            style={{ background: 'radial-gradient(circle, #E4B250, transparent 70%)' }} />

          <div className="relative z-10">
            <div className="flex items-start justify-between flex-wrap gap-6 mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center gap-2">
                    <Sparkles size={14} className="text-amber-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-[0.2em]">
                      AI Precision Crafted
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20">
                    <Users size={12} className="text-teal-400" />
                    <span className="text-[10px] font-bold text-teal-300 uppercase tracking-widest">
                       8 Travelers Going
                    </span>
                  </div>
                </div>
                <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-4 tracking-tight leading-tight">
                  {itinerary.title}
                </h2>
                <p className="text-blue-100/40 text-lg max-w-3xl leading-relaxed font-body italic">
                  "{itinerary.summary}"
                </p>
              </div>

              <div className="flex gap-3">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onShare}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-2 group shadow-lg"
                >
                  <Share2 size={18} className="group-hover:rotate-12 transition-transform" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPreviewOpen(true)}
                  className="px-6 py-4 rounded-2xl font-bold text-sm text-ocean-900 transition-all shadow-glow-amber"
                  style={{ background: 'linear-gradient(135deg, #E4B250 0%, #FF6B35 100%)' }}
                >
                  <span className="flex items-center gap-2">
                    <Eye size={18} />
                    Preview Full Trip
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Meta chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              {itinerary.duration && (
                <Chip icon={<Calendar size={14} />} label={itinerary.duration} />
              )}
              {itinerary.bestSeason && (
                <Chip icon={<Thermometer size={14} />} label={itinerary.bestSeason} />
              )}
              {itinerary.estimatedCost && (
                <Chip icon={<DollarSign size={14} />} label={itinerary.estimatedCost} />
              )}
              {itinerary.difficulty && (
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold tracking-wide shadow-sm"
                  style={{ background: diffStyle.bg, color: diffStyle.text, border: `1px solid ${diffStyle.text}20` }}>
                  <Zap size={12} />
                  {itinerary.difficulty.toUpperCase()}
                </span>
              )}
            </div>

            {/* Highlights */}
            {itinerary.highlights?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {itinerary.highlights.map((h, i) => (
                  <Chip key={i} icon={<MapPin size={12} />} label={h} variant="teal" />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Featured Preview (Day 1) ── */}
        <div className="mb-12">
           <div className="flex items-center justify-between mb-8 px-4">
              <h3 className="text-white font-display text-2xl font-bold flex items-center gap-3">
                 <span className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-amber-400 border border-white/10 text-sm">01</span>
                 The Journey Begins
              </h3>
              <div className="text-[10px] text-blue-200/30 uppercase font-bold tracking-widest">
                 Live Feed • Updated 2m ago
              </div>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {itinerary.days?.[0]?.places?.slice(0, 3).map((place, i) => (
                 <PlaceCard key={i} place={place} />
              ))}
              
              {/* Mystery Card */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                onMouseDown={() => setPreviewOpen(true)}
                className="relative h-[28rem] rounded-[2rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-8 cursor-pointer overflow-hidden group"
              >
                 <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent group-hover:from-amber-500/10 transition-colors" />
                 <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                       <Lock size={24} className="text-amber-500/50 group-hover:text-amber-500" />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-2">Mystery Spot Revealed in App</h4>
                    <p className="text-blue-200/40 text-xs leading-relaxed max-w-[180px] mx-auto mb-6">
                       This route contains a secret place only visible to EkalGo members.
                    </p>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest underline decoration-amber-500/30 underline-offset-4">
                       Unlock Hidden Trip 🔒
                    </span>
                 </div>
              </motion.div>
           </div>
        </div>

        {/* ── App CTA Section ── */}
        <motion.div 
          className="mt-20 rounded-[3rem] overflow-hidden glass p-1 border-gradient relative shadow-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="p-10 md:p-16 text-center relative z-10 overflow-hidden rounded-[2.9rem]">
             <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />
             
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
               className="text-5xl mb-6 inline-block"
            >
              🚀
            </motion.div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              You're missing <span className="text-gradient-amber tracking-tighter">80% of the experience</span>
            </h3>
            <p className="text-blue-100/40 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-body italic">
              "This app helped me find travel buddies for my solo trip to Ladakh!" – <span className="text-white font-bold">Aisha</span>
            </p>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,107,53,0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onWaitlistOpen}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-[1.5rem] font-bold text-ocean-900 transition-all shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #E4B250 0%, #FF6B35 100%)' }}>
              <Download size={20} />
              Unlock Full Plan & Meet Travelers
            </motion.button>
          </div>
        </motion.div>

        {/* Global Preview Modal */}
        <PreviewModal 
          isOpen={previewOpen} 
          onClose={() => setPreviewOpen(false)} 
          itinerary={itinerary}
          onWaitlistOpen={onWaitlistOpen}
        />

      </motion.div>
    </section>
  );
}

function Chip({ icon, label, variant = 'blue' }) {
  const styles = {
    blue: { bg: 'rgba(4,51,88,0.6)', border: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.6)', icon: '#2099E3' },
    teal: { bg: 'rgba(45,212,191,0.08)', border: 'rgba(45,212,191,0.15)', text: 'rgba(45,212,191,0.6)', icon: '#2DD4BF' },
  };
  
  const s = styles[variant];

  return (
    <motion.span 
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-inner transition-colors"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}>
      <span style={{ color: s.icon }}>{icon}</span>
      {label}
    </motion.span>
  );
}
