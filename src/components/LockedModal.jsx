'use client';

import React from 'react';
import { X, Star, ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useModal } from '@/context/ModalContext';

const FEATURES = [
  { icon: '🗺️', title: 'Complete Itineraries', desc: 'Full day-by-day plans with unlimited places' },
  { icon: '🤝', title: 'Travel Buddy Matching', desc: 'Direct chat to find co-travelers' },
  { icon: '💎', title: 'Hidden Gems', desc: 'Exclusive local spots known only to locals' },
  { icon: '🧭', title: 'Smart AI Routes', desc: 'Real-time optimized travel routes' },
  { icon: '📴', title: 'Offline Access', desc: 'Works without internet connection' },
  { icon: '⭐', title: 'Personalized Picks', desc: 'Curated for your travel style' },
];

export default function LockedModal({ isOpen, onClose }) {
  const { openWaitlist } = useModal();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 modal-backdrop"
      data-lenis-prevent
      style={{ background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100"
      >
        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 border border-accent-100 mb-5 text-[11px] font-bold uppercase tracking-widest text-accent-600">
               <Star size={12} className="fill-accent-500" />
               Premium Feature
            </div>
            <h2 className="font-display text-2xl font-bold mb-3 text-slate-900">
              Unlock the Full Experience
            </h2>
            <p className="text-slate-500 text-sm">
              We're currently scaling our AI travel engine. Join the waitlist to be among the first to experience these premium features.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xl flex-shrink-0">{f.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-slate-900 mb-0.5">{f.title}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <button
              onClick={() => { onClose(); openWaitlist(); }}
              className="btn-accent w-full"
            >
              <Mail size={18} />
              Join the Waitlist
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Fine print */}
          <p className="text-center text-xs font-medium text-slate-400 mt-6 uppercase tracking-wider">
            Early Access Waitlist • Web & Mobile
          </p>
        </div>
        
        {/* Close Button */}
        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all z-[200]">
          <X size={18} />
        </button>
      </motion.div>
    </div>
  );
}
