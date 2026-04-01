import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, MapPin } from 'lucide-react';

export default function ScrollStory() {
  const containerRef = useRef(null);
  
  // Track scroll progress within this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Mountain parallax
  const mountainY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const mountainOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.8, 1], [0, 1, 1, 0]);

  // City 1: Delhi fades in early
  const city1Opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const city1Y = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);

  // Route drawing (SVG path length)
  const routeScaleY = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  // City 2: Manali fades in late
  const city2Opacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const city2Y = useTransform(scrollYProgress, [0.5, 0.7], [50, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[150vh] bg-ocean-950 w-full overflow-hidden flex flex-col items-center py-32 border-t border-white/5"
    >
      {/* Sticky container to hold the visual elements while scrolling */}
      <div className="sticky top-[10vh] w-full max-w-5xl mx-auto h-[80vh] flex flex-col items-center justify-center pointer-events-none">
        
        {/* Helper title */}
        <motion.div 
          style={{ opacity: mountainOpacity }}
          className="absolute top-0 flex flex-col items-center gap-4 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400">
            <Compass size={14} className="animate-spin-slow" />
            <span className="text-xs uppercase tracking-widest font-mono">Real-Time Routing</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display text-white">
            From the <span className="text-gradient-ocean italic">City</span> to the <span className="text-gradient-amber italic">Peaks</span>
          </h2>
        </motion.div>

        {/* The "Map" Area */}
        <div className="relative w-full max-w-2xl h-[50vh] mt-24">
          
          {/* Abstract Mountain Silhouette */}
          <motion.div 
            style={{ y: mountainY, opacity: mountainOpacity }}
            className="absolute bottom-0 left-0 w-full flex justify-center opacity-20 filter blur-sm grayscale"
          >
            <svg width="100%" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 200L150 100L300 200L450 50L600 150L800 50V200H0Z" fill="#1B2642" stroke="#F9A826" strokeWidth="2" strokeDasharray="10 10" />
            </svg>
          </motion.div>

          {/* City 1: Origin */}
          <motion.div 
            style={{ opacity: city1Opacity, y: city1Y }}
            className="absolute bottom-10 left-10 flex items-center gap-3 backdrop-blur-md bg-white/5 border border-white/10 px-4 py-2 rounded-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shadow-glow-ocean">
              <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
            </div>
            <div>
              <p className="text-xs text-blue-200/50 uppercase tracking-widest font-bold">Origin</p>
              <p className="text-lg font-bold text-white">Delhi</p>
            </div>
          </motion.div>

          {/* Animating Route Line */}
          <div className="absolute left-[85px] bottom-[90px] w-1 h-[25vh] origin-bottom overflow-hidden">
             <motion.div 
               style={{ scaleY: routeScaleY, transformOrigin: 'bottom' }}
               className="w-full h-full bg-gradient-to-t from-blue-500 via-teal-400 to-amber-400"
             />
          </div>

          {/* Particles along the route */}
          <motion.div 
             style={{ opacity: city1Opacity, y: useTransform(scrollYProgress, [0.3, 0.6], [0, -250]) }}
             className="absolute left-[78px] bottom-[90px] w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#fff]"
          />

          {/* City 2: Destination */}
          <motion.div 
            style={{ opacity: city2Opacity, y: city2Y }}
            className="absolute bottom-[35vh] left-10 flex items-center gap-3 backdrop-blur-md bg-white/5 border border-white/10 px-4 py-2 rounded-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shadow-glow-amber">
              <MapPin size={16} className="text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-amber-500/50 uppercase tracking-widest font-bold">Destination</p>
              <p className="text-lg font-bold text-white">Manali <span className="text-sm font-normal text-white/50">via Kullu</span></p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
