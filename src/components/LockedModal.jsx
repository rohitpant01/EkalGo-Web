'use client';

import React from 'react';
import { X, Sparkles, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
  { icon: '🗺️', title: 'Complete Itineraries', desc: 'Full day-by-day plans with unlimited places' },
  { icon: '🤝', title: 'Travel Buddy Matching', desc: 'Tinder-style swipe to find co-travelers' },
  { icon: '💎', title: 'Hidden Gems', desc: 'Exclusive local spots known only to locals' },
  { icon: '🧭', title: 'Smart AI Routes', desc: 'Real-time optimized travel routes' },
  { icon: '📴', title: 'Offline Access', desc: 'Works without internet connection' },
  { icon: '⭐', title: 'Personalized Picks', desc: 'Curated for your travel style' },
];

export default function LockedModal({ isOpen, onClose, onWaitlistOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 pt-16 sm:pt-[120px] modal-backdrop overflow-y-auto"
      data-lenis-prevent
      style={{ background: 'rgba(1,13,22,0.95)', backdropFilter: 'blur(16px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>

      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #043358 0%, #021A2C 100%)', border: '1px solid rgba(228,178,80,0.2)' }}>

        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #F9A826, transparent 70%)' }} />

        <div className="relative p-8">
          {/* Header */}
          <div className="text-center mb-8 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-6 font-mono text-[10px] uppercase tracking-widest text-accent-gold">
               <Star size={12} className="fill-accent-gold" />
               Beta Access 2026
            </div>
            <h2 className="font-display text-2xl font-bold mb-2 text-white">
              Join the Exclusive Beta
            </h2>
            <p className="text-blue-200/50 text-sm">
              EkalGo App is launching soon. Get early access to the full AI travel suite before the public release.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.05] transition-colors"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="text-xl flex-shrink-0">{f.icon}</span>
                <div>
                  <div className="text-xs font-semibold text-white mb-0.5">{f.title}</div>
                  <div className="text-xs text-blue-200/40 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <button
              onClick={() => { onClose(); onWaitlistOpen(); }}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-ocean-900 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #F9A826 0%, #F59E0B 100%)' }}>
              <Sparkles size={18} />
              Claim Early Beta Access
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Fine print */}
          <p className="text-center text-xs text-blue-200/30 mt-6">
            Limited slots available • Coming soon to iOS & Android
          </p>
        </div>
        
        {/* Close Button */}
        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-blue-200/40 hover:text-white hover:bg-white/10 transition-all z-[200]">
          <X size={18} />
        </button>
      </motion.div>
    </div>
  );
}
