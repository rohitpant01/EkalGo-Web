import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Users, MapPin, Sparkles } from 'lucide-react';

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
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 200]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  
  // Real typing animation effect
  useEffect(() => {
    const textToType = "Delhi → Manali in 10 seconds...";
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      setTypedText(textToType.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === textToType.length) {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Parallax mouse effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20; // Max 20px shift
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePosition({ x, y });
  };

  // Advanced Canvas map-like animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animId;

    // Cities (Nodes)
    const nodes = Array.from({ length: 15 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 1,
      glow: Math.random() > 0.5 ? '#F9A826' : '#2099E3'
    }));

    // Routes (Arcs between nodes)
    const routes = [];
    for (let i = 0; i < 8; i++) {
        const start = nodes[Math.floor(Math.random() * nodes.length)];
        const end = nodes[Math.floor(Math.random() * nodes.length)];
        if (start !== end) {
            routes.push({
                start, 
                end, 
                progress: Math.random(), 
                speed: 0.002 + Math.random() * 0.003
            });
        }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.glow;
        ctx.fill();
        // Removed heavy shadow drops to fix scroll lag
      });

      // Draw routes (arcs) and dots traversing them
      routes.forEach(route => {
        const { start, end, progress, speed } = route;
        
        // Draw dashed path
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        // Create an arc by adding a control point
        const cpX = (start.x + end.x) / 2;
        const cpY = Math.min(start.y, end.y) - 100;
        ctx.quadraticCurveTo(cpX, cpY, end.x, end.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]); // reset

        // Draw traveling dot
        route.progress += speed;
        if (route.progress > 1) {
            route.progress = 0;
            // Optionally change destination
            route.end = nodes[Math.floor(Math.random() * nodes.length)];
        }
        
        // Calculate dot position on quadratic curve
        const t = route.progress;
        const invT = 1 - t;
        const dotX = invT * invT * start.x + 2 * invT * t * cpX + t * t * end.x;
        const dotY = invT * invT * start.y + 2 * invT * t * cpY + t * t * end.y;
        
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#2DD4BF'; // updated to mint/cyan from logo
        ctx.fill();
        // Removed heavy shadow drops to fix scroll lag
        
        // Trail
        ctx.beginPath();
        const pastT = Math.max(0, t - 0.05);
        const invPastT = 1 - pastT;
        const pastX = invPastT * invPastT * start.x + 2 * invPastT * pastT * cpX + pastT * pastT * end.x;
        const pastY = invPastT * invPastT * start.y + 2 * invPastT * pastT * cpY + pastT * pastT * end.y;
        ctx.moveTo(pastX, pastY);
        ctx.lineTo(dotX, dotY);
        ctx.strokeStyle = 'rgba(20, 184, 166, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      animId = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      // Remap nodes
      nodes.forEach(n => {
        n.x = Math.random() * w;
        n.y = Math.random() * h;
      });
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
      onMouseMove={handleMouseMove}
      className="hero relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden"
      style={{ padding: '20px' }}
    >
      {/* Particle map background with scroll parallax & mouse shift */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{ 
          y: yParallax,
          x: mousePosition.x,
          translateY: mousePosition.y
        }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center px-2">

          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 glass"
          >
            <Sparkles size={14} className="text-amber-400" />
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-amber-300">
              AI-Powered Travel Companion
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] sm:leading-[0.95] mb-6 w-full max-w-[100%] mx-auto break-words whitespace-normal"
          >
            <span className="text-white text-2xl xs:text-3xl md:text-5xl block mb-4 opacity-80 break-words">Find your next trip...</span>
            <span className="text-white block sm:inline">and the</span>
            <br className="hidden sm:block" />
            <span className="text-gradient-amber italic block sm:inline break-words">People</span>
            <br className="hidden sm:block" />
            <span className="text-white text-3xl xs:text-4xl md:text-6xl tracking-tight block sm:inline mt-2 sm:mt-0 break-words">already going there 👀</span>
          </motion.h1>

          {/* Typing Sub-headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-12 flex items-center justify-center mb-6"
          >
            <span className="font-mono text-xl md:text-2xl text-teal-400 font-medium">
              "{typedText}<span className="animate-pulse">|</span>"
            </span>
          </motion.div>

          {/* Sub */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-lg md:text-xl text-blue-200/60 w-full max-w-[100%] md:max-w-2xl mx-auto mb-10 leading-relaxed break-words whitespace-normal"
          >
            You're just <span className="text-amber-400 font-bold">one trip away</span> from meeting someone unexpected ✨. 
            Connect with explorers, plan AI itineraries, and unlock India's secret soul.
          </motion.p>

          {/* CTA Group */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-full px-4"
          >
            <button
              onClick={onWaitlistOpen}
              style={{ background: 'linear-gradient(135deg, #F9A826 0%, #F59E0B 100%)' }}
              className="btn-glow group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base text-ocean-900 transition-all duration-200 hover:scale-105 active:scale-95 shadow-glow-amber w-[90%] max-w-[300px] sm:w-auto"
            >
              Get Early Access
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#search"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base text-white transition-all duration-200 hover:bg-white/10 active:scale-95 w-[90%] max-w-[300px] sm:w-auto border border-white/15 backdrop-blur-md"
            >
              Plan a Trip Now
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-16 mb-12 w-full px-2"
          >
            {STAT_ITEMS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Icon size={14} className="text-amber-400" />
                  <span className="font-display font-bold text-2xl text-white">{value}</span>
                </div>
                <span className="text-xs text-blue-200/50 font-body">{label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow pointer-events-none"
      >
        <span className="text-xs font-mono text-teal-400 tracking-widest">SCROLL TO BUILD</span>
        <div className="w-px h-8 bg-gradient-to-b from-teal-400 to-transparent" />
      </motion.div>
    </section>
  );
}
