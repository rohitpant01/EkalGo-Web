import React, { useEffect, useRef } from 'react';
import { ArrowRight, Star, Users, MapPin, Sparkles } from 'lucide-react';
import Logo from './Logo';

const STAT_ITEMS = [
  { icon: Users, value: '10K+', label: 'Solo Travelers' },
  { icon: MapPin, value: '500+', label: 'Destinations' },
  { icon: Star, value: '4.9', label: 'App Rating' },
];

const TRAVEL_TAGS = [
  '🏔️ Himalayan Trek', '🏖️ Goa Beach', '🕌 Rajasthan Heritage',
  '🌿 Kerala Backwaters', '🗻 Ladakh Adventure', '🌺 Darjeeling Tea',
];

export default function Hero({ onSearch, onWaitlistOpen }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animId;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(228,178,80,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < 0 || p.x > w) p.dx *= -1;
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section
      className="hero relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #010D16 0%, #021A2C 35%, #043358 65%, #0A4F6E 100%)', padding: '20px' }}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />

      {/* Decorative orbs - constrained within bounds */}
      <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none transform -translate-x-1/2"
        style={{ background: 'radial-gradient(circle, #E4B250, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none transform translate-x-1/2"
        style={{ background: 'radial-gradient(circle, #14B8A6, transparent 70%)' }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, #2099E3, transparent 70%)' }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center px-2">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in"
            style={{ background: 'rgba(228,178,80,0.12)', border: '1px solid rgba(228,178,80,0.25)' }}>
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-amber-300">
              AI-Powered Travel Companion
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] sm:leading-[0.95] mb-6 animate-slide-up w-full max-w-[100%] mx-auto break-words whitespace-normal"
            style={{ animationDelay: '0.1s' }}>
            <span className="text-white text-2xl xs:text-3xl md:text-5xl block mb-4 opacity-80 break-words">Find your next trip...</span>
            <span className="text-white block sm:inline">and the</span>
            <br className="hidden sm:block" />
            <span className="text-gradient-amber italic block sm:inline break-words">People</span>
            <br className="hidden sm:block" />
            <span className="text-white text-3xl xs:text-4xl md:text-6xl tracking-tight block sm:inline mt-2 sm:mt-0 break-words">already going there 👀</span>
          </h1>

          {/* Sub */}
          <p className="font-body text-lg md:text-xl text-blue-200/60 w-full max-w-[100%] md:max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up break-words whitespace-normal"
            style={{ animationDelay: '0.2s' }}>
            You're just <span className="text-amber-400 font-bold">one trip away</span> from meeting someone unexpected ✨. 
            Connect with explorers, plan AI itineraries, and unlock India's secret soul.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-slide-up w-full px-4"
            style={{ animationDelay: '0.3s' }}>
            <button
              onClick={onWaitlistOpen}
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base text-ocean-900 transition-all duration-200 hover:scale-105 active:scale-95 shadow-glow-amber w-[90%] max-w-[300px] sm:w-auto"
              style={{ background: 'linear-gradient(135deg, #E4B250 0%, #FF6B35 100%)' }}
            >
              Get Early Access
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#search"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base text-white transition-all duration-200 hover:bg-white/10 active:scale-95 w-[90%] max-w-[300px] sm:w-auto"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}
            >
              Plan a Trip Now
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 mb-12 animate-fade-in w-full px-2"
            style={{ animationDelay: '0.4s' }}>
            {STAT_ITEMS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Icon size={14} className="text-amber-400" />
                  <span className="font-display font-bold text-2xl text-white">{value}</span>
                </div>
                <span className="text-xs text-blue-200/50 font-body">{label}</span>
              </div>
            ))}
          </div>

          {/* Scrolling tags */}
          <div className="overflow-hidden animate-fade-in w-full max-w-full" style={{ animationDelay: '0.5s' }}>
            <div className="flex gap-3 w-max animate-[scroll_20s_linear_infinite]"
              style={{ animation: 'scroll 25s linear infinite' }}>
              {[...TRAVEL_TAGS, ...TRAVEL_TAGS].map((tag, i) => (
                <span key={i}
                  className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium text-blue-200/60 glass-light">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce-slow">
        <span className="text-xs font-mono text-blue-300 tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-blue-300 to-transparent" />
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
