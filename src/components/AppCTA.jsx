import React from 'react';
import { Download, Star, ArrowRight, Smartphone } from 'lucide-react';
import { redirectToPlayStore, redirectToAppStore } from '../utils/redirect';

export default function AppCTA({ onWaitlistOpen }) {
  const handleAndroid = () => {
    const ok = redirectToPlayStore();
    if (!ok) onWaitlistOpen();
  };

  const handleIOS = () => {
    const ok = redirectToAppStore();
    if (!ok) onWaitlistOpen();
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(4,51,88,0.6) 0%, rgba(2,26,44,0.9) 50%, rgba(6,76,132,0.4) 100%)' }} />
      <div className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(228,178,80,0.3), transparent)' }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, rgba(6,76,132,0.5) 0%, rgba(4,51,88,0.8) 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>

          {/* Decorative glow blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #E4B250, transparent 65%)' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #2DD4BF, transparent 65%)' }} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-10 md:p-16 items-center">

            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(228,178,80,0.12)', border: '1px solid rgba(228,178,80,0.25)' }}>
                <Smartphone size={13} className="text-amber-400" />
                <span className="text-xs font-mono font-medium tracking-widest uppercase text-amber-300">
                  Mobile App
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                Take EkalGo <br />
                <span className="text-gradient-amber italic">everywhere</span>
              </h2>

              <p className="text-blue-200/50 mb-8 leading-relaxed">
                The full EkalGo experience lives in the app. Offline maps, travel buddy matching,
                real-time chat, and personalized discovery — all in your pocket.
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-white font-semibold">4.9</span>
                <span className="text-sm text-blue-200/40">• 10,000+ travelers</span>
              </div>

              {/* Download buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAndroid}
                  className="group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  {/* Google Play icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3.18 23.7C2.47 23.32 2 22.56 2 21.66V2.34C2 1.44 2.47.68 3.18.3L13.56 12 3.18 23.7z" fill="#4CAF50"/>
                    <path d="M17.18 15.84L5.64 22.54l8.1-8.1 3.44 1.4z" fill="#F44336"/>
                    <path d="M20.48 10.78C21.27 11.22 21.8 12 21.8 12s-.53.78-1.32 1.22L17.74 14.6 14.3 12l3.44-2.6 2.74 1.38z" fill="#FFC107"/>
                    <path d="M5.64 1.46L17.18 8.16 13.74 10.6 5.64 1.46z" fill="#1976D2"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-blue-200/50">Get it on</div>
                    <div className="text-sm font-semibold text-white">Google Play</div>
                  </div>
                </button>

                <button
                  onClick={handleIOS}
                  className="group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl transition-all hover:scale-105 active:scale-95"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  {/* Apple icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-blue-200/50">Download on the</div>
                    <div className="text-sm font-semibold text-white">App Store</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Right: Phone visual */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Phone frame */}
                <div className="relative w-64 h-[480px] rounded-[40px] overflow-hidden shadow-card-hover animate-float"
                  style={{ background: 'linear-gradient(180deg, #043358 0%, #021A2C 100%)', border: '2px solid rgba(255,255,255,0.12)' }}>

                  {/* Screen content simulation */}
                  <div className="absolute inset-3 rounded-[32px] overflow-hidden"
                    style={{ background: 'linear-gradient(160deg, #010D16 0%, #043358 100%)' }}>

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

                    {/* App content mock */}
                    <div className="px-4 space-y-3 pt-2">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-xs text-amber-400 font-mono mb-0.5">DISCOVER</div>
                          <div className="text-white font-display font-bold text-base">Travel Buddies</div>
                        </div>
                        <div className="w-8 h-8 rounded-xl"
                          style={{ background: 'linear-gradient(135deg, #E4B250, #FF6B35)' }} />
                      </div>

                      {/* Card stack simulation */}
                      <div className="relative h-52">
                        {/* Back card */}
                        <div className="absolute inset-2 top-4 rounded-2xl rotate-3 opacity-40"
                          style={{ background: 'linear-gradient(135deg, #064C84, #0A7FDC)' }} />
                        {/* Front card */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden"
                          style={{ background: 'linear-gradient(160deg, #0866B0, #043358)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          <div className="absolute bottom-0 left-0 right-0 p-4"
                            style={{ background: 'linear-gradient(0deg, rgba(2,26,44,0.95), transparent)' }}>
                            <div className="text-white font-semibold text-sm mb-0.5">Priya S. • 24</div>
                            <div className="text-blue-200/60 text-xs flex items-center gap-1">
                              <span>📍</span> Heading to Spiti Valley
                            </div>
                          </div>
                          {/* Decorative gradient representing a person photo */}
                          <div className="absolute inset-0 opacity-30"
                            style={{ background: 'radial-gradient(circle at 50% 40%, rgba(228,178,80,0.3), transparent 60%)' }} />
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex justify-center gap-5 pt-2">
                        {['✕', '★', '♥'].map((icon, i) => (
                          <div key={i}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-sm"
                            style={{
                              background: i === 2
                                ? 'linear-gradient(135deg, #E4B250, #FF6B35)'
                                : 'rgba(255,255,255,0.08)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: i === 2 ? '#021A2C' : 'rgba(255,255,255,0.5)',
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

                {/* Notification badges floating */}
                <div className="absolute -right-4 top-16 glass px-3 py-2 rounded-xl text-xs font-semibold text-white animate-pulse-slow"
                  style={{ border: '1px solid rgba(46,204,113,0.3)' }}>
                  🎯 New match!
                </div>
                <div className="absolute -left-6 bottom-24 glass px-3 py-2 rounded-xl text-xs text-white animate-pulse-slow"
                  style={{ border: '1px solid rgba(228,178,80,0.3)', animationDelay: '1s' }}>
                  💬 3 messages
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
