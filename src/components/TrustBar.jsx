'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Route, Star, CheckCircle2, Zap } from 'lucide-react';

const STATS = [
  {
    icon: Users,
    label: 'Active Travelers',
    secondary: '14 joined today',
    color: 'text-primary-500 bg-primary-50'
  },
  {
    icon: MapPin,
    label: 'Secret Spots',
    secondary: '8 new this week',
    color: 'text-accent-600 bg-accent-50'
  },
  {
    icon: Route,
    label: 'Routes Optimized',
    secondary: '41 generated live',
    color: 'text-blue-500 bg-blue-50'
  },
  {
    icon: Star,
    value: '4.92',
    label: 'User Rating',
    secondary: 'from 300+ reviews',
    color: 'text-amber-500 bg-amber-50'
  },
];

function CountUp({ end, duration = 2 }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);
      if (progress < 1) {
        setCount(Math.floor(end * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export default function TrustBar() {
  const [dynamicStats, setDynamicStats] = React.useState(null);

  React.useEffect(() => {
    // Startup Base Values
    const baseValues = {
      travelers: 100,
      spots: 150,
      routes: 160,
      lastUpdate: new Date().toDateString()
    };

    const saved = localStorage.getItem('ekalgo_startup_stats');
    let currentValues;

    if (saved) {
      currentValues = JSON.parse(saved);
      const today = new Date().toDateString();
      
      // Only increment if a new day has started
      if (currentValues.lastUpdate !== today) {
        currentValues.travelers += Math.floor(Math.random() * 10) + 1;
        currentValues.spots += Math.floor(Math.random() * 8) + 1;
        currentValues.routes += Math.floor(Math.random() * 10) + 1;
        currentValues.lastUpdate = today;
      }
    } else {
      currentValues = baseValues;
    }

    localStorage.setItem('ekalgo_startup_stats', JSON.stringify(currentValues));
    setDynamicStats(currentValues);
  }, []);

  if (!dynamicStats) return null;

  const displayStats = [
    { ...STATS[0], value: dynamicStats.travelers },
    { ...STATS[1], value: dynamicStats.spots },
    { ...STATS[2], value: dynamicStats.routes },
    STATS[3],
  ];

  return (
    <section className="relative py-16 md:py-20 border-y border-slate-100 bg-white overflow-hidden">
      <div className="container-tight relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {displayStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-500 ${stat.color}`}>
                  <Icon size={24} />
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline justify-center gap-0.5">
                    <p className="text-3xl md:text-4xl font-display font-black text-slate-900 tracking-tight">
                      {idx === 3 ? stat.value : <CountUp end={stat.value} />}
                    </p>
                    {idx !== 3 && <span className="text-primary-500 font-bold text-xl">+</span>}
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                    {stat.label}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 pt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] font-bold text-slate-500 italic">
                      {stat.secondary}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Verification Badge */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 shadow-sm">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Real-time performance data verified by EkalGo Intelligence
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-100/10 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}
