import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Search, Sparkles, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useModal } from '@/context/ModalContext';

export default function Hero({ onSearch }) {
  const { openWaitlist } = useModal();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 200]);
  
  const [typedText, setTypedText] = useState('');
  
  // Real typing animation effect
  useEffect(() => {
    const destinations = ["Goa...", "Manali...", "Rishikesh..."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingInterval;

    const type = () => {
      const currentWord = destinations[wordIndex];
      
      if (isDeleting) {
        setTypedText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          isDeleting = true;
          typingInterval = setInterval(type, 100);
        }, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % destinations.length;
      }
    };

    typingInterval = setInterval(type, 150);
    return () => clearInterval(typingInterval);
  }, []);

  // Advanced Canvas particle/star background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animId;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      glow: Math.random() > 0.8 ? '#F5B942' : '#0EA5E9'
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.glow;
        ctx.globalAlpha = Math.random() * 0.5 + 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw connecting lines for nearby particles
        for(let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - dist/1000})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
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
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-brand-900"
    >
      {/* Particle background with scroll parallax */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{ y: yParallax }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 flex flex-col items-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 glass-panel border border-accent-gold/20"
        >
          <Sparkles size={14} className="text-accent-gold" />
          <span className="text-xs font-semibold tracking-wide uppercase text-gray-300">
            Next-Gen Travel Intelligence
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-8xl leading-tight mb-6 max-w-5xl mx-auto drop-shadow-2xl"
        >
          <span className="text-white">Plan Smarter.</span>
          <br />
          <span className="text-gradient-gold">Travel Better.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          AI-powered itineraries, hidden gems, and real-time travel routes tailored just for you. Explore the world effortlessly.
        </motion.p>

        {/* Trust Boosters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-brand-900 bg-brand-800 flex items-center justify-center text-[10px] font-bold text-gray-400 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <span className="text-[11px] font-bold text-blue-100/60 uppercase tracking-wider">Join 100+ early travelers</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
            <Sparkles size={12} className="text-accent-gold" />
            <span className="text-[11px] font-bold text-blue-100/60 uppercase tracking-wider">500+ AI Itineraries Generated</span>
          </div>
        </motion.div>

        {/* Animated Input Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-md mx-auto mb-12"
        >
          <div className="relative glass-panel rounded-full flex items-center p-2 border border-accent-neon/30 hover:border-accent-neon/60 transition-colors shadow-glow-neon">
            <div className="pl-4 pr-2">
              <Search className="text-accent-neon" size={20} />
            </div>
            <div className="flex-1 h-12 flex items-center bg-transparent border-none outline-none text-white text-lg font-medium placeholder-gray-500">
              <span className="text-gray-300">Where to? <span className="text-white">{typedText}</span><span className="animate-pulse">|</span></span>
            </div>
            <Link 
              href="/ai-planner"
              className="btn-primary rounded-full px-6 py-3 ml-2 shrink-0 flex items-center gap-2 font-bold"
            >
              Generate
              <Sparkles size={16} />
            </Link>
          </div>
        </motion.div>

        {/* CTA Group */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <button
            onClick={openWaitlist}
            className="btn-primary flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto text-lg"
          >
            Get Early Access
            <ArrowRight size={20} />
          </button>
          <Link
            href="/explore"
            className="btn-secondary flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto text-lg"
          >
            <MapPin size={20} />
            Explore Routes
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
