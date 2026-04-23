'use client';

import React from 'react';
import { Star, Smartphone } from 'lucide-react';
import { useModal } from '@/context/ModalContext';

export default function AppCTA() {
  const { openWaitlist } = useModal();

  const handleAndroid = () => {
    openWaitlist({
      title: "Android App Coming Soon",
      description: "Join the waitlist to be first in line when our Android app launches."
    });
  };

  const handleIOS = () => {
    openWaitlist({
      title: "iOS App Coming Soon",
      description: "We're perfecting our iOS experience. Join the waitlist for exclusive early access."
    });
  };

  return (
    <section className="py-16 md:py-24 bg-surface-alt relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary-100/30 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-accent-100/30 rounded-full blur-[60px] pointer-events-none" />

      <div className="container-tight relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text */}
          <div>
            <div className="badge badge-accent mb-6">
              <Smartphone size={14} />
              <span>Mobile App</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5 leading-tight">
              Take EkalGo <br />
              <span className="text-gradient-accent">Everywhere You Go</span>
            </h2>

            <p className="text-slate-500 mb-8 leading-relaxed text-base md:text-lg max-w-md">
              The full EkalGo experience in your pocket. Offline maps, travel buddy matching, real-time chat, and personalized discovery.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-800">4.9</span>
              <span className="text-sm text-slate-400">• 10,000+ travelers</span>
            </div>

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAndroid}
                className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] bg-white border border-slate-200 shadow-soft hover:shadow-card hover:border-primary-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3.18 23.7C2.47 23.32 2 22.56 2 21.66V2.34C2 1.44 2.47.68 3.18.3L13.56 12 3.18 23.7z" fill="#4CAF50"/>
                  <path d="M17.18 15.84L5.64 22.54l8.1-8.1 3.44 1.4z" fill="#F44336"/>
                  <path d="M20.48 10.78C21.27 11.22 21.8 12 21.8 12s-.53.78-1.32 1.22L17.74 14.6 14.3 12l3.44-2.6 2.74 1.38z" fill="#FFC107"/>
                  <path d="M5.64 1.46L17.18 8.16 13.74 10.6 5.64 1.46z" fill="#1976D2"/>
                </svg>
                <div className="text-left">
                  <div className="text-[11px] text-slate-400">Coming to</div>
                  <div className="text-sm font-semibold text-slate-800">Google Play</div>
                </div>
              </button>

              <button
                onClick={handleIOS}
                className="group flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] bg-white border border-slate-200 shadow-soft hover:shadow-card hover:border-primary-200"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0F172A">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[11px] text-slate-400">Coming to the</div>
                  <div className="text-sm font-semibold text-slate-800">App Store</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right: Phone Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone frame */}
              <div className="relative w-60 h-[460px] md:w-64 md:h-[480px] rounded-[36px] overflow-hidden shadow-elevated animate-float"
                style={{ background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)', border: '2px solid rgba(255,255,255,0.1)' }}>

                {/* Screen content */}
                <div className="absolute inset-3 rounded-[28px] overflow-hidden"
                  style={{ background: 'linear-gradient(160deg, #0F172A 0%, #1E293B 100%)' }}>

                  {/* Status bar */}
                  <div className="flex justify-between items-center px-5 pt-4 pb-3">
                    <span className="text-xs text-white/50 font-mono">9:41</span>
                    <div className="w-20 h-4 rounded-full bg-black/50" />
                    <div className="flex gap-1.5">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      ))}
                    </div>
                  </div>

                  {/* App mock */}
                  <div className="px-4 space-y-3 pt-2">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xs text-primary-400 font-mono mb-0.5">DISCOVER</div>
                        <div className="text-white font-display font-bold text-base">Travel Buddies</div>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-primary-gradient" />
                    </div>

                    {/* Card stack */}
                    <div className="relative h-52">
                      <div className="absolute inset-2 top-4 rounded-2xl rotate-3 opacity-30"
                        style={{ background: 'linear-gradient(135deg, #0D9488, #14B8A6)' }} />
                      <div className="absolute inset-0 rounded-2xl overflow-hidden"
                        style={{ background: 'linear-gradient(160deg, #134E4A, #0D9488)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="absolute bottom-0 left-0 right-0 p-4"
                          style={{ background: 'linear-gradient(0deg, rgba(15,23,42,0.95), transparent)' }}>
                          <div className="text-white font-semibold text-sm mb-0.5">Priya S. • 24</div>
                          <div className="text-slate-400 text-xs flex items-center gap-1">
                            📍 Heading to Spiti Valley
                          </div>
                        </div>
                        <div className="absolute inset-0 opacity-20"
                          style={{ background: 'radial-gradient(circle at 50% 40%, rgba(45,212,191,0.3), transparent 60%)' }} />
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-center gap-5 pt-2">
                      {['✕', '★', '♥'].map((icon, i) => (
                        <div key={i}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-sm"
                          style={{
                            background: i === 2 ? 'linear-gradient(135deg, #2DD4BF, #14B8A6)' : 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: i === 2 ? '#0F172A' : 'rgba(255,255,255,0.5)',
                          }}>
                          {icon}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-white/20" />
              </div>

              {/* Floating badges */}
              <div className="absolute -right-3 top-16 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-dark-surface border border-white/10 shadow-elevated animate-pulse-slow">
                🎯 New match!
              </div>
              <div className="absolute -left-4 bottom-24 px-3 py-2 rounded-xl text-xs text-white bg-dark-surface border border-white/10 shadow-elevated animate-pulse-slow"
                style={{ animationDelay: '1s' }}>
                💬 3 messages
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
