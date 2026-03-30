import React from 'react';
import { X, Download, Star, ArrowRight } from 'lucide-react';
import { redirectToApp } from '../utils/redirect';

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

  const handleDownload = () => {
    const ok = redirectToApp();
    if (!ok) {
      onClose();
      setTimeout(onWaitlistOpen, 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      style={{ background: 'rgba(1,13,22,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>

      <div className="relative w-full max-w-lg rounded-3xl overflow-hidden animate-slide-up"
        style={{ background: 'linear-gradient(160deg, #043358 0%, #021A2C 100%)', border: '1px solid rgba(228,178,80,0.2)' }}>

        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #E4B250, transparent 70%)' }} />

        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-blue-200/40 hover:text-white hover:bg-white/10 transition-all z-10">
          <X size={18} />
        </button>

        <div className="relative p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Unlock Full Experience
            </h2>
            <p className="text-blue-200/50 text-sm">
              Get the complete EkalGo experience in the app
            </p>

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
              ))}
              <span className="text-xs text-blue-200/40 ml-2">4.9 • 10K+ travelers</span>
            </div>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3 p-3 rounded-xl"
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
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-ocean-900 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #E4B250 0%, #FF6B35 100%)' }}>
              <Download size={18} />
              Download EkalGo App
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => { onClose(); onWaitlistOpen(); }}
              className="w-full py-3.5 rounded-2xl text-sm font-medium text-white/60 hover:text-white transition-all hover:bg-white/5"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              Join Waitlist Instead
            </button>
          </div>

          {/* Fine print */}
          <p className="text-center text-xs text-blue-200/30 mt-4">
            Free download • iOS &amp; Android
          </p>
        </div>
      </div>
    </div>
  );
}
